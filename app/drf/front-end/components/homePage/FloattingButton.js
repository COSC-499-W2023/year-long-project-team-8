import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const FloatingButton = ({ onButtonPress, scrollRef }) => {
  return (
    <TouchableOpacity
      style={styles.floatingButton}
      onPress={() => {
        onButtonPress && onButtonPress();
      }}
    >
      <Ionicons name="ios-arrow-up" size={24} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FCA63C",
    justifyContent: "center",
    alignItems: "center",
    bottom: 20,
    right: 15,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default FloatingButton;
