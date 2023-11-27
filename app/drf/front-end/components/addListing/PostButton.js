import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import CustomText from "../CustomText";
const PostButton = ({ onPress, title }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <CustomText style={styles.text} fontType={"title"}>
        {title}
      </CustomText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#F8B951",
    padding: 20,
    marginHorizontal: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  text: {
    color: "white",
    fontSize: 16,
  },
});

export default PostButton;
