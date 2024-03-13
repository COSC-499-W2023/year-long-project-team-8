import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import CustomText from "../CustomText";

const CustomInput = ({
  title,
  maxLength,
  height = 90,
  fontSize = 18,
  multiline = false,
  text,
  setText,
  isFieldMissing,
}) => {
  return (
    <View style={[styles.inputField, isFieldMissing && styles.missingField]}>
      <CustomText style={styles.title} fontType={"title"}>
        {title}
      </CustomText>
      <TextInput
        value={text}
        maxLength={maxLength}
        multiline={multiline}
        onChangeText={setText}
        style={[
          styles.inputText,
          { fontSize: fontSize, height: multiline ? height : undefined },
        ]}
      />
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
    paddingBottom: 20, 
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
  missingField: {
    borderColor: "red",
    borderWidth: 1,
  },
});
