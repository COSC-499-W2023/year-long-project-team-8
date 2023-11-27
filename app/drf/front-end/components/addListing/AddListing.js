import React, { useState } from "react";
import { StyleSheet, ScrollView, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import CustomInput from "./CustomInput";
import Selector from "./Selector";
import ImageUpload from "./ImageUpload";
import PostButton from "./PostButton";
import CustomText from "../CustomText";

const handlePost = () => {
  console.log("Button Pressed");
  //TODO: Backend
};

const AddListing = () => {
  return (
    <View style={styles.container}>
      <CustomInput title={"Title"} maxLength={30}></CustomInput>
      <CustomInput
        title={"Description"}
        maxLength={100}
        height={130}
        fontSize={18}
        multiline={true}
      ></CustomInput>
      <Selector title={"Category"} desc="Choose a Category" />
      <Selector title={"Allergens"} desc="Choose Allergens" />
      <ImageUpload></ImageUpload>
      <PostButton title="Pass Your Plate" onPress={handlePost} />
      <TouchableOpacity style={styles.cancel}>
        <CustomText fontType={"subHeader"} style={styles.cancelText}>
          Cancel
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};

export default AddListing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cancel: {
    alignSelf: "center",
    margin: 20,
  },
  cancelText: {
    fontSize: 15,
    color: "#F85734",
  },
});
