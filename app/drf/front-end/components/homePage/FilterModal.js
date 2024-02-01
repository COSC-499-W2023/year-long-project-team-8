import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Slider from "@react-native-community/slider";
import CustomText from "../CustomText";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import { SelectList } from "react-native-dropdown-select-list";


const FilterModal = ({
  isVisible,
  onClose,
  setDistanceFilter,
  setRatingFilter,
  setAllergensFilter,
}) => {
  const [distance, setDistance] = useState(25);
  const [rating, setRating] = useState(0);
  const [allergens, setAllergens] = useState([]);

  const allergenDatabase = [
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

  // Dynamically generate allergen options excluding the selected allergens
  const allergenOptions = allergenDatabase.filter(allergen => !allergens.includes(allergen)).map(allergen => ({
    key: allergen,
    value: allergen,
  }));

  const applyFilters = () => {
    setDistanceFilter(distance);
    setRatingFilter(rating);
    setAllergensFilter(allergens);
    onClose();
  };

  const resetFilters = () => {
    // Resetting the filters to their default values
    setDistance(25); // Assuming 25 is the default max distance
    setRating(0); // Assuming 1 is the default minimum rating
    setAllergens([]); // Assuming no allergens selected by default
  
    // Calling the parent component's state update functions with default values
    setDistanceFilter(25); // Resetting to default max distance
    setRatingFilter(1); // Resetting to default minimum rating
    setAllergensFilter([]); // Resetting to no selected allergens
    };


  const getRatingLabel = (value) => `${value} Star(s)`;

  const removeAllergen = (allergenToRemove) => {
    setAllergens(allergens.filter((allergen) => allergen !== allergenToRemove));
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.modal}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{ flex: 1,borderRadius:12,}}
        
      >
        <View style={{ 
          borderRadius: 12,
          overflow: 'hidden',
          flexGrow: 1,
          justifyContent: "center",
          }}>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
            }}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.modalContent}>
              {/* Close Button at the top right corner */}
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>

              {/* Allergen Filter with Dropdown */}
              <View style={styles.filterOptionFirst}>
                <CustomText style={styles.filterLabel} fontType={"subHeader"}>
                  Allergens
                </CustomText>
                {/* Use SelectList for the dropdown */}
                <SelectList
                  data={allergenOptions}
                  setSelected={selected => {
                    if (!allergens.includes(selected)) {
                      setAllergens([...allergens, selected]);
                    }
                  }}
                  placeholder="Select an allergen"
                />
                <ScrollView style={styles.allergensContainer} horizontal>
                  {allergens.map((allergen, index) => (
                    <View key={index} style={styles.allergenTag}>
                      <CustomText style={styles.allergenText} fontType={"text"}>
                        {allergen}
                      </CustomText>
                      <TouchableOpacity onPress={() => removeAllergen(allergen)}>
                        <Ionicons name="close-circle" size={16} color="#000" />
                      </TouchableOpacity>
                    </View>
                  ))}
                </ScrollView>
              </View>

              {/* Distance Filter with Slider */}
              <View style={styles.filterOption}>
                <CustomText style={styles.filterLabel} fontType={"subHeader"}>
                  Max Distance
                </CustomText>
                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={25}
                  step={1}
                  value={distance}
                  onValueChange={setDistance}
                  minimumTrackTintColor="#FCBF3D"
                  maximumTrackTintColor="#000000"
                  thumbTintColor="#FCBF3D"
                />
                <CustomText style={styles.value} fontType={"text"}>
                  {distance} Km
                </CustomText>
              </View>

              {/* Rating Filter with Slider */}
              <View style={styles.filterOption}>
                <CustomText style={styles.filterLabel} fontType={"subHeader"}>
                  Minimum Rating
                </CustomText>
                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={5}
                  step={0.5}
                  value={rating}
                  onValueChange={setRating}
                  minimumTrackTintColor="#FCBF3D"
                  maximumTrackTintColor="#000000"
                  thumbTintColor="#FCBF3D"
                />
                <CustomText style={styles.value} fontType={"text"}>
                  {getRatingLabel(rating)}
                </CustomText>
              </View>

              {/* Apply Filters Button */}
              <TouchableOpacity onPress={applyFilters} style={styles.applyButton}>
                <CustomText style={styles.applyButtonText} fontType={"subHeader"}>
                  APPLY
                </CustomText>
              </TouchableOpacity>
              <TouchableOpacity onPress={resetFilters} style={styles.resetButton}>
                <CustomText style={styles.resetButtonText} fontType={"text"}>
                  RESET
                </CustomText>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    marginHorizontal: 10,
    justifyContent: "flex-end",
    borderRadius: 12,
  },
  scrollView: {
    flex: 1,
    borderRadius: 12,
  },
  modalContent: {
    padding: 20,
    backgroundColor: "#f8f9fa",
    justifyContent: "space-around",
    alignItems: "stretch",
    borderRadius: 12,
    borderColor: "rgba(0, 0, 0, 0.05)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dropdown: {
    backgroundColor: "#fff",
    position: "absolute",
    top: 100,
    left: 10,
    right: 10,
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 8,
    maxHeight: 200,
    overflow: "hidden",
    zIndex: 1000,
  },
  dropdownItemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#ced4da",
  },
  dropdownItem: {
    padding: 10,
    fontSize: 16,
    color: "#212529",
  },
  filterOptionFirst: {
    width: "100%",
    marginBottom: 20,
    marginTop: 20,
  },
  filterOption: {
    width: "100%",
    marginBottom: 20,
  },
  filterTitle: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
  },
  filterLabel: {
    fontSize: 18,
    color: "#495057",
    marginBottom: 10,
    fontWeight:"bold",
  },
  slider: {
    width: "100%",
    height: 40,
  },
  textInput: {
    height: 40,
    borderColor: "#ced4da",
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  allergensContainer: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  allergenTag: {
    flexDirection: "row",
    backgroundColor: "#e9ecef",
    borderRadius: 15,
    padding: 8,
    marginRight: 10,
    alignItems: "center",
  },
  allergenText: {
    marginRight: 6,
    fontSize: 14,
  },
  applyButton: {
    backgroundColor: "#F8B951",
    padding: 20,
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  applyButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    textAlign:"center",
  },
  resetButton: {
    marginTop:10,
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 35,
    width: "auto",
  },
  resetButtonText: {
    color: "red",
    fontSize: 15,
    textAlign:"center",
  },
  closeButton: {
    position: "absolute",
    zIndex: 1000,
    top: 10,
    right: 10,
    backgroundColor: "#dee2e6",
    width: 40, // Set a specific width
    height: 40, // Ensure height is the same as the width for a circle
    borderRadius: 20, // Set borderRadius to half of width/height to make it a perfect circle
    justifyContent: 'center', // Center the icon horizontally
    alignItems: 'center', // Center the icon vertically
    padding: 0, // Remove or adjust padding as necessary
  },
  
});

export default FilterModal;
