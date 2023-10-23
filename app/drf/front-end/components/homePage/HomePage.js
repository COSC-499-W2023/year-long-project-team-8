import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Navbar from "../navBar/NavBar";

const HomePage = ({ route }) => {
  const { message } = route.params;

  return (
    <View style={styles.container}>
      <Navbar />
      <Text style={styles.title}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    alignSelf: "center",
  },
});

export default HomePage;
