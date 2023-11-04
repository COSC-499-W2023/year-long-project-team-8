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
  setHoursFilter,
  setAllergensFilter,
}) => {
  const [distance, setDistance] = useState(25);
  const [rating, setRating] = useState(1);
  const [hours, setHours] = useState(24);
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

  const allergenOptions = allergenDatabase.map((allergen) => ({
    key: allergen,
    value: allergen,
  }));

  const applyFilters = () => {
    setDistanceFilter(distance);
    setRatingFilter(rating);
    setHoursFilter(hours);
    setAllergensFilter(allergens);
    onClose();
  };

  const getHourLabel = (value) =>
    value >= 24 ? "1+ days" : `${value} Hour(s)`;

  const getRatingLabel = (value) => `${value} Star(s)`;

  const removeAllergen = (allergenToRemove) => {
    setAllergens(allergens.filter((allergen) => allergen !== allergenToRemove));
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.modal}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{ flex: 1 }}
      >
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
            <CustomText style={styles.filterTitle} fontType="title">
              Filter By
            </CustomText>

            {/* Allergen Filter with Dropdown */}
            <View style={styles.filterOption}>
              <CustomText style={styles.filterLabel} fontType={"subHeader"}>
                Filter by Allergens
              </CustomText>
              {/* Use SelectList for the dropdown */}
              <SelectList
                data={allergenOptions}
                setSelected={(selected) => {
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
                minimumValue={1}
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

            {/* Time Since Published Filter with Slider */}
            <View style={styles.filterOption}>
              <CustomText style={styles.filterLabel} fontType={"subHeader"}>
                Time Since Published
              </CustomText>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={24}
                step={1}
                value={hours}
                onValueChange={setHours}
                minimumTrackTintColor="#FCBF3D"
                maximumTrackTintColor="#000000"
                thumbTintColor="#FCBF3D"
              />
              <CustomText style={styles.value} fontType={"text"}>
                {getHourLabel(hours)}
              </CustomText>
            </View>

            {/* Apply Filters Button */}
            <TouchableOpacity onPress={applyFilters} style={styles.applyButton}>
              <CustomText style={styles.applyButtonText} fontType={"subHeader"}>
                Apply Filters
              </CustomText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: "flex-end",
  },
  scrollView: {
    flex: 1,
  },
  keyboardAvoidingView: {},

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
  filterOption: {
    width: "100%",
    marginBottom: 20,
  },
  filterTitle: {
    fontSize: 28,
    color: "#212529",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
  },
  filterLabel: {
    fontSize: 18,
    color: "#495057",
    marginBottom: 10,
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
  dropdown: {
    backgroundColor: "#fff",
    position: "absolute",
    top: 40,
    left: 0,
    right: 0,
    borderWidth: 1,
    borderColor: "#ced4da",
    zIndex: 1000,
  },
  dropdownItem: {
    padding: 10,
    fontSize: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ced4da",
  },
  applyButton: {
    backgroundColor: "#3D80FC",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 20,
    width: "auto",
  },
  applyButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  closeButton: {
    position: "absolute",
    zIndex: 1000,
    top: 22,
    right: 22,
    backgroundColor: "#dee2e6",
    padding: 8,
    borderRadius: 20,
  },
});

export default FilterModal;
