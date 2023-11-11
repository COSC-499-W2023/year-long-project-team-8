// components/AllergenSelector.js
import React from "react";
import { TouchableOpacity, FlatList, Text, StyleSheet } from "react-native";
import CustomText from "../CustomText";

const AllergenSelector = ({
  allergens,
  selectedAllergens,
  onAllergenToggle,
}) => {
  const renderAllergen = ({ item }) => {
    const isSelected = selectedAllergens.includes(item);
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
  allergenButtonSelected: {
    backgroundColor: "#007bff",
  },
  allergenText: {
    color: "#333333",
    fontSize: 14,
    fontWeight: "bold",
  },
  allergenTextSelected: {
    color: "white", // Text color when the button is selected
  },
});

export default AllergenSelector;
