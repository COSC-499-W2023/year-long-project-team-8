import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import CustomText from "../CustomText";

// CustomInput component allows for a stylized text input with character count
const CustomInput = ({
  title, // Title for the input field
  maxLength, // Maximum allowed length of the input
  height = 90, // Default height of the input field, can be overridden
  fontSize = 18, // Default font size, can be overridden
  multiline = false, // Determines if the input field should support multiple lines
}) => {
  const [text, setText] = useState(""); // State to keep track of the input text

  return (
    <View style={[styles.inputField, { height: multiline ? height : height }]}>
      {/* CustomText component used for the title */}
      <CustomText style={styles.title} fontType={"title"}>
        {title}
      </CustomText>
      {/* TextInput for user input */}
      <TextInput
        maxLength={maxLength}
        multiline={multiline}
        onChangeText={setText} // Updates text state on input change
        style={[
          styles.inputText,
          { fontSize: fontSize, height: multiline ? height : undefined },
        ]}
      />
      {/* Character count displayed at the bottom right */}
      <CustomText style={styles.charCount}>
        {`${text.length} / ${maxLength}`}
      </CustomText>
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  title: {
    marginTop: 15,
    marginLeft: 15,
    fontSize: 17,
  },
  inputField: {
    marginTop: 5,
    marginHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "white",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  inputText: {
    paddingLeft: 3,
    marginHorizontal: 10,
    paddingTop: 5,
    textAlignVertical: "top",
  },
  charCount: {
    position: "absolute",
    bottom: 5,
    right: 5,
    fontSize: 12,
    color: "gray",
    marginTop: 5,
  },
});
