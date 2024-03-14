import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Share,
  Linking,
} from "react-native";
import CustomText from "../CustomText";
import ChatButton from "./ChatButton";
import { sendChatMessage, getChatList, toggleSavePost } from "../helperFunctions/apiHelpers";
import { useNavigation } from "@react-navigation/native";
import AuthContext from "../../context/AuthContext";
import styles from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
const chatBubble = require("../../assets/icons/chat-bubbles.png");
const ChatComponent = ({
  initialMessage = "Hi! Can I get this plate?",
  listing,
}) => {
  const [messages, setMessages] = useState(initialMessage);
  const { authTokens, userId } = useContext(AuthContext);
  const [chatId, setChatId] = useState("");
  const [receiver, setReceiver] = useState("");
  const [product, setProduct] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const navigation = useNavigation();
  const chatListing = listing;
  const prodOwner = listing.owner;
  const product_id = listing.id;
  console.log("Chat listing", chatListing);
  console.log("Product owner (receiver)", prodOwner);

  const chat = require("../../assets/icons/speech-bubble.png");
  const share = require("../../assets/icons/share-arrow.png");
  const user = require("../../assets/icons/user-profile.png");

  useEffect(() => {
    const fetchChatId = async () => {
      try {
        // Fetch chat list
        if (!authTokens) {
          // Reset chat related states when authTokens are null (user logs out)
          setChatId("");
          setReceiver("");
          setProduct("");
          return;
        }
        const chats = await getChatList(authTokens);
        console.log("CHats obtained from getChatList", chats);
        console.log("Prod owner", prodOwner);
        console.log("product id", product_id);
        // Find the chat with the matching userId and listing owner
        const chat = chats.find((chat) => chat.receiver === prodOwner);
        console.log("chat from product owner in prod details:", chat);
        if (chat) {
          // Setting parameters for sendChat call
          setChatId(chat.id);
          setReceiver(chat.receiver);
          setProduct(chat.product);
        } else {
          setChatId("");
          setReceiver(prodOwner);
          setProduct(product_id);
        }
      } catch (error) {
        console.error("Error fetching chat ID:", error);
      }
    };

    fetchChatId();
  }, [authTokens, userId, prodOwner]);

  const handleSend = async () => {
    console.log("Message to send:", messages);

    try {
      // Send the chat message
      const data = await sendChatMessage(
        userId,
        authTokens,
        messages,
        receiver,
        product
      );

      // If chatId is already set
      if (chatId !== "") {
        setMessages([...messages, data]);
        setMessages(initialMessage);
        navigation.navigate("UserMessages", {
          chatId: chatId,
          sender: userId,
          receiver: receiver,
          product: product,
        });
      } else {
        // If chatId is not set (creating a new chat)
        setMessages("");
        // Set the chatId of the new chat
        setChatId(data.id);
        navigation.navigate("UserMessages", {
          chatId: data.id,
          sender: userId,
          receiver: receiver,
          product: product,
        });
        setMessages(initialMessage);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleSavePress = async () => {
    console.log(`Save button pressed`);
    setIsSaved(!isSaved); // Toggle the saved state
    // TODO: Implement the save listing functionality
    try {
      await toggleSavePost(authTokens, userId, product_id);
    } catch (error) {
      console.error("Error toggling saved in product screen")
    }
  };

  const handleChatPress = async () => {
    try {
      if (chatId !== "") {
        navigation.navigate("UserMessages", {
          chatId: chatId,
          sender: userId,
          receiver: receiver,
          product: product,
        });
      } else {
        setMessages([...messages, data]);
        setMessages(initialMessage);
        const data = await sendChatMessage(
          userId,
          authTokens,
          messages,
          receiver,
          product
        );
        setChatId(data.id);
        navigation.navigate("UserMessages", {
          chatId: data.id,
          sender: userId,
          receiver: receiver,
          product: product,
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  //Still need to implement opening the app and listing from link sent. Having trouble with expo link to display as link in apps
  const handleSharePress = async () => {
    try {
      const listingDeepLink = `http://tinyurl.com/mr39a6wr`; // Create your own in the browser with the format exp://ip-address/passtheplate/posts/${listing.id}
      const shareMessage = `Check out this${listing.title} from Pass The O \n\n${listingDeepLink}`;

      await Share.share({
        title: listing.title,
        message: shareMessage,
        url: listingDeepLink,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const handleUserPress = () => {
    if (listing.owner === userId) {
      navigation.navigate("Tabs", {
        screen: "Profile",
      });
    } else {
      navigation.navigate("OtherProfile", {
        userId: listing.owner,
        fromListing: true,
        listing: listing,
      });
    }
  };

  return (
    <View style={styles.chatCard}>
      <View style={styles.chatHeader}>
        <Image source={chatBubble} style={styles.chatIcon} />
        <CustomText fontType={"title"} style={styles.chatTitle}>
          Request Plate
        </CustomText>
      </View>
      <View style={styles.messageBox}>
        <TextInput
          style={styles.messageInput}
          onChangeText={setMessages}
          value={messages}
          maxLength={50}
        />
        <ChatButton title="SEND" onPress={handleSend} />
      </View>
      <View style={styles.chatButtonsContainer}>
        {/* Chat button */}
        <TouchableOpacity style={styles.chatButton} onPress={handleChatPress}>
          <Image source={chat} style={styles.chatButtonIcon} />
          <CustomText style={styles.chatButtonText} fontType={"subHeader"}>
            Chat
          </CustomText>
        </TouchableOpacity>

        {/* User button */}
        <TouchableOpacity style={styles.chatButton} onPress={handleUserPress}>
          <Image source={user} style={styles.chatButtonIcon} />
          <CustomText style={styles.chatButtonText} fontType={"subHeader"}>
            Giver
          </CustomText>
        </TouchableOpacity>

        {/* Share button */}
        <TouchableOpacity style={styles.chatButton} onPress={handleSharePress}>
          <Image source={share} style={styles.chatButtonIcon} />
          <CustomText style={styles.chatButtonText} fontType={"subHeader"}>
            Share
          </CustomText>
        </TouchableOpacity>

        {/* Save button */}
        <TouchableOpacity style={styles.chatButton} onPress={handleSavePress}>
          <MaterialIcons
            name="favorite"
            size={24}
            color={isSaved ? "red" : "grey"}
          />
          <CustomText style={styles.chatButtonText} fontType={"subHeader"}>
            Save
          </CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatComponent;
