import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { baseEndpoint } from '../../config/config';
import AuthContext from '../../context/AuthContext';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getChatMessages, sendChatMessage } from '../helperFunctions/apiHelpers';

const UserMessages = ({route, navigation}) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { authTokens, userId } = useContext(AuthContext);
  const chatId = route.params?.chatId; //(need to pass chatId when navigating to this screen)
  //const chatId = 4;
  console.log("chat doesnt render");

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
  console.log("User id", userId);
  
  const isSender = (message) => message.sender === userId;

  const renderMessageBubble = ({ item }) => (
    <View style={{ marginBottom: 8, alignSelf: isSender(item) ? 'flex-end' : 'flex-start' }}>
      <View
        style={{
          padding: 8,
          backgroundColor: isSender(item) ? '#FFA500' : '#ddd',
          borderRadius: 8,
        }}>
        <Text>Sender Id: {item.sender}</Text>
        <Text style={{ color: isSender(item) ? 'white' : 'black' }}>
          {item.message}
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

export default UserMessages;
