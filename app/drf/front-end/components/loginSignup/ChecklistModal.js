import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import PasswordChecklist from "./PasswordChecklist";
import Modal from "react-native-modal";

const ChecklistModal = ({ password }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <MaterialIcons name="info-outline" size={25} color="gray" />
      </TouchableOpacity>

      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={modalStyles.bottomModal}
      >
        <View style={modalStyles.modalView}>
          <PasswordChecklist password={password} />

          <TouchableOpacity
            style={modalStyles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={modalStyles.textStyle}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const modalStyles = StyleSheet.create({
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0, // Remove default margins to fully align at the bottom
  },
  modalView: {
    width: "100%", // Use full width
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    backgroundColor: "#FCA63C",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 15,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ChecklistModal;
