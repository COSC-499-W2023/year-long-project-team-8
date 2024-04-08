import React from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import CustomText from "../CustomText";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const PostPreviewModal = ({ visible, post, onClose, navigation }) => {
  const handleNavigateToDetails = () => {
    onClose();
    navigation.navigate("PostDetails", { listing: post });
  };

  const handleNavigateToDirections = () => {
    onClose();
    const latitude = post.latitude;
    const longitude = post.longitude;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <MaterialIcons name="close" size={24} color="grey" />
              </TouchableOpacity>
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: post.images[0].image }}
                  style={styles.image}
                />
              </View>
              <CustomText style={styles.postTitle}>{post.title}</CustomText>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.buttonDirect}
                  onPress={handleNavigateToDirections}
                >
                  <CustomText style={styles.buttonDirectText}>
                    Get Directions
                  </CustomText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonView}
                  onPress={handleNavigateToDetails}
                >
                  <CustomText style={styles.buttonViewText}>
                    View Details
                  </CustomText>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    paddingBottom: 10,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    padding: 7,
    top: 5,
    right: 5,
    backgroundColor: "white",
    borderRadius: 25,
    zIndex: 100,
  },
  postTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  imageContainer: {
    width: "100%",
    borderRadius: 10,
    padding: 10,
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  postDescription: {
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    paddingHorizontal: 10,
    marginTop: 5,
  },
  buttonView: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    width: "40%",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  buttonDirect: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    width: "40%",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  buttonViewText: {
    color: "white",
    fontWeight: "bold",
  },
  buttonDirectText: {
    color: "#007BFF",
    fontWeight: "bold",
  },
});

export default PostPreviewModal;
