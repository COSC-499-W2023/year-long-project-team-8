import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { getChatList } from '../helperFunctions/apiHelpers'; 
import { useNavigation } from '@react-navigation/native';

const ChatList = ({ authTokens }) => {
  const [chatList, setChatList] = useState([]);
  const navigation = useNavigation();

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

  const navigateToChat = (chat) => {
    navigation.navigate('Chat', { chatId: chat.id });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
    {/* Header Text for testing */}
    <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 16 }}>
        Messages
      </Text>
      <FlatList
        data={chatList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigateToChat(item)}>
            <View style={{ marginBottom: 8 }}>
              <Text>{item.sender.firstname}: {item.message}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ChatList;
