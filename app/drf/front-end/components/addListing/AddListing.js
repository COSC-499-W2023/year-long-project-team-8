import React, { useState, useContext } from "react";
import { StyleSheet, ScrollView, TouchableOpacity, Button } from "react-native";
import CustomInput from "./CustomInput";
import Selector from "./Selector";
import ImageUpload from "./ImageUpload";
import PostButton from "./PostButton";
import CustomText from "../CustomText";
import CategoryModal from "./CategoryModal";
import AllergenModal from "./AllergenModal";
import DatePickerSelector from "./DatePickerSelector";
import MissingFieldsModal from "./MissingFieldsModal"; // import the modal
import { createProductImages } from "../helperFunctions/apiHelpers";
import AuthContext from "../../context/AuthContext"; // Import AuthContext
import { useAppState } from "../../context/AppStateContext";

const AddListing = ({ navigation, onPostCreation }) => {
  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isAllergenModalVisible, setAllergenModalVisible] = useState(false);
  const [selectedAllergens, setSelectedAllergens] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date(Date.now() + 86400000));
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [isTitleMissing, setTitleMissing] = useState(false);
  const [isDescriptionMissing, setDescriptionMissing] = useState(false);
  const [isCategoriesMissing, setCategoriesMissing] = useState(false);
  const [isAllergensMissing, setAllergensMissing] = useState(false);
  const [isImagesMissing, setImagesMissing] = useState(false);
  const [missingFields, setMissingFields] = useState([]);

  const { authTokens, userId } = useContext(AuthContext);

  const [showMissingFieldsModal, setShowMissingFieldsModal] = useState(false);

  const { updatePostCreated } = useAppState();

  //Form submittion logic
  const handlePost = async () => {
    let newMissingFields = [];

    // Check each field and add to missingFields if empty
    if (!title.trim()) newMissingFields.push("Title");
    if (!description.trim()) newMissingFields.push("Description");
    if (selectedCategories.length === 0) newMissingFields.push("Categories");
    if (images.length === 0) newMissingFields.push("Images");
    setTitleMissing(!title.trim());
    setDescriptionMissing(!description.trim());
    setCategoriesMissing(selectedCategories.length === 0);
    setImagesMissing(images.length === 0);
    setMissingFields(newMissingFields);

    // Check if missingFields array is not empty
    if (newMissingFields.length > 0) {
      // Show the modal instead of an alert
      setShowMissingFieldsModal(true);
      return;
    }

    // If all fields are valid, create formData and log it
    const formData = {
      title: title,
      content: description,
      categories: selectedCategories,
      allergens: selectedAllergens,
      best_before: selectedDate.toISOString().split("T")[0],
      owner: userId,
    };

    console.log("Form Data:", JSON.stringify(formData, null, 2));
    console.log("Image Data:", JSON.stringify(images, null, 2));
    try {
      // Wait for createProductImages to finish before proceeding
      await createProductImages(formData, images, authTokens);

      // If createProductImages is successful, update postCreated and navigate
      await updatePostCreated();
      navigation.navigate("Home");
    } catch (error) {
      // Handle error if createProductImages fails
      console.error("Error creating product images:", error);
    }
  };

  // Function to reset the form
  const resetForm = () => {
    // Reset all state variables to their initial values
    setCategoryModalVisible(false);
    setSelectedCategories([]);
    setAllergenModalVisible(false);
    setSelectedAllergens([]);
    setSelectedDate(new Date(Date.now() + 86400000));
    setTitle("");
    setDescription("");
    setImages([]);

    // Reset missing field indicators
    setTitleMissing(false);
    setDescriptionMissing(false);
    setCategoriesMissing(false);
    setAllergensMissing(false);
    setImagesMissing(false);
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

  // Function to close the missing fields modal
  const handleCloseModal = () => {
    setShowMissingFieldsModal(false);
  };

  return (
    <ScrollView style={styles.container}>
      <CustomInput
        title={"Title"}
        maxLength={30}
        text={title}
        setText={setTitle}
        isFieldMissing={isTitleMissing}
      />
      <CustomInput
        title={"Description"}
        maxLength={800}
        height={150}
        fontSize={18}
        multiline={true}
        text={description}
        setText={setDescription}
        isFieldMissing={isDescriptionMissing}
      />
      <Selector
        title={"Category"}
        desc={categoryDescription}
        onPress={() => setCategoryModalVisible(true)}
        isFieldMissing={isCategoriesMissing}
      />
      <Selector 
        title={"Allergens"}
        desc={allergenDescription}
        onPress={() => setAllergenModalVisible(true)}
        isFieldMissing={isAllergensMissing}
      />
      <DatePickerSelector
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        minimumDate={new Date(Date.now() + 86400000)} // Set to tomorrow's date
      />

      <ImageUpload
        images={images}
        setImages={setImages}
        isFieldMissing={isImagesMissing}
      />
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
      <MissingFieldsModal
        visible={showMissingFieldsModal}
        missingFields={missingFields}
        onClose={() => {
          setShowMissingFieldsModal(false);
          setMissingFields([]); // Clear missing fields when closing modal
        }}
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
