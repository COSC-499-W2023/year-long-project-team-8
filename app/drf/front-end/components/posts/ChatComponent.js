import React, { useState, useEffect, useContext } from 'react';
import { View, Image, TextInput, TouchableOpacity, Share, Linking } from 'react-native';
import CustomText from '../CustomText'; 
import ChatButton from './ChatButton'; 
import { sendChatMessage, getChatList } from '../helperFunctions/apiHelpers';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../../context/AuthContext';
import styles from './styles'; 
const chatBubble = require("../../assets/icons/chat-bubbles.png"); 
const ChatComponent = ({ navigation, initialMessage = "Hi! Can I get this plate?", listing}) => {
  const [messages, setMessages] = useState(initialMessage);
  const { authTokens, userId } = useContext(AuthContext);
  const [chatId, setChatId] = useState('');
  const [receiver, setReceiver] = useState('');
  const [product, setProduct] = useState('');
  const navigation = useNavigation();
  const chatListing = listing;
  const prodOwner = listing.owner;
  console.log("Chat listing", chatListing);
  console.log("Product owner (receiver)", prodOwner);
  const chat = require("../../assets/icons/speech-bubble.png");
  const share = require("../../assets/icons/share-arrow.png");
  const user = require("../../assets/icons/user-profile.png");
  const save = require("../../assets/icons/ribbon.png");

  useEffect(() => {
    const fetchChatId = async () => {
      try {
        // Fetch chat list
        const chats = await getChatList(authTokens);
        console.log("CHats obtained from getChatList", chats);
        console.log("Prod owner", prodOwner);
        // Find the chat with the matching userId and listing owner
        const chat = chats.find(chat => chat.receiver === prodOwner);
        console.log("chat from product owner in prod details:", chat);
        if (chat) {
          // Setting parameters for sendChat call
          setChatId(chat.id);
          setReceiver(chat.receiver);
          setProduct(chat.product);
        } else {
          console.warn('No chat found for the specified user and listing owner');
        }
      } catch (error) {
        console.error('Error fetching chat ID:', error);
      }
    };
  
    fetchChatId();
  }, [authTokens, userId, prodOwner]);

  const handleSend = async () => {
    console.log("Message to send:", messages);
    try {
      const data = await sendChatMessage(userId, authTokens, messages, receiver, product);
      setMessages([...messages, data]);
      setMessages(initialMessage);
    } catch (error) {
      console.error('Error sending message:', error);
    }
    //need to change this to navigate to correct chatId
    console.log("Chat id", chatId);
    navigation.navigate('UserMessages', {chatId : chatId});
    
  };

  const handleSavePress = () => {
    console.log(`Save button pressed`);
    // TODO: Save listing functionality
  };

  const handleChatPress = () => {
    console.log(`Open chat page`);
    navigation.navigate('ChatList');
    // TODO: Open chat page
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
      console.error('Error sharing:', error);
    }
  };
  
  
  const handleUserPress = () => {
    navigation.navigate('OtherProfile', {
      listing: listing,  
      userId: listing.owner 
    });
  };


  return (
    <View style={styles.chatCard}>
      <View style={styles.chatHeader}>
        <Image source={chatBubble} style={styles.chatIcon} />
        <CustomText fontType={"title"} style={styles.chatTitle}>Request Plate</CustomText>
      </View>
      <View style={styles.messageBox}>
        <TextInput
          style={styles.messageInput}
          onChangeText={setMessages}
          value={messages}
          maxLength={50}
        />
        <ChatButton
          title="SEND"
          onPress={handleSend}
        />
      </View>
      <View style={styles.chatButtonsContainer}>
        {/* Chat button */}
        <TouchableOpacity style={styles.chatButton} onPress={handleChatPress}>
          <Image source={chat} style={styles.chatButtonIcon} />
          <CustomText style={styles.chatButtonText} fontType={"subHeader"}>Chat</CustomText>
        </TouchableOpacity>

        {/* User button */}
        <TouchableOpacity style={styles.chatButton} onPress={handleUserPress}>
          <Image source={user} style={styles.chatButtonIcon} />
          <CustomText style={styles.chatButtonText} fontType={"subHeader"}>Giver</CustomText>
        </TouchableOpacity>

        {/* Share button */}
        <TouchableOpacity style={styles.chatButton} onPress={handleSharePress}>
          <Image source={share} style={styles.chatButtonIcon} />
          <CustomText style={styles.chatButtonText} fontType={"subHeader"}>Share</CustomText>
        </TouchableOpacity>

        {/* Save button */}
        <TouchableOpacity style={styles.chatButton} onPress={handleSavePress}>
          <Image source={save} style={styles.chatButtonIcon} />
          <CustomText style={styles.chatButtonText} fontType={"subHeader"}>Save</CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatComponent;
