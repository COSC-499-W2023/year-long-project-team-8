import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button } from 'react-native';
import { getChatList } from '../helperFunctions/apiHelpers'; 
import AuthContext from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const ChatList = () => {
  const [chatList, setChatList] = useState([]);
  const navigation = useNavigation();
  const { authTokens } = useContext(AuthContext);

  useEffect(() => {
    const fetchChatList = async () => {
      try {
        const chats = await getChatList(authTokens);
        console.log('Fetched chat list:', chats);
        setChatList(chats);
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
    navigation.navigate('Chat', { chatId: chat.id });
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
              <Text>Receiver: {item.receiver}</Text>
              <Text>Time: {item.timestamp}</Text>
              {/* Add more details as needed */}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ChatList;
