import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button } from 'react-native';
import { getChatList } from '../helperFunctions/apiHelpers'; 
import AuthContext from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const ChatList = () => {
  const [chatList, setChatList] = useState([]);
  const { authTokens, userId } = useContext(AuthContext);
  const navigation = useNavigation();
  useEffect(() => {
    const fetchChatList = async () => {
      try {
        if (authTokens) {
          const chats = await getChatList(authTokens);
          console.log('Fetched chat list:', chats);
          setChatList(chats);
        } else {
          //Clearing chatlist when user logs out
          setChatList([]); 
        }
      } catch (error) {
        console.error('Error fetching chat list:', error);
      }
    };
    fetchChatList();
  }, [authTokens]);
  

  const handleFetchAllChats = async () => {
    try {
      const allChats = await getChatList(authTokens); 
      console.log('Fetched all chat lists:', allChats);
    } catch (error) {
      console.error('Error fetching all chat lists:', error);
    }
  };

  const navigateToChat = (chat) => {
    console.log("trying to navigate to chat with id", chat.id);
    navigation.navigate('UserMessages', { chatId: chat.id , receiver: chat.receiver, product: chat.product});
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
      {/* Header Text for testing */}
      <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 16 }}>
        Messages
      </Text>
      <Button title="Fetch All Chats" onPress={handleFetchAllChats} />
      <FlatList
  data={chatList}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => (
    <TouchableOpacity onPress={() => navigateToChat(item)}>
      <View style={{ marginBottom: 8, border: '1px solid black', padding: 8 }}>
        <Text>Chat ID: {item.id}</Text>
        <Text>Sender: {item.sender.firstname}</Text>
        <Text>Receiver: {item.receiver.firstname}</Text>
        <Text>Time: {item.timestamp}</Text>
      </View>
    </TouchableOpacity>
  )}
/>
    </View>
  );
};

export default ChatList;