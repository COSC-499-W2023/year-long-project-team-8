import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const HomePage = ({ route , navigation}) => {
  const { email } = route.params;

  const navigateToProfile = () => {
    navigation.navigate("ProfilePage", { email: email});

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {email}!</Text>
      <Button title="View Profile" onPress={navigateToProfile} />
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

export default HomePage;
