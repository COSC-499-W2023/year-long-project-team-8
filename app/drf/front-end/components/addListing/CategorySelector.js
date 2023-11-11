import React from "react";
import { TouchableOpacity, FlatList, StyleSheet } from "react-native";
import CustomText from "../CustomText";

/**
 * Renders a horizontal list of categories as toggle buttons.
 * Allows users to select and highlight categories from the provided list.
 *
 * @param {Array} categories - Array of category strings to display.
 * @param {Array} selectedCategories - Array of selected category strings.
 * @param {Function} onCategoryToggle - Callback function called with the selected category.
 */
const CategorySelector = ({
  categories,
  selectedCategories,
  onCategoryToggle,
}) => {
  /**
   * Renders a single category as a button.
   * Applies selected styling if the category is in the selectedCategories array.
   *
   * @param {Object} { item } - The category to render, provided by FlatList.
   * @returns {React.Component}
   */
  const renderCategory = ({ item }) => {
    const isSelected = selectedCategories.includes(item);
    return (
      <TouchableOpacity
        style={[
          styles.categoryButton,
          isSelected && styles.categoryButtonSelected,
        ]}
        onPress={() => onCategoryToggle(item)}
      >
        <CustomText
          style={[
            styles.categoryText,
            isSelected && styles.categoryTextSelected,
          ]}
        >
          {item}
        </CustomText>
      </TouchableOpacity>
    );
  };

  // FlatList component that renders the categories
  return (
    <FlatList
      data={categories}
      renderItem={renderCategory}
      keyExtractor={(item) => item}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  categoryButton: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 6,
    marginVertical: 4,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    shadowOpacity: 0.1,
  },
  categoryButtonSelected: {
    backgroundColor: "#007bff",
  },
  categoryText: {
    color: "#333333",
    fontSize: 14,
    fontWeight: "bold",
  },
  categoryTextSelected: {
    color: "white",
  },
});

export default CategorySelector;
