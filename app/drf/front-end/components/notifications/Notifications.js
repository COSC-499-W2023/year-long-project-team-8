import React, { useState } from "react";
import { View, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import CustomText from "../CustomText";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      text: "New message from John",
      type: "message",
      chatId: "1",
      opened: false,
    },
    {
      id: "2",
      text: "Reminder: Your Listing 'Chicken Nuggets' will expire in 3 days!",
      type: "postExpired",
      postId: "77",
      opened: false,
    },
    {
      id: "3",
      text: "Leave a review to Mark for the Pasta!",
      type: "postReceived",
      postId: "77",
      opened: false,
    },
  ]);

  const navigation = useNavigation();

  const navigateBasedOnNotification = (notification) => {
    // Update the 'opened' status of the notification
    const updatedNotifications = notifications.map((notif) =>
      notif.id === notification.id ? { ...notif, opened: true } : notif
    );
    setNotifications(updatedNotifications);

    // Navigate based on the notification type
    switch (notification.type) {
      case "message":
        navigation.navigate("Chat", { chatId: notification.chatId });
        break;
      case "postExpired":
        navigation.navigate("PostDetails", { postId: notification.postId });
        break;
      case "postReceived":
        console.log("Navigate to reviews");
        break;
      default:
        console.warn("Unknown notification type");
    }
  };

  const renderNotification = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <View>
          <MaterialIcons name="circle" size={10} color="blue" />
        </View>
        <TouchableOpacity
          style={styles.notificationItem}
          onPress={() => navigateBasedOnNotification(item)}
        >
          <CustomText>{item.text}</CustomText>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  notificationItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
});

export default Notifications;
