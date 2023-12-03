import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import CustomText from "../CustomText";

// Reusable component for displaying a title and a clickable description.
const Selector = ({ title, desc, onPress }) => {
  return (
    <View style={styles.container}>
      {/* Display the title */}
      <CustomText style={styles.title} fontType={"title"}>
        {title}
      </CustomText>

      {/* Clickable area for the description */}
      <TouchableOpacity style={styles.button} onPress={onPress}>
        {/* Display the description */}
        <CustomText fontType={"textFont"}>{desc}</CustomText>
      </TouchableOpacity>
    </View>
  );
};

export default Selector;

const styles = StyleSheet.create({
  title: {
    fontSize: 17,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 20,
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
  button: {},
});
