import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { baseEndpoint } from '../../config/config';
import AuthContext from '../../context/AuthContext';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getChatMessages, sendChatMessage } from '../helperFunctions/apiHelpers';

const UserMessages = ({route, navigation}) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
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

    fetchChatMessages();
  }, [authTokens, chatId]);
  
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{sender}'s Conversation about Product {product}</Text>
      </View>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderMessageBubble}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 16 }}
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
