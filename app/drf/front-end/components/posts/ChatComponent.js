import React, { useState } from 'react';
import { View, Image, TextInput, TouchableOpacity, Share, Linking } from 'react-native';
import CustomText from '../CustomText'; 
import ChatButton from './ChatButton'; 
import styles from './styles'; 
const chatBubble = require("../../assets/icons/chat-bubbles.png"); 
import { ipAndPort } from '../../config/config';

const ChatComponent = ({ initialMessage = "Hi! Can I get this plate?", listing}) => {
  const [message, setMessage] = useState(initialMessage);
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

  //TODO: Shorten url implementation to be done in backend, not safe to user tinyurl api
  const handleSharePress = async () => {
    try {
      const listingId = listing.id;
      const listingDeepLink = `exp://${ipAndPort}/--/passtheplate/posts/${listingId}`;
  
      // TinyURL's API to shorten the URL
      const response = await fetch(`http://tinyurl.com/api-create.php?url=${encodeURIComponent(listingDeepLink)}`);
      const shortUrl = await response.text();
  
      if (shortUrl) {
        const shareMessage = `Check out this listing in Pass The Plate!\n${listing.title}\n\n${shortUrl}`;
  
        await Share.share({
          title: `${listing.title}`,
          message: shareMessage,
          url: shortUrl,
        });
        console.log('Shared successfully');
      } else {
        console.error('Failed to shorten URL');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };
  
  
  
  const handleUserPress = () => {
    console.log(`View user`);
    // TODO: Open user's page
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
