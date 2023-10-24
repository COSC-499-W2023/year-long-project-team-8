
// ProfilePage.js
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const ProfilePage = ({ route }) => {
    //Look into React Context. May be better for nested components compared to routing 
  const { email } = route.params;

  // You can fetch additional user profile data here using the user's email or ID

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile for {email}</Text>
      {/* Display user profile information here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
});

export default ProfilePage;