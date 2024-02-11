import React, { useState, useCallback } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Image
} from "react-native";
import Modal from "react-native-modal";
import Ionicons from 'react-native-vector-icons/Ionicons';
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
    <CustomText
      style={[
        styles.dropdownItemText,
        isSelected && styles.selectedItemStyle // Apply the style when the item is selected
      ]}
      fontType={"text"}
    >
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
        <Image source={require("../../assets/icons/sort.png")} style={styles.icon}/>
      </TouchableOpacity>
      <Modal
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
        style={styles.modal}
        backdropColor={"#000"}
        backdropOpacity={0.95}
      >
        <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setIsVisible(false)}
            >
            <Ionicons name="close" size={30} color="white" /> 
        </TouchableOpacity>
        <View style={styles.modalContainer}>
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
        </View>
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
    backgroundColor:"white",
    borderRadius:10,
  },
  dropdownButton: {
    alignItems: "center",
    padding: 10,
  },
  icon: {
    width:25,
    height:25
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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  selectedItem: {
    borderRadius: 20,
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
    backgroundColor: "transparent",
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
    paddingVertical:10,
    backgroundColor: "transparent",
    justifyContent: "center",
    height: 60,
    marginBottom: 10,
    borderRadius: 20,
  },
  selectedItemStyle: {
    borderBottomWidth: 1, 
    borderRadius:5,
    borderBottomColor: "orange", 
    paddingBottom: 5, 

  },
  dropdownItemText: {
    fontSize: 20,
    color: "white",
    marginLeft: 10,
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
});
