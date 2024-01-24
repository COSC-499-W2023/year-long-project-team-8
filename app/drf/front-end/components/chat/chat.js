import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { baseEndpoint } from '../../config/config';

const chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Fetch chat messages from endpoint
    fetch(`${baseEndpoint}/chat/`)
      .then(response => response.json())
      .then(data => {
        setMessages(data.results);
      })
      .catch(error => {
        console.error('Error fetching messages:', error);
      });
  }, []);

  const sendMessage = () => {
    // Send a new message to endpoint
    fetch(`${baseEndpoint}/chat/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: newMessage }),
    })
      .then(response => response.json())
      .then(data => {
        setMessages([...messages, data]);
        setNewMessage('');
      })
      .catch(error => {
        console.error('Error sending message:', error);
      });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
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
