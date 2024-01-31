import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
} from "react-native";
import CustomText from "../CustomText";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const DatePickerSelector = ({ selectedDate, onDateChange, minimumDate }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  // State for info modal visibility
  const [isInfoModalVisible, setInfoModalVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    onDateChange(date);
    hideDatePicker();
  };

  const formatDate = (date) => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  // Function to handle the press on the info icon
  const onInfoPress = () => {
    setInfoModalVisibility(true); // Show the info modal
  };

  // Function to close the info modal
  const closeInfoModal = () => {
    setInfoModalVisibility(false); // Hide the info modal
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <CustomText fontType={"title"} style={styles.title}>
          Expiration Date
        </CustomText>
        <TouchableOpacity onPress={onInfoPress} style={styles.infoIcon}>
          <Ionicons name="information-circle-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={showDatePicker}>
        <CustomText fontType={"textFont"}>
          {formatDate(selectedDate)}
        </CustomText>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={selectedDate}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        minimumDate={minimumDate}
      />
      {/* Information Modal */}
      <Modal
        visible={isInfoModalVisible}
        onRequestClose={closeInfoModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <CustomText style={styles.modalTitle}>
                Food Safety Guidelines for Listing Expiry Dates
              </CustomText>
              <TouchableOpacity
                onPress={closeInfoModal}
                style={styles.closeModalButton}
              >
                <MaterialIcons name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalContent}>
              <CustomText style={styles.modalBodyText}>
                Welcome to our community of sharing and caring! When listing
                your leftover food, it's crucial to ensure that it's safe for
                consumption. Here are some tips to help you set accurate expiry
                dates:
              </CustomText>

              {/* Bullet points */}
              <CustomText style={styles.modalBulletPoints}>
                • Understand Expiry vs. Best Before: 'Expiry Date' refers to the
                last day the food is safe to eat, while 'Best Before' indicates
                when the food's quality begins to deteriorate. Use 'Expiry Date'
                for your listings to ensure safety.
              </CustomText>

              <CustomText style={styles.modalBulletPoints}>
                • Check Original Packaging: If your leftovers are from packaged
                food, refer to the original expiry date as a guideline.
                Remember, once opened, the shelf life may reduce.
              </CustomText>

              <CustomText style={styles.modalBulletPoints}>
                • Consider Food Type: Dairy and Seafood spoil quickly. Cooked
                Meals are safe for 3-4 days when refrigerated. Baked Goods last
                about a week.
              </CustomText>

              <CustomText style={styles.modalBulletPoints}>
                • Storage Matters: Mention how the food has been stored. Foods
                kept in the refrigerator last longer than those left at room
                temperature.
              </CustomText>

              <CustomText style={styles.modalBulletPoints}>
                • When in Doubt, Throw it Out: If you're unsure about the safety
                of the food, it's better not to list it.
              </CustomText>

              <CustomText style={styles.modalBulletPoints}>
                • Honesty is Key: Be truthful about the age and storage of your
                leftovers. Your honesty helps keep everyone safe.
              </CustomText>

              <CustomText style={styles.modalBulletPoints}>
                • Prompt Pickup: Encourage prompt pickup of perishable items to
                ensure they're consumed while still fresh.
              </CustomText>

              <CustomText style={styles.modalBulletPoints}>
                Remember, these guidelines are not exhaustive, and the
                responsibility lies with both the lister and the receiver to
                ensure food safety. Let's work together to reduce waste and
                share joyfully, but safely!
              </CustomText>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 17,
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
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button:{
    paddingVertical: 15,
    paddingLeft:60,
  },
  infoIcon: {
    marginLeft: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalCard: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "85%",
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 15,
  },
  modalTitle: {
    fontWeight: "bold",
    fontSize: 18,
    flex: 1,
  },
  closeModalButton: {
    marginLeft: 10,
    backgroundColor: "#E8E8E8",
    borderRadius: 15,
    padding: 5,
  },
  modalBodyText: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalBulletPoints: {
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 10,
  },
});

export default DatePickerSelector;
