import React from "react";
import { View, Modal, TouchableOpacity, StyleSheet, Image } from "react-native";
import CustomText from "../CustomText";
import { MaterialIcons } from "@expo/vector-icons";

const PostModal = ({
  isVisible,
  onClose,
  onUnsave,
  onView,
  onRequest,
  listing,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalView}>
        {listing && (
          <>
            <Image
              source={{ uri: listing.images[0].image }}
              style={styles.modalImage}
            />
            <CustomText style={styles.modalTitle}>{listing.title}</CustomText>
          </>
        )}
        <TouchableOpacity style={styles.option} onPress={onUnsave}>
          <MaterialIcons name="delete" size={24} color="black" />
          <CustomText>Unsave Post</CustomText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={onView}>
          <MaterialIcons name="visibility" size={24} color="black" />
          <CustomText>View Post</CustomText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={onRequest}>
          <MaterialIcons name="chat" size={24} color="black" />
          <CustomText>Request Post</CustomText>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default PostModal;

const styles = StyleSheet.create({
  modalView: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  modalImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
});
