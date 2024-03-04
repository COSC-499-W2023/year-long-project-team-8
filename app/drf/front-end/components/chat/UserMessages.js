import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, RefreshControl } from 'react-native';
import { baseEndpoint } from '../../config/config';
import AuthContext from '../../context/AuthContext';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getChatMessages, sendChatMessage, getUserData, getProductListById } from '../helperFunctions/apiHelpers';

const UserMessages = ({route, navigation}) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [receiverDetails, setReceiverDetails] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const { authTokens, userId } = useContext(AuthContext);
  const chatId = route.params?.chatId; 
  const receiver = route.params?.receiver;
  const product = route.params?.product;
  const sender = route.params?.sender;

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
    // const fetchProductDetails = async () => {
    //   try {
    //     const productData = await getProductListById(authTokens, product);
    //     setProductDetails(productData);
    //   } catch (error) {
    //     console.error('Error fetching product details:', error);
    //   }
    // };

    fetchChatMessages();
    fetchReceiverDetails();
    //fetchProductDetails();
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
      const data = await sendChatMessage(userId, authTokens, newMessage, receiver, product);
      setMessages([...messages, data]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  console.log("REc details", receiverDetails);

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
      <View style={styles.header}>
        <Text style={styles.headerText}>Ask {receiverDetails.firstname ?? receiverDetails.email ?? receiver} about plate {product}!</Text>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFA500',
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  receiverText: {
    fontSize: 16,
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  input: {
    flex: 1,
    marginRight: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 8,
  },
  sendButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default UserMessages;
