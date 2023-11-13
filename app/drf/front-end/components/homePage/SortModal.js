import React, { useState, useCallback } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from "react-native";
import Modal from "react-native-modal";

import CustomText from "../CustomText";

const RadioButton = ({ isSelected }) => (
  <View
    style={[
      styles.radioButtonOuter,
      isSelected && styles.radioButtonOuterSelected,
    ]}
  >
    {isSelected && <View style={styles.radioButtonInner} />}
  </View>
);
const DropdownItem = React.memo(({ item, onSelect, isSelected }) => (
  <TouchableOpacity
    onPress={() => onSelect(item)}
    style={[styles.dropdownItem, isSelected && styles.selectedItem]}
  >
    <RadioButton isSelected={isSelected} />
    <CustomText style={styles.dropdownItemText} fontType={"text"}>
      {item.label}
    </CustomText>
  </TouchableOpacity>
));

const Dropdown = ({ data, onSelect, placeholder }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(placeholder);

  const selectOption = useCallback(
    (option) => {
      setSelectedOption(option.label);
      onSelect(option.value);
      setIsVisible(false);
    },
    [onSelect]
  );

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
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={styles.modalStyle}
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <CustomText fontType={"title"} style={styles.title}>
              SORT BY
            </CustomText>
          </View>
          <FlatList
            data={data}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <DropdownItem
                item={item}
                onSelect={selectOption}
                isSelected={selectedOption === item.label}
              />
            )}
          />
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  modalStyle: {
    justifyContent: "flex-end",
    margin: 0,
  },
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
  },
  title: {
    alignSelf: "center",
    padding: 10,
    fontSize: 20,
    color: "#2e2e2e",
  },
  modalContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  selectedItem: {
    borderRadius: 20,
    backgroundColor: "rgba(57, 147, 248, 0.32)",
  },
  checkIcon: {
    width: 24,
    height: 24,
    position: "absolute",
    right: 20,
  },
  modalHeader: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
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
    backgroundColor: "white",
    justifyContent: "flex-start",
    height: 60,
    marginBottom: 10,
    borderRadius: 20,
  },
  dropdownItemText: {
    fontSize: 16,
    color: "#333333",
    marginLeft: 10,
  },
  radioButtonOuter: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#333333",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  radioButtonOuterSelected: {
    borderColor: "#1E90FF", // Change this to your desired color
  },
  radioButtonInner: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "#1E90FF", // Change this to your desired color
  },
});
