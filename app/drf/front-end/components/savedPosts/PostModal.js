import React from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import CustomText from "../CustomText";
import { MaterialIcons } from "@expo/vector-icons";
import Modal from "react-native-modal";
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
      isVisible={isVisible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection="down"
      style={styles.modal}
    >
      <View style={styles.modalView}>
        <View style={styles.slideIndicator}></View>
        <TouchableOpacity
          style={styles.option}
          onPress={onView}
          activeOpacity={0.7}
        >
          <MaterialIcons name="visibility" size={30} color="grey" />
          <CustomText style={styles.optionText}>Navigate to post</CustomText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={onRequest}
          activeOpacity={0.7}
        >
          <MaterialIcons name="chat" size={30} color="grey" />
          <CustomText style={styles.optionText}>Send a message</CustomText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={onUnsave}
          activeOpacity={0.7}
        >
          <MaterialIcons name="delete" size={30} color="grey" />
          <CustomText style={styles.optionText}>Unsave post</CustomText>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  optionText: {
    fontSize: 17,
    marginLeft: 10,
  },
  slideIndicator: {
    borderWidth: 2,
    borderRadius: 20,
    width: 30,
    alignSelf: "center",
    marginBottom: 5,
    borderColor: "grey",
  },
});
