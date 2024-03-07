import React, { useState, useCallback, useContext } from "react";
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
import ButtonLanding from "../loginSignup/ButtonLanding";
import { SliderContext } from '../../context/MapContext';

const AllergenChip = React.memo(({ allergen, isSelected, onSelect, onDeselect }) => {
  return (
    <TouchableOpacity
      onPress={() => isSelected ? onDeselect(allergen) : onSelect(allergen)}
      style={[
        styles.allergenChip,
        isSelected ? styles.allergenChipSelected : null,
      ]}
    >
      <CustomText style={[
        styles.allergenChipText,
        isSelected ? styles.allergenChipTextSelected : null,
      ]}>
        {allergen}
      </CustomText>
    </TouchableOpacity>
  );
});

const FilterModal = ({
  isVisible,
  onClose,
  setDistanceFilter,
  setRatingFilter,
  setAllergensFilter,
  updateSortOption
}) => {
  const { sliderValue, setSliderValue } = useContext(SliderContext);
  const [rating, setRating] = useState(0);
  const [allergens, setAllergens] = useState([]);
  const [selectedSort, setSelectedSort] = useState('Date');

  const sortOptions = [
    { label: 'Date', value: 'Date' },
    { label: 'Distance', value: 'Distance' },
    { label: 'Rating', value: 'Rating' },
  ];

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

  const applyFilters = () => {
    setDistanceFilter(sliderValue);
    setRatingFilter(rating);
    setAllergensFilter(allergens);
    updateSortOption(selectedSort);
    onClose();
  };

  const handleSelectSort = (option) => {
    setSelectedSort(option.value);
  };

  const selectAllergen = useCallback((selectedAllergen) => {
    setAllergens((currentAllergens) => {
      if (currentAllergens.includes(selectedAllergen)) {
        return currentAllergens;
      }
      return [...currentAllergens, selectedAllergen];
    });
  }, []);

  const deselectAllergen = useCallback((deselectedAllergen) => {
    setAllergens((currentAllergens) =>
      currentAllergens.filter((allergen) => allergen !== deselectedAllergen)
    );
  }, []);

  const resetFilters = () => {
    setSliderValue(25);
    setRating(0);
    setAllergens([]);
    setSelectedSort('Date');
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={styles.modal}
      backdropColor={"#000"}
      backdropOpacity={0.95}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{ flex: 1, borderRadius: 12 }}
      >
        <View style={{ borderRadius: 12, overflow: 'hidden', flexGrow: 1, justifyContent: "center" }}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
            keyboardShouldPersistTaps="handled"
          >
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={30} color="white" />
            </TouchableOpacity>

            <View style={styles.modalContent}>
              {/* Sort Options */}
              <View>
                <CustomText style={styles.filterLabel} fontType={"subHeader"}>Sort By</CustomText>
                <View style={styles.sortOptionsContainer}>
                  {sortOptions.map((option) => (
                    <TouchableOpacity
                      key={option.value}
                      style={[
                        styles.sortOptionButton,
                        selectedSort === option.value && styles.sortOptionButtonSelected,
                      ]}
                      onPress={() => handleSelectSort(option)}
                    >
                      <CustomText
                        style={[
                          styles.sortOptionText,
                          selectedSort === option.value && styles.sortOptionTextSelected,
                        ]}
                      >
                        {option.label}
                      </CustomText>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Distance Filter with Slider */}
              <View style={styles.filterOption}>
                <CustomText style={styles.filterLabel} fontType={"subHeader"}>Max Distance</CustomText>
                <Slider
                  style={styles.slider}
                  minimumValue={1000}
                  maximumValue={25000}
                  value={sliderValue}
                  onValueChange={(value) => setSliderValue(value)}
                  minimumTrackTintColor="#FFFFFF"
                  maximumTrackTintColor="#555"
                  thumbTintColor="#FFFFFF"
                />
                <CustomText style={styles.value} fontType={"text"}>{Math.floor(sliderValue / 1000)} KM</CustomText>
              </View>

              {/* Rating Filter */}
              <View style={styles.filterOption}>
                <CustomText style={styles.filterLabel} fontType={"subHeader"}>Minimum Rating</CustomText>
                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={5}
                  step={0.5}
                  value={rating}
                  onValueChange={setRating}
                  minimumTrackTintColor="#FFFFFF"
                  maximumTrackTintColor="#555"
                  thumbTintColor="#FFFFFF"
                />
                <CustomText style={styles.value} fontType={"text"}>{rating} Star(s)</CustomText>
              </View>

              {/* Allergen Filter */}
              <View style={styles.allergenContainer}>
                <CustomText style={styles.filterLabel} fontType={"subHeader"}>Allergens</CustomText>
                <View style={styles.allergenChipsContainer}>
                  {allergenDatabase.map((allergen) => (
                    <AllergenChip
                      key={allergen}
                      allergen={allergen}
                      isSelected={allergens.includes(allergen)}
                      onSelect={selectAllergen}
                      onDeselect={deselectAllergen}
                    />
                  ))}
                </View>
              </View>

              {/* Apply and Reset Buttons */}
              <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={resetFilters} style={styles.resetButton}>
                  <CustomText style={styles.resetButtonText}>RESET</CustomText>
                </TouchableOpacity>
                <ButtonLanding onPress={applyFilters} title={"APPLY"} style={styles.applyButton} showIcon={false}/>
              </View>
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
    backgroundColor: "transparent",
    justifyContent: "space-around",
    alignItems: "stretch",    
  },
  sortOptionsContainer: {
    marginBottom:20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  sortOptionButton: {
    padding: 10,
    borderRadius: 5,
  },
  sortOptionButtonSelected: {
    borderBottomColor: 'orange',
    borderBottomWidth:2 
  }, 
  sortOptionText: {
    color: 'white', 
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
    fontSize: 20,
    color: "#F5F5F5",
    marginBottom: 10,
    textAlign: "center",
  },
  slider: {
    width: "100%",
    height: 40,
  },
  textInput: {
    height: 40,
    borderColor: "#F5F5F5",
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
    marginBottom: 10,
  },
  allergensContainer: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  allergenTag: {
    flexDirection: "row",
    backgroundColor: "#444", 
    borderRadius: 15,
    padding: 8,
    marginRight: 10,
    alignItems: "center",
  },
  allergenText: {
    marginRight: 6,
    fontSize: 14,
    color: "#F5F5F5", 
  },
  buttonsContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems:"center",
    padding: 20, 
  },
  applyButton:{
    paddingHorizontal:50,
    textAlign:"center"
  },
  resetButton: {
    marginTop:25,
    paddingHorizontal:30,
    textAlign:"center",
    justifyContent:"center",
    alignItems:"center",
  },
  resetButtonText: {
    color: "#ff5c5c",
    fontSize: 18,
    textAlign:"center",
  },
  closeButton: {
    position: "absolute",
    zIndex: 1000,
    top: 10,
    right: 10,
    width: 40, 
    height: 40, 
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center', 
    padding: 0, 
  },
  value:{
    color:"#F5F5F5",
    marginLeft: 10,
  },

  dropdown: {
    backgroundColor: "#444", 
    borderWidth: 1,
    borderColor: "#555", 
  },
  dropdownItemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#555",
  },
  dropdownItem: {
    padding: 10,
    fontSize: 16,
    color: "#F5F5F5", 
  },
  allergenChipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingVertical: 10,
  },
  allergenChip: {
    backgroundColor: "#555", 
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", 
  },
  allergenChipSelected: {
    backgroundColor: "#F5F5F5", 
    flexDirection: "row", 
    justifyContent: "center", 
  },
  allergenChipText: {
    color: "#FFF", 
    textAlign: "center",
  },
  allergenChipTextSelected: {
    color: "black", 
    textAlign: "center", 
  },
});

export default FilterModal;
