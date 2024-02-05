import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { baseEndpoint } from '../../config/config';
import AuthContext from '../../context/AuthContext';
import { useRoute } from '@react-navigation/native';
import { getChatMessages, sendChatMessage } from '../helperFunctions/apiHelpers';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { authTokens, userId } = useContext(AuthContext);
  const route = useRoute();
  //const chatId = route.params?.id; (need to pass chatId when navigating to this screen)
  const chatId = 3;

  useEffect(() => {
    const fetchChatMessages = async () => {
      try {
        const chatData = await getChatMessages(authTokens, chatId);
        setMessages(chatData.messages);
        console.log("Message", chatData.messages);
        console.log("Sender:", chatData.sender);
        console.log("Receiver:", chatData.receiver);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchChatMessages();
  }, [authTokens, chatId]);

  const isSender = (message) => message.sender.id === userId;

  const renderMessageBubble = ({ item }) => (
    <View style={{ marginBottom: 8, alignSelf: isSender(item) ? 'flex-end' : 'flex-start' }}>
      <View
        style={{
          padding: 8,
          backgroundColor: isSender(item) ? '#FFA500' : '#ddd', 
          borderRadius: 8,
        }}>
        <Text> {item.chat.chatId}</Text>
        <Text style={{ color: isSender(item) ? 'white' : 'black' }}>
          {item.sender}: {item.message}
        </Text>
      </View>
    </View>
  );

  const sendMessage = async () => {
    try {
      const data = await sendChatMessage(userId, authTokens, newMessage);
      setMessages([...messages, data]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
      <FlatList
        data={messages}
        keyExtractor={(item) => (item.id ? item.id.toString() : '1')}
        renderItem={renderMessageBubble}
      />
      <View style={{ flexDirection: 'row', marginTop: 16 }}>
        <TextInput
          style={{ flex: 1, marginRight: 8, padding: 8, borderWidth: 1 }}
          placeholder="Type your message..."
          value={newMessage}
          onChangeText={(text) => setNewMessage(text)}
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
};

export default Chat;
