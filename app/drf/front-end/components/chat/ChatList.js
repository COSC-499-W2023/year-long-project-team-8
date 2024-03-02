import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button } from 'react-native';
import { getChatList, getUserData } from '../helperFunctions/apiHelpers'; 
import AuthContext from '../../context/AuthContext';
import styles from '../profilePage/profilePageStyles';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { Image } from 'react-native';

const ChatList = () => {
  const [chatList, setChatList] = useState([]);
  const { authTokens, userId } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState(null);
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
  


  const navigateToChat = (chat) => {
    console.log("trying to navigate to chat with id", chat.id);
    console.log("Chat.rpoduct", chat);
    navigation.navigate('UserMessages', { chatId: chat.id , receiver: chat.receiver, product: chat.product});
  };

  const formatTime = (timestamp) => {
    const currentTime = moment();
    const messageTime = moment(timestamp);
    const diffHours = currentTime.diff(messageTime, 'hours');
    return `${diffHours} hours ago`;
  };

    // function to get user details (need to dynamically call this with correct sender/receiver id)
    useEffect(() => {
      const fetchUserDetails = async () => {
        try {
          const data = await getUserData(userId, authTokens);
          setUserDetails(data);
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      };
      fetchUserDetails();
    }, [userId]);
  
    console.log("Fetch user details", userDetails);
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
      {/* Header Text for testing */}
      
      <FlatList
  data={chatList}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => (
    <TouchableOpacity onPress={() => navigateToChat(item)}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
        <View style={{ width: 40, height: 40, borderRadius: 20, overflow: 'hidden' }}>
        <Image
          //actual pfps wont render right now
              //source={item.receiver.profile_picture ? { uri: item.receiver.profile_picture } : require('../../assets/icons/profile.png')}
              source={ require('../../assets/icons/profile.png')}

              style={{ width: '100%', height: '100%' }}
            />
        </View>
        <View style={{ marginLeft: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}></View>
        {item.sender.id !== userId ? (
        <Text style={{ fontWeight: 'bold' , fontSize: 19}}>{item.sender.firstname ?? item.sender.email ?? item.sender}</Text>
      ) : (
        <Text style={{ fontWeight: 'bold' , fontSize: 19}}>{item.receiver.firstname ?? item.receiver.email ?? item.receiver}</Text>
      )}
      
        <Text style={{ fontSize: 14 , marginLeft: 10, paddingLeft: 10 }}>{formatTime(item.timestamp)}</Text>
      </View>
    </TouchableOpacity>
  )}
/>
    </View>
  );
};

export default ChatList;