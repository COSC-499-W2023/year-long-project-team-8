// Import required modules and components
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

// FloatingButton component
const FloatingButton = ({ onButtonPress, scrollRef }) => {
  return (
    // Touchable button with a floating effect
    <TouchableOpacity
      style={styles.floatingButton}
      // On button press, if the onButtonPress prop is provided, execute it
      onPress={() => {
        onButtonPress && onButtonPress();
      }}
    >
      {/* Arrow icon for the button */}
      <Ionicons name="arrow-up" size={24} color="white" />
    </TouchableOpacity>
  );
};

// Styles for the FloatingButton component
const styles = StyleSheet.create({
  floatingButton: {
    // Button styling to make it appear floating
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FCA63C",
    justifyContent: "center",
    alignItems: "center",
    bottom: 20,
    right: 15,
    // Shadow styling for the button
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

// Export the FloatingButton component for use in other files
export default FloatingButton;
