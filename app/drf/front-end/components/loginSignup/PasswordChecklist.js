import { View, StyleSheet, Text } from "react-native";
import CustomText from "../CustomText";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons"; // Import MaterialIcons for the checkmarks and crosses

const PasswordChecklist = ({ password }) => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasDigits = /\d/.test(password);
  const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const renderItem = (condition, text) => (
    <View style={checklistStyles.itemContainer}>
      <MaterialIcons
        name={condition ? "check" : "close"}
        size={20}
        color={condition ? "green" : "red"}
      />
      <CustomText
        style={condition ? checklistStyles.valid : checklistStyles.invalid}
      >
        {text}
      </CustomText>
    </View>
  );

  return (
    <View style={checklistStyles.container}>
      {renderItem(hasUpperCase, "Contains an uppercase letter")}
      {renderItem(hasLowerCase, "Contains a lowercase letter")}
      {renderItem(hasDigits, "Contains a digit")}
      {renderItem(hasSpecialChars, "Contains a special character")}
      {renderItem(password.length >= 8, "At least 8 characters long")}
    </View>
  );
};

const checklistStyles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  valid: {
    color: "black",
    fontSize: 15,
    marginLeft: 5,
  },
  invalid: {
    color: "black",
    fontSize: 15,
    marginLeft: 5,
  },
});

export default PasswordChecklist;
