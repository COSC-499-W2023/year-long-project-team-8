// ChatListScreen.js
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import AuthContext from "../../context/AuthContext";
import { getChatMessages } from "../helperFunctions/apiHelpers";

const ChatList = ({ navigation }) => {
  const { authTokens } = useContext(AuthContext);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    // Fetch chat list for the user
    const fetchChatList = async () => {
      try {
        const chatListData = await getChatMessages(authTokens);
        setChats(chatListData);
      } catch (error) {
        console.error('Error fetching chat list:', error);
      }
    };

    fetchChatList();
  }, [authTokens]);

  const navigateToChat = (chatId) => {
    // Navigate to the ChatScreen with the selected chat ID
    navigation.navigate('Chat', { chatId });
  };

  return (
    <View>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigateToChat(item.id)}>
            <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
              <Text>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ChatList;
