import React, { useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from "react-native";
import CustomText from "../CustomText";
import { Ionicons } from "@expo/vector-icons";

const sortIcon = require("../../assets/sort.png");
const checkIcon = require("../../assets/checked.png");

const Dropdown = ({ data, onSelect, placeholder }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(placeholder);

  const selectOption = (option) => {
    setSelectedOption(option.label);
    onSelect(option.value);
    setIsVisible(false);
  };

  return (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity
        onPress={() => setIsVisible(true)}
        style={styles.dropdownButton}
      >
        <CustomText fontType={"title"} style={styles.dropdownButtonText}>
          Sort by: {selectedOption}
        </CustomText>
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={isVisible}
        animationType="slide"
        onRequestClose={() => setIsVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPressOut={() => setIsVisible(false)}
          activeOpacity={1}
        >
          <SafeAreaView style={styles.modalContainer}>
            <TouchableOpacity
              onPress={() => setIsVisible(false)}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
            <View style={styles.modalHeader}>
              <Image source={sortIcon} style={styles.sortIcon} />
              <CustomText style={styles.modalTitle} fontType={"title"}>
                Sort By
              </CustomText>
            </View>
            <FlatList
              data={data}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => selectOption(item)}
                  style={[
                    styles.dropdownItem,
                    selectedOption === item.label && styles.selectedItem,
                  ]}
                >
                  <Image source={item.icon} style={styles.itemIcon} />
                  <CustomText style={styles.dropdownItemText} fontType={"text"}>
                    {item.label}
                  </CustomText>
                  {selectedOption === item.label && (
                    <Image source={checkIcon} style={styles.checkIcon} />
                  )}
                </TouchableOpacity>
              )}
            />
          </SafeAreaView>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    justifyContent: "center",
    marginHorizontal: 10,
  },
  dropdownButton: {
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 13,
    borderRadius: 10,
    backgroundColor: "#FCBF3D",
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 2 }, // X, Y offset of the shadow
    shadowOpacity: 0.25, // Opacity of the shadow
    shadowRadius: 3.84, // Blur radius of the shadow
    elevation: 5, // Elevation for Android
  },
  dropdownButtonText: {
    color: "white",
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 40,
    paddingHorizontal: 15,
  },
  selectedItem: {
    borderRadius: 10,
    backgroundColor: "rgba(57, 147, 248, 0.32)",
  },
  checkIcon: {
    width: 24,
    height: 24,
    position: "absolute",
    right: 20,
  },
  modalHeader: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 50,
  },
  sortIcon: {
    width: 30,
    height: 30,
    marginRight: 20,
    marginLeft: 20,
  },
  modalTitle: {
    flexShrink: 1,
    fontSize: 25,
    fontWeight: "bold",
  },
  separator: {
    height: 1,
    backgroundColor: "#CED0CE",
    marginLeft: 14,
    marginRight: 14,
    marginVertical: 20,
  },
  dropdown: {
    backgroundColor: "white",
    width: "100%",
    elevation: 5,
  },
  closeButton: {
    position: "absolute",
    zIndex: 1000,
    right: 22,
    top: 22,
    backgroundColor: "#dee2e6",
    padding: 8,
    borderRadius: 20,
  },
  itemIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "white",
    justifyContent: "flex-start",
    height: 60,
    marginBottom: 10,
  },
  dropdownItemText: {
    fontSize: 16,
    color: "#333333",
    marginLeft: 10,
  },
});

export default Dropdown;
