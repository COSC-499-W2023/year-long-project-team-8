import React, { useState, useEffect, useContext  } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { baseEndpoint } from '../../config/config';
import AuthContext from "../../context/AuthContext";
import { getChatMessages, sendChatMessage } from "../helperFunctions/apiHelpers";

const chat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const { authTokens, userId } = useContext(AuthContext);
  
    useEffect(() => {
      const fetchChatMessages = async () => {
        try {
          const messages = await getChatMessages(authTokens);
          setMessages(messages);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      };
  
      fetchChatMessages();
    }, [authTokens]);
  
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
        //fix this later
        keyExtractor={(item) => (item.id ? item.id.toString() : "1")}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 8 }}>
            <Text>{item.sender.username}: {item.message}</Text>
          </View>
        )}
      />
      <View style={{ flexDirection: 'row', marginTop: 16 }}>
        <TextInput
          style={{ flex: 1, marginRight: 8, padding: 8, borderWidth: 1 }}
          placeholder="Type your message..."
          value={newMessage}
          onChangeText={text => setNewMessage(text)}
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
};

export default chat;
