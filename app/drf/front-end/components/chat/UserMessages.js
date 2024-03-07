import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, RefreshControl, KeyboardAvoidingView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import { baseEndpoint } from '../../config/config';
import AuthContext from '../../context/AuthContext';
import styles from '../chat/styles';
import { useRoute } from '@react-navigation/native';
import { getChatMessages, sendChatMessage, getUserData, getProductById } from '../helperFunctions/apiHelpers';

const UserMessages = ({route}) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [receiverDetails, setReceiverDetails] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [productDetails, setProductDetails] = useState('');
  const { authTokens, userId } = useContext(AuthContext);
  const chatId = route.params?.chatId; 
  const receiver = route.params?.receiver;
  const product = route.params?.product;
  const sender = route.params?.sender;
  const navigation = useNavigation(); // Use useNavigation hook to access navigation object

  useEffect(() => {
    const fetchChatMessages = async () => {
      try {
        const chatData = await getChatMessages(authTokens, chatId);
        setMessages(chatData.messages);
        console.log("Message objects fetched from getChatMessages");
        console.log("Sender:", chatData.sender);
        console.log("Receiver:", chatData.receiver);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    const fetchReceiverDetails = async () => {
      try {
        const userDetailsId = sender !== userId ? sender : receiver;
        const userData = await getUserData(userDetailsId, authTokens);
        setReceiverDetails(userData);
      } catch (error) {
        console.error('Error fetching receiver details:', error);
      }
    };

    //Was having issues with this api call permissions
    const fetchProductDetails = async () => {
      try {
        const productData = await getProductById(authTokens, product);
        setProductDetails(productData);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchChatMessages();
    fetchReceiverDetails();
    fetchProductDetails();
  }, [authTokens, chatId, sender, receiver, product]);

  const isSender = (message) => message.sender === userId;

  const renderMessageBubble = ({ item }) => (
    <View style={{ marginBottom: 8, alignSelf: isSender(item) ? 'flex-end' : 'flex-start' }}>
      <View
        style={{
          padding: 8,
          backgroundColor: isSender(item) ? '#FFA500' : '#ddd',
          borderRadius: 8,
        }}>
        <Text style={{ color: isSender(item) ? 'white' : 'black' }}>
          {item.message}
        </Text>
      </View>
    </View>
  );

  const sendMessage = async () => {
    try {
      let messageToSend = newMessage.trim(); // Trim whitespace from the message
      if (messageToSend === '') {
        // If the message is empty, set a default message
        messageToSend = "Hi! Can I get this plate?";
      }
  
      const data = await sendChatMessage(userId, authTokens, messageToSend, receiver, product);
      setMessages([...messages, data]);
      setNewMessage('');
      await onRefresh();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  
  console.log("REc details", receiverDetails);
  console.log("Prod details chat", productDetails);
  const onRefresh = async () => {
    setRefreshing(true); // Set refreshing state to true
    try {
      const chatData = await getChatMessages(authTokens, chatId);
      setMessages(chatData.messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setRefreshing(false); // Set refreshing state to false
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style = {styles.backText}>Back </Text> 
          </TouchableOpacity>
          <Text style={styles.headerText}>Talk to {receiverDetails.firstname ?? receiverDetails.email ?? receiver} about {productDetails.title ?? product}!</Text>
        </View>
        <FlatList
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderMessageBubble}
          contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 16 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your message..."
            value={newMessage}
            onChangeText={(text) => setNewMessage(text)}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};


export default UserMessages;
