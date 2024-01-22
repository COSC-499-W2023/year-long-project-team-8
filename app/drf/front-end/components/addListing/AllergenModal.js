import React, { useState, useEffect } from "react";
import { Modal, View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import CustomText from "../CustomText";
import { allergens } from "../Allergens"; // Import allergens array

const AllergenModal = ({
  visible,
  onClose,
  onSelect,
  selectedAllergensProp,
}) => {
  const [selectedAllergens, setSelectedAllergens] = useState(
    selectedAllergensProp
  );

  useEffect(() => {
    setSelectedAllergens(selectedAllergensProp);
  }, [selectedAllergensProp]);

  const handleSelect = (allergen) => {
    if (selectedAllergens.includes(allergen)) {
      setSelectedAllergens(
        selectedAllergens.filter((item) => item !== allergen)
      );
    } else {
      setSelectedAllergens([...selectedAllergens, allergen]);
    }
  };

  const isAllergenSelected = (allergen) => {
    return selectedAllergens.includes(allergen);
  };

  const handleDone = () => {
    onSelect(selectedAllergens);
    onClose();
  };

  const getRows = () => {
    const numColumns = 3;
    const numRows = Math.ceil(allergens.length / numColumns);
    let rows = [];

    for (let i = 0; i < numRows; i++) {
      rows.push(allergens.slice(i * numColumns, i * numColumns + numColumns));
    }

    return rows;
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      testID="allergenModal"
    >
      <View style={styles.modalBackground}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            testID="closeModalButton"
          >
            <MaterialIcons name="close" size={24} color="black" />
          </TouchableOpacity>
          <View>
            <CustomText fontType={"title"} style={styles.title}>
              Allergens
            </CustomText>
          </View>
          {getRows().map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((allergen) => (
                <TouchableOpacity
                  key={allergen}
                  style={[
                    styles.allergenItem,
                    isAllergenSelected(allergen) && styles.selectedAllergenItem,
                  ]}
                  onPress={() => handleSelect(allergen)}
                >
                  <CustomText>{allergen}</CustomText>
                </TouchableOpacity>
              ))}
            </View>
          ))}
          <TouchableOpacity
            style={styles.doneButton}
            onPress={handleDone}
            testID="doneButton"
          >
            <CustomText style={styles.buttonText} fontType={"title"}>
              Done
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AllergenModal;

const styles = StyleSheet.create({
  allergenItem: {
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    margin: 5,
    borderRadius: 5,
    width: "30%",
  },
  selectedAllergenItem: {
    backgroundColor: "#E8E8E8",
    borderRadius: 60,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 30,
    marginVertical: 60,
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: "hidden",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#E8E8E8",
    borderRadius: 15,
    padding: 5,
  },
  title: {
    fontSize: 17,
    marginTop: 20,
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    padding: 5,
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
  doneButton: {
    padding: 10,
    margin: 20,
    backgroundColor: "#F8B951",
    borderRadius: 5,
    alignSelf: "stretch",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 15,
    color: "white",
  },
});
