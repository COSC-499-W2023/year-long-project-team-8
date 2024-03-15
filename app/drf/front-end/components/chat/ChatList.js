import React, { useState, useEffect, useContext } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import {
  getChatList,
  getUserData,
  getProductById,
  getChatMessages,
} from "../helperFunctions/apiHelpers";
import AuthContext from "../../context/AuthContext";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import CustomText from "../CustomText";

const ChatList = () => {
  const [chatList, setChatList] = useState([]);
  const { authTokens, userId } = useContext(AuthContext);
  const [userDetailsMap, setUserDetailsMap] = useState({});
  const [productDetailsMap, setProductDetailsMap] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchChatList = async () => {
      try {
        setLoading(true);
        if (authTokens) {
          let chats = await getChatList(authTokens);
          for (let chat of chats) {
            const chatData = await getChatMessages(authTokens, chat.id);
            const lastMessage = chatData.messages[chatData.messages.length - 1];
            chat.lastMessage = lastMessage ? lastMessage.message : "";
            chat.timestamp = lastMessage
              ? lastMessage.timestamp
              : chat.timestamp;
          }
          chats.sort((a, b) => b.timestamp - a.timestamp);
          setChatList(chats);
        } else {
          setChatList([]);
        }
      } catch (error) {
        console.error("Error fetching chat list:", error);
      } finally {
        setLoading(false);
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
        console.error("Error fetching user details:", error);
        return null;
      }
    };

    const updateUserDetailsMap = async (id) => {
      if (!userDetailsMap[id]) {
        const userDetailsData = await fetchUserDetails(id);
        setUserDetailsMap((prevMap) => ({
          ...prevMap,
          [id]: userDetailsData,
        }));
      }
    };

    chatList.forEach((chat) => {
      if (chat.sender !== userId) {
        updateUserDetailsMap(chat.sender);
      } else if (chat.receiver !== userId) {
        updateUserDetailsMap(chat.receiver);
      }
    });
  }, [chatList, userId, authTokens, userDetailsMap]);

  useEffect(() => {
    const fetchProductDetails = async (id) => {
      try {
        const data = await getProductById(authTokens, id);
        return data;
      } catch (error) {
        console.error("Error fetching product details:", error);
        return null;
      }
    };

    const updateProductDetailsMap = async (id) => {
      if (!productDetailsMap[id]) {
        const productDetailsData = await fetchProductDetails(id);
        setProductDetailsMap((prevMap) => ({
          ...prevMap,
          [id]: productDetailsData,
        }));
      }
    };

    chatList.forEach((chat) => {
      updateProductDetailsMap(chat.product);
    });
  }, [chatList, authTokens, productDetailsMap]);

  const navigateToChat = (chat) => {
    navigation.navigate("UserMessages", {
      chatId: chat.id,
      sender: chat.sender,
      receiver: chat.receiver,
      product: chat.product,
    });
  };

  const formatTime = (timestamp) => {
    const currentTime = moment();
    const messageTime = moment(timestamp);
    const diffMinutes = currentTime.diff(messageTime, "minutes");
    if (diffMinutes < 60) {
      return `${diffMinutes} minutes ago`;
    }
    const diffHours = currentTime.diff(messageTime, "hours");
    if (diffHours < 24) {
      return `${diffHours} hours ago`;
    }
    const diffDays = currentTime.diff(messageTime, "days");
    return `${diffDays} days ago`;
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      let chats = await getChatList(authTokens);
      for (let chat of chats) {
        const chatData = await getChatMessages(authTokens, chat.id);
        const lastMessage = chatData.messages[chatData.messages.length - 1];
        chat.lastMessage = lastMessage ? lastMessage.message : "";
        chat.timestamp = lastMessage ? lastMessage.timestamp : chat.timestamp;
      }
      chats.sort((a, b) => b.timestamp - a.timestamp);
      setChatList(chats);
    } catch (error) {
      console.error("Error refreshing chat list:", error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 16,
        backgroundColor: "white",
      }}
    >
      {loading ? (
        <ActivityIndicator size="large" color="orange" />
      ) : (
        <FlatList
          data={chatList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            const otherUserId =
              item.sender !== userId ? item.sender : item.receiver;
            const userDetails = userDetailsMap[otherUserId] || {};
            const userInitial = userDetails.firstname
              ? userDetails.firstname.charAt(0).toUpperCase()
              : userDetails.email
                ? userDetails.email.charAt(0).toUpperCase()
                : "?";
            const listing = productDetailsMap[item.product];
            const listingImage =
              listing && listing.images && listing.images.length > 0
                ? listing.images[0].image
                : null;
            const listingTitle = listing ? listing.title : "Unknown Listing";

            return (
              <TouchableOpacity
                onPress={() => navigateToChat(item)}
                style={styles.chatListItem}
              >
                <View style={styles.chatListImageContainer}>
                  {listingImage ? (
                    <Image
                      source={{ uri: listingImage }}
                      style={styles.chatListImage}
                    />
                  ) : (
                    <View style={styles.chatListPlaceholder}>
                      <CustomText style={styles.chatListInitial}>
                        {userInitial}
                      </CustomText>
                    </View>
                  )}
                </View>
                <View style={styles.chatListTextContainer}>
                  <CustomText style={styles.chatListListingTitle}>
                    {listingTitle}
                  </CustomText>
                  <CustomText style={styles.chatListLastMessage}>
                    {item.lastMessage}
                  </CustomText>
                  <View style={styles.lastRow}>
                    <CustomText style={styles.chatListName}>
                      {userDetails.firstname ??
                        (userDetails?.email &&
                          userDetails?.email.split("@")[0]) ??
                        "Unknown User"}
                    </CustomText>
                    <CustomText style={styles.chatListTimestamp}>
                      {formatTime(item.timestamp)}
                    </CustomText>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
};

export default ChatList;
