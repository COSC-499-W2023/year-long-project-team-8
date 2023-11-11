import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  Image,
  View,
  Text,
  TextInput,
  ScrollView,
  FlatList,
} from "react-native";
import ImagePicker from "./ImagePicker";
import CustomText from "../CustomText";
import CategorySelector from "./CategorySelector";
import AllergenSelector from "./AllergenSelector";
import styles from "./styles";

// Options for categories and allergens
const allergenOptions = [
  "Peanuts",
  "Tree nuts",
  "Milk",
  "Eggs",
  "Wheat",
  "Soy",
  "Fish",
  "Shellfish",
  "Cheese",
];

const categoryOptions = [
  "Italian",
  "Vegan",
  "Meat",
  "Asian",
  "Mexican",
  "Produce",
  "Desserts",
  "Canned",
];

export default function AddListing() {
  // State hooks for managing the form data
  const [imageUri, setImageUri] = useState(null);
  const [title, setTitle] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAllergens, setSelectedAllergens] = useState([]);

  // Callback for when an image is selected
  const onImageSelected = (uri) => {
    setImageUri(uri);
  };

  // Request permissions for camera and media library on component mount
  useEffect(() => {
    (async () => {
      const cameraRollStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      if (!cameraRollStatus.granted || !cameraStatus.granted) {
        alert(
          "Sorry, we need camera roll and camera permissions to make this work!"
        );
      }
    })();
  }, []);

  // Handle the submission of the form
  const handleSave = () => {
    const formData = {
      imageUri,
      title,
      categories: selectedCategories,
      allergens: selectedAllergens,
    };
    console.log("formData", formData);
    // TODO: Backend
  };

  // Toggle the selection of categories
  const toggleCategory = (category) => {
    setSelectedCategories((currentCategories) => {
      if (currentCategories.includes(category)) {
        return currentCategories.filter((c) => c !== category);
      } else {
        return [category, ...currentCategories];
      }
    });
  };

  // Toggle the selection of allergens
  const toggleAllergen = (allergen) => {
    setSelectedAllergens((currentAllergens) => {
      if (currentAllergens.includes(allergen)) {
        return currentAllergens.filter((a) => a !== allergen);
      } else {
        return [allergen, ...currentAllergens];
      }
    });
  };

  // Render the AddListing component UI
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        onChangeText={setTitle}
        value={title}
      />
      <ImagePicker onImageSelected={onImageSelected} />
      <CustomText style={styles.label}>Select Categories:</CustomText>
      <CategorySelector
        categories={categoryOptions}
        selectedCategories={selectedCategories}
        onCategoryToggle={toggleCategory}
      />
      <CustomText style={styles.label}>Select Allergens:</CustomText>
      <AllergenSelector
        allergens={allergenOptions}
        selectedAllergens={selectedAllergens}
        onAllergenToggle={toggleAllergen}
      />
      <TouchableOpacity
        style={[styles.button, styles.saveButton]}
        onPress={handleSave}
      >
        <CustomText style={styles.buttonText}>Save Listing</CustomText>
      </TouchableOpacity>
    </ScrollView>
  );
}
