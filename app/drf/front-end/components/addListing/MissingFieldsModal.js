// MissingFieldsModal.js
import React from "react";
import { Modal, View, StyleSheet, TouchableOpacity } from "react-native";
import CustomText from "../CustomText";

const MissingFieldsModal = ({ visible, missingFields, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <CustomText style={styles.modalText}>
            Please fill in the following fields:
          </CustomText>
          {missingFields.map((field, index) => (
            <CustomText
              key={index}
              style={styles.bulletPoint}
            >{`\u2022 ${field}`}</CustomText>
          ))}
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <CustomText style={styles.buttonText}>Got it!</CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  bulletPoint: {
    textAlign: "left",
    alignSelf: "flex-start",
  },
  button: {
    backgroundColor: "#F8B951",
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default MissingFieldsModal;
