import React, { useState, useContext } from 'react';
import { View, Image, TextInput, TouchableOpacity, Share, Linking } from 'react-native';
import CustomText from '../CustomText'; 
import ChatButton from './ChatButton'; 
import styles from './styles'; 
import AuthContext from '../../context/AuthContext';
const chatBubble = require("../../assets/icons/chat-bubbles.png"); 

const ChatComponent = ({navigation, initialMessage = "Hi! Can I get this plate?", listing}) => {
  const [message, setMessage] = useState(initialMessage);
  const { userId, authTokens } = useContext(AuthContext); // Accesses auth context for user ID and tokens.
  const chat = require("../../assets/icons/speech-bubble.png");
  const share = require("../../assets/icons/share-arrow.png");
  const user = require("../../assets/icons/user-profile.png");
  const save = require("../../assets/icons/ribbon.png");


  const handleSend = () => {
    console.log("Message to send:", message);
    // TODO: send message functionality
  };

  const handleSavePress = () => {
    console.log(`Save button pressed`);
    // TODO: Save listing functionality
  };

  const handleChatPress = () => {
    console.log(`Open chat page`);
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
    if (listing.owner === userId) {
      navigation.navigate('Tabs', { 
        screen: 'Profile',
      });    } else {
      navigation.navigate('OtherProfile', {
        listing: listing,  
        userId: listing.owner 
      });
    }
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
          onChangeText={setMessage}
          value={message}
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
