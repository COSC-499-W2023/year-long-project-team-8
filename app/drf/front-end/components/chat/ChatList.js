import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, Image, RefreshControl } from 'react-native';
import { getChatList, getUserData } from '../helperFunctions/apiHelpers'; 
import AuthContext from '../../context/AuthContext';
import styles from '../profilePage/profilePageStyles';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

const ChatList = () => {
  const [chatList, setChatList] = useState([]);
  const { authTokens, userId } = useContext(AuthContext);
  const [userDetailsMap, setUserDetailsMap] = useState({});
  const [refreshing, setRefreshing] = useState(false); // State for refreshing
  const navigation = useNavigation();

  useEffect(() => {
    const fetchChatList = async () => {
      try {
        if (authTokens) {
          let chats = await getChatList(authTokens);
          // Sort chats by timestamp (newest to oldest)
          chats.sort((a, b) => b.timestamp - a.timestamp);
          console.log('Fetched and sorted chat list:', chats);
          setChatList(chats);
        } else {
          // Clearing chatlist when user logs out
          setChatList([]); 
        }
      } catch (error) {
        console.error('Error fetching chat list:', error);
      }
    };
    fetchChatList();
  }, [authTokens]);
  

  useEffect(() => {
    const fetchUserDetails = async (id) => {
      try {
        const data = await getUserData(id, authTokens);
        return data;
      } catch (error) {
        console.error('Error fetching user details:', error);
        return null;
      }
    };

    const updateUserDetailsMap = async (id) => {
      if (!userDetailsMap[id]) {
        const userDetailsData = await fetchUserDetails(id);
        setUserDetailsMap(prevMap => ({
          ...prevMap,
          [id]: userDetailsData
        }));
      }
    };

    chatList.forEach(chat => {
      if (chat.sender !== userId) {
        updateUserDetailsMap(chat.sender);
      } else if (chat.receiver !== userId) {
        updateUserDetailsMap(chat.receiver);
      }
    });
  }, [chatList, userId, authTokens, userDetailsMap]);

  const navigateToChat = (chat) => {
    console.log("trying to navigate to chat with id", chat.id);
    console.log("Chat.product", chat);
    navigation.navigate('UserMessages', { chatId: chat.id , sender: chat.sender, receiver: chat.receiver, product: chat.product});
  };

  const formatTime = (timestamp) => {
    const currentTime = moment();
    const messageTime = moment(timestamp);
    const diffMinutes = currentTime.diff(messageTime, 'minutes');
    if (diffMinutes < 60) {
      return `${diffMinutes} minutes ago`;
    }
    const diffHours = currentTime.diff(messageTime, 'hours');
    if (diffHours < 24) {
      return `${diffHours} hours ago`;
    }
    const diffDays = currentTime.diff(messageTime, 'days');
    return `${diffDays} days ago`;
  };
  

  const onRefresh = async () => {
    setRefreshing(true); // Set refreshing to true while fetching new data
    try {
      // Fetch new data
      const chats = await getChatList(authTokens);
      setChatList(chats);
    } catch (error) {
      console.error('Error fetching chat list:', error);
    } finally {
      setRefreshing(false); // Set refreshing to false after fetching new data
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
      {/* Header Text for testing */}
      <FlatList
        data={chatList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const otherUserId = item.sender !== userId ? item.sender : item.receiver;
          const userDetails = userDetailsMap[otherUserId] || {};
          return (
            <TouchableOpacity onPress={() => navigateToChat(item)}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                <View style={{ width: 40, height: 40, borderRadius: 20, overflow: 'hidden' }}>
                  <Image
                    source={require('../../assets/icons/profile.png')}
                    style={{ width: '100%', height: '100%' }}
                  />
                </View>
                <View style={{ marginLeft: 12 }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 19 }}>
                    {userDetails.firstname ?? userDetails.email ?? 'Unknown User'}
                  </Text>
                  <Text style={{ fontSize: 14, marginLeft: 10, paddingLeft: 10 }}>{formatTime(item.timestamp)}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        refreshControl={ // Add RefreshControl component
          <RefreshControl
            refreshing={refreshing} // Set refreshing state
            onRefresh={onRefresh} // Function to handle refresh
          />
        }
      />
    </View>
  );
};

export default ChatList;
