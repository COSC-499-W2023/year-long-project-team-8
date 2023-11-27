import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import CustomText from "../CustomText";

const Selector = ({ title, desc }) => {
  return (
    <View style={styles.container}>
      <CustomText style={styles.title} fontType={"title"}>
        {title}
      </CustomText>
      <TouchableOpacity style={styles.button}>
        <CustomText fontType={"textFont"}>{desc}</CustomText>
      </TouchableOpacity>
    </View>
  );
};

export default Selector;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
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
