import React, { useState, useEffect } from "react";
import { Modal, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import CustomText from "../CustomText";
import { categoryIcons } from "../Categories";

// CategoryModal component allows users to select categories from a list.
const CategoryModal = ({
  visible,
  onClose,
  onSelect,
  selectedCategoriesProp,
}) => {
  // State to manage selected categories locally within the modal.
  const [selectedCategories, setSelectedCategories] = useState(
    selectedCategoriesProp
  );

  // Effect to update local state when the prop changes (e.g., on modal open).
  useEffect(() => {
    setSelectedCategories(selectedCategoriesProp);
  }, [selectedCategoriesProp]);

  // Extracting category names from the categoryIcons object.
  const categories = Object.keys(categoryIcons);

  // Function to handle the selection of categories.
  const handleSelect = (category) => {
    if (selectedCategories.includes(category)) {
      // If already selected, remove it from the selection.
      setSelectedCategories(
        selectedCategories.filter((item) => item !== category)
      );
    } else {
      // If not selected, add it to the selection.
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // Function to check if a category is selected.
  const isCategorySelected = (category) => {
    return selectedCategories.includes(category);
  };

  // Function to handle the 'Done' action.
  const handleDone = () => {
    onSelect(selectedCategories);
    onClose();
  };

  // Function to get rows of categories for the grid layout.
  const getRows = () => {
    const numColumns = 3;
    const numRows = Math.ceil(categories.length / numColumns);
    let rows = [];

    for (let i = 0; i < numRows; i++) {
      rows.push(categories.slice(i * numColumns, i * numColumns + numColumns));
    }

    return rows;
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      testID="categoryModal"
    >
      <View style={styles.modalBackground}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            testID="closeModalButton"
          >
            <MaterialIcons name="close" size={24} color="black" />
          </TouchableOpacity>
          <View>
            <CustomText fontType={"title"} style={styles.title}>
              Categories
            </CustomText>
          </View>
          {getRows().map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryItem,
                    isCategorySelected(category) && styles.selectedCategoryItem,
                  ]}
                  onPress={() => handleSelect(category)}
                >
                  <Image source={categoryIcons[category]} style={styles.icon} />
                  <CustomText>{category}</CustomText>
                </TouchableOpacity>
              ))}
            </View>
          ))}
          <TouchableOpacity
            style={styles.doneButton}
            onPress={handleDone}
            testID="doneButton"
          >
            <CustomText style={styles.buttonText} fontType={"title"}>
              Done
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CategoryModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 30,
    marginVertical: 60,
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: "hidden",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#E8E8E8",
    borderRadius: 15,
    padding: 5,
  },
  title: {
    fontSize: 17,
    marginTop: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    padding: 5,
  },
  categoryItem: {
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    margin: 5,
    borderRadius: 5,
    width: "30%",
  },
  selectedCategoryItem: {
    backgroundColor: "#E8E8E8",
    borderRadius: 60,
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
  doneButton: {
    padding: 10,
    margin: 20,
    backgroundColor: "#F8B951",
    borderRadius: 5,
    alignSelf: "stretch",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 15,
    color: "white",
  },
});
