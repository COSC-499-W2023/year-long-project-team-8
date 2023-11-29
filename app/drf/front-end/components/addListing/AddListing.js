import React, { useState } from "react";
import { StyleSheet, ScrollView, TouchableOpacity, View } from "react-native";
import CustomInput from "./CustomInput";
import Selector from "./Selector";
import ImageUpload from "./ImageUpload";
import PostButton from "./PostButton";
import CustomText from "../CustomText";
import CategoryModal from "./CategoryModal";

const AddListing = () => {
  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Handles closing the modal without selecting categories.
  const handleCloseModal = () => {
    setCategoryModalVisible(false);
  };

  // Handles the selection of categories and closes the modal.
  const handleCategorySelect = (categories) => {
    setSelectedCategories(categories);
    setCategoryModalVisible(false);
  };

  // Placeholder for post submission logic.
  const handlePost = () => {
    console.log("Post Button Pressed");
    //TODO: Backend implementation
  };

  // Determines the text to display for the selected categories.
  let categoryDescription = "Choose Categories";
  if (selectedCategories.length === 1) {
    categoryDescription = selectedCategories[0];
  } else if (selectedCategories.length > 1) {
    categoryDescription = `${selectedCategories[0]} +${
      selectedCategories.length - 1
    } other/s`;
  }

  return (
    <ScrollView style={styles.container}>
      <CustomInput title={"Title"} maxLength={30}></CustomInput>
      <CustomInput
        title={"Description"}
        maxLength={100}
        height={150}
        fontSize={18}
        multiline={true}
      ></CustomInput>
      <Selector
        title={"Category"}
        desc={categoryDescription}
        onPress={() => setCategoryModalVisible(true)}
      />
      <Selector title={"Allergens"} desc="Add Allergens" />
      <ImageUpload />
      <PostButton title="Pass Your Plate" onPress={handlePost} />
      <TouchableOpacity style={styles.cancel}>
        <CustomText fontType={"subHeader"} style={styles.cancelText}>
          Cancel
        </CustomText>
      </TouchableOpacity>
      <CategoryModal
        visible={isCategoryModalVisible}
        selectedCategoriesProp={selectedCategories}
        onClose={handleCloseModal}
        onSelect={handleCategorySelect}
      />
    </ScrollView>
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
