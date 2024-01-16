import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import CustomText from "../CustomText";
import DateTimePickerModal from "react-native-modal-datetime-picker";

// DatePickerSelector component allows users to pick a date.
const DatePickerSelector = ({ onDateChange }) => {
  // State to control the visibility of the date picker modal.
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  // State to store the selected date. Initialized to the current date.
  const [selectedDate, setSelectedDate] = useState(new Date());
  // Current date, used to prevent selection of past dates.
  const currentDate = new Date();

  // Function to show the date picker modal.
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  // Function to hide the date picker modal.
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  // Function to handle the confirmation of a date selection.
  const handleConfirm = (date) => {
    setSelectedDate(date); // Update the selected date state.
    onDateChange(date); // Propagate the date change to the parent component.
    hideDatePicker(); // Hide the date picker modal.
  };

  // Function to format the date into a readable string.
  const formatDate = (date) => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <View style={styles.container}>
      <CustomText fontType={"title"} style={styles.title}>
        Expiration Date
      </CustomText>
      <TouchableOpacity style={styles.button} onPress={showDatePicker}>
        <CustomText fontType={"textFont"}>
          {formatDate(selectedDate)} {/* Display the formatted selected date */}
        </CustomText>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        minimumDate={currentDate} // Restrict past dates
        onConfirm={handleConfirm} // Handle date confirmation
        onCancel={hideDatePicker} // Handle cancellation
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 20,
    marginTop: 5,
    marginHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "white",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default DatePickerSelector;
