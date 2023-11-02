import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import Modal from "react-native-modal";
import Slider from "@react-native-community/slider";
import { Rating } from "react-native-ratings";

const FilterModal = ({ isVisible, onClose }) => {
  const [distance, setDistance] = useState(10);
  const [rating, setRating] = useState(3.5);

  const applyFilters = () => {
    // Logic to handle the filtering based on the state
    onClose();
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.modal}>
      <View style={styles.modalContent}>
        <Text style={styles.filterTitle}>Filter By</Text>

        {/* Distance Filter with Slider */}
        <View style={styles.filterOption}>
          <Text style={styles.filterLabel}>Max Distance</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={25}
            step={5}
            value={distance}
            onValueChange={setDistance}
            minimumTrackTintColor="#FCBF3D"
            maximumTrackTintColor="#FCBF3D"
            thumbTintColor="#FCBF3D"
          />
          <Text style={styles.value}>{distance} Km</Text>
        </View>
        {/* Rating Filter with Star Rating */}
        <View style={styles.filterOption}>
          <Text style={styles.filterLabel}>Minimum Rating</Text>
          <Rating
            onFinishRating={(rating) => setRating(rating)}
            style={{ paddingVertical: 10 }}
            startingValue={rating}
            imageSize={35}
          />
        </View>

        {/* More filters can be added here */}

        {/* Apply Filters Button */}
        <TouchableOpacity onPress={applyFilters} style={styles.applyButton}>
          <Text style={styles.applyButtonText}>Apply Filters</Text>
        </TouchableOpacity>

        {/* Close Button */}
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  filterOption: {
    width: "100%",
    marginBottom: 20,
    alignItems: "center",
  },
  filterTitle: {
    fontSize: 25,
    marginBottom: 15,
    fontWeight: "600",
  },
  filterLabel: {
    fontSize: 18,
    fontWeight: "600",
  },
  slider: {
    width: "100%",
    height: 40,
  },
  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
    padding: 10,
    width: "100%",
  },
  applyButton: {
    backgroundColor: "#FCA63C",
    padding: 12,
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    width: "100%",
  },
  applyButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: "#cccccc",
    padding: 12,
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    width: "100%",
  },
});

export default FilterModal;
