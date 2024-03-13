import React from "react";
import { TouchableOpacity, FlatList, StyleSheet } from "react-native";
import CustomText from "../CustomText";

/**
 * Renders a horizontal list of allergens as toggle buttons.
 * Allows users to select and highlight allergens from the provided list.
 *
 * @param {Array} allergens - Array of allergen strings to display.
 * @param {Array} selectedAllergens - Array of selected allergen strings.
 * @param {Function} onAllergenToggle - Callback function called with the selected allergen.
 */
const AllergenSelector = ({
  allergens,
  selectedallergens,
  onAllergenToggle,
}) => {
  /**
   * Renders a single allergen as a button.
   * Applies selected styling if the allergen is in the selectedallergens array.
   *
   * @param {Object} { item } - The allergen to render, provided by FlatList.
   * @returns {React.Component}
   */
  const renderAllergen = ({ item }) => {
    const isSelected = selectedallergens.includes(item);
    return (
      <TouchableOpacity
        style={[
          styles.allergenButton,
          isSelected && styles.allergenButtonSelected,
        ]}
        onPress={() => onAllergenToggle(item)}
      >
        <CustomText
          style={[
            styles.allergenText,
            isSelected && styles.allergenTextSelected,
          ]}
        >
          {item}
        </CustomText>
      </TouchableOpacity>
    );
  };

  // FlatList component that renders the allergens
  return (
    <FlatList
      data={allergens}
      renderItem={renderAllergen}
      keyExtractor={(item) => item}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  allergenButton: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 12,
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
  allergenButtonSelected: {
    backgroundColor: "#007bff",
  },
  allergenText: {
    color: "#333333",
    fontSize: 14,
    fontWeight: "bold",
  },
  allergenTextSelected: {
    color: "white",
  },
});

export default AllergenSelector;
