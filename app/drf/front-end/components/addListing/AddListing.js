import React, { useState } from "react";
import { StyleSheet, ScrollView, TouchableOpacity, Button } from "react-native";
import CustomInput from "./CustomInput";
import Selector from "./Selector";
import ImageUpload from "./ImageUpload";
import PostButton from "./PostButton";
import CustomText from "../CustomText";
import CategoryModal from "./CategoryModal";
import AllergenModal from "./AllergenModal";
import DatePickerSelector from "./DatePickerSelector";

const AddListing = () => {
  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isAllergenModalVisible, setAllergenModalVisible] = useState(false);
  const [selectedAllergens, setSelectedAllergens] = useState([]);
  const [expirationDate, setExpirationDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

  //Form submittion logic
  const handlePost = () => {
    let missingFields = [];

    // Check each field and add to missingFields if empty
    if (!title.trim()) missingFields.push("title");
    if (!description.trim()) missingFields.push("description");
    if (selectedCategories.length === 0) missingFields.push("categories");
    if (selectedAllergens.length === 0) missingFields.push("allergens");
    if (!selectedDate) missingFields.push("expiration date");
    if (images.length === 0) missingFields.push("images");

    // Check if missingFields array is not empty
    if (missingFields.length > 0) {
      // Create a single alert with all missing fields
      alert(
        `Please fill in the following fields: ${missingFields.join(", ")}.`
      );
      return;
    }

    // If all fields are valid, create formData and log it
    const formData = {
      title: title,
      description: description,
      categories: selectedCategories,
      allergens: selectedAllergens,
      expirationDate: selectedDate.toISOString().split("T")[0],
      images: images,
    };

    console.log("Form Data:", JSON.stringify(formData, null, 2));
    //TODO: Backend implementation
  };

  // Function to reset the form
  const resetForm = () => {
    // Reset all state variables to their initial values
    setCategoryModalVisible(false);
    setSelectedCategories([]);
    setAllergenModalVisible(false);
    setSelectedAllergens([]);
    setSelectedDate(new Date());
    setTitle("");
    setDescription("");
    setImages([]);
  };

  // Handles closing the modal without selecting categories.
  const handleCategoryCloseModal = () => {
    setCategoryModalVisible(false);
  };

  // Handles closing the modal without selecting allergens.
  const handleAllergenCloseModal = () => {
    setAllergenModalVisible(false);
  };

  // Handles the selection of categories and closes the modal.
  const handleCategorySelect = (categories) => {
    setSelectedCategories(categories);
    setCategoryModalVisible(false);
  };

  // Handles the selection of categories and closes the modal.
  const handleAllergenSelect = (allergens) => {
    setSelectedAllergens(allergens);
    setAllergenModalVisible(false);
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

  // Determines the text to display for the selected allergens.
  let allergenDescription = "Add Allergens";
  if (selectedAllergens.length === 1) {
    allergenDescription = selectedAllergens[0];
  } else if (selectedAllergens.length > 1) {
    allergenDescription = `${selectedAllergens[0]} +${
      selectedAllergens.length - 1
    } other/s`;
  }

  return (
    <ScrollView style={styles.container}>
      <CustomInput
        title={"Title"}
        maxLength={30}
        text={title}
        setText={setTitle}
      />
      <CustomInput
        title={"Description"}
        maxLength={100}
        height={150}
        fontSize={18}
        multiline={true}
        text={description}
        setText={setDescription}
      />
      <Selector
        title={"Category"}
        desc={categoryDescription}
        onPress={() => setCategoryModalVisible(true)}
      />
      <Selector
        title={"Allergens"}
        desc={allergenDescription}
        onPress={() => setAllergenModalVisible(true)}
      />
      <DatePickerSelector
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      />
      <ImageUpload images={images} setImages={setImages} />
      <PostButton title="Pass Your Plate" onPress={handlePost} />
      <TouchableOpacity style={styles.cancel} onPress={resetForm}>
        <CustomText fontType={"subHeader"} style={styles.cancelText}>
          Reset
        </CustomText>
      </TouchableOpacity>
      <CategoryModal
        visible={isCategoryModalVisible}
        selectedCategoriesProp={selectedCategories}
        onClose={handleCategoryCloseModal}
        onSelect={handleCategorySelect}
      />
      <AllergenModal
        visible={isAllergenModalVisible}
        selectedAllergensProp={selectedAllergens}
        onClose={handleAllergenCloseModal}
        onSelect={handleAllergenSelect}
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
