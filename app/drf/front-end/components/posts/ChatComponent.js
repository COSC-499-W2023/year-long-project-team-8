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
import {
  sendChatMessage,
  getChatList,
  toggleSavePost,
  getUserData,
} from "../helperFunctions/apiHelpers";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
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
  // console.log("Chat listing", chatListing);
  // console.log("Product owner (receiver)", prodOwner);

  const chat = require("../../assets/icons/speech-bubble.png");
  const share = require("../../assets/icons/share-arrow.png");
  const user = require("../../assets/icons/user-profile.png");
  // console.log("Navigation prop in ChatComponent:", navigation);

  useEffect(() => {
    const fetchChatId = async () => {
      try {
        if (!authTokens) {
          setChatId("");
          setReceiver("");
          setProduct("");
          return;
        }
        console.log("Product id in chatcomp", product_id);
        const chats = await getChatList(authTokens);
        const chat = chats.find(
          (chat) => chat.receiver === prodOwner && chat.product === product_id
        );
        if (chat) {
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
  }, [authTokens, userId, product_id, prodOwner]);

  useEffect(() => {
    checkIsSaved();
  }, [authTokens, userId, prodOwner]);

  const checkIsSaved = async () => {
    try {
      if (authTokens) {
        const data = await getUserData(userId, authTokens);
        setIsSaved(data.saved_posts.includes(product_id));
      }
    } catch (error) {
      console.error("Error checking saved status:", error);
    }
  };

  // useFocusEffect(
  //   React.useCallback(() => {
  //     checkIsSaved();
  //   }, [])
  // );

  // useEffect(() => {
  //   if (authTokens) {
  //     getUserData(userId, authTokens)
  //       .then((data) => {
  //         setExistingEmail(data?.email || "");
  //       })
  //       .catch((error) => {
  //         console.log("Error fetching user data: ", error);
  //       });
  //   }
  // }, [userId, authTokens]);

  const handleSend = async () => {
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
        setMessages(initialMessage);
        navigation.navigate("UserMessages", {
          chatId: chatId,
          sender: userId,
          receiver: receiver,
          product: product,
        });
      } else {
        // If chatId is not set (creating a new chat)
        setMessages(initialMessage);
        // Set the chatId of the new chat
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

  const handleSavePress = async () => {
    // console.log(`Save button pressed`);

    try {
      const data = await toggleSavePost(authTokens, userId, product_id);
      setIsSaved(data.saved_posts.includes(product_id));
    } catch (error) {
      console.error("Error toggling saved in product screen");
    }
  };

  const handleChatPress = async () => {
    try {
      if (chatId === "") {
        const data = await sendChatMessage(
          userId,
          authTokens,
          initialMessage,
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
      } else {
        navigation.navigate("UserMessages", {
          chatId: chatId,
          sender: userId,
          receiver: receiver,
          product: product,
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // const handleDirectionPress = async () => {};

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
        {/* <TouchableOpacity
          style={styles.chatButton}
          onPress={handleDirectionPress}
        >
          <Image source={share} style={styles.chatButtonIcon} />
          <CustomText style={styles.chatButtonText} fontType={"subHeader"}>
            Directions
          </CustomText>
        </TouchableOpacity> */}

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
