import React, { useState } from "react";
import { View, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import CustomText from "../CustomText";
import { MaterialIcons } from "@expo/vector-icons";

const Notifications = () => {
  //Logic to set notifications
  const [notifications, setNotifications] = useState([
    { id: "1", text: "New message from John" },
    { id: "2", text: "Your post has been saved by Jane" },
    {
      id: "3",
      text: "Reminder: Your Listing 'Chicken Nuggets' will expire in 3 days!",
    },
  ]);

  const renderNotification = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <View>
          <MaterialIcons name="circle" size={10} color="blue" />
        </View>
        <TouchableOpacity style={styles.notificationItem}>
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
