import React, { useState } from "react";
import { View, TouchableOpacity, Image, StyleSheet, Modal } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import CustomText from "../CustomText";

const imageIcon = require("../../assets/icons/addImage.png");

// ImageUpload component allows users to pick images from their gallery and displays them.
const ImageUpload = ({ images, setImages }) => {
  const [alertVisible, setAlertVisible] = useState(false);

  const showAlert = () => setAlertVisible(true);

  const handleImagePick = async () => {
    if (images.length >= 3) {
      showAlert();
      return;
    }

    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        alert("You've refused to allow this app to access your gallery!");
        return;
      }

      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
        allowsEditing: true,
        aspect: [3, 2],
      });

      if (!pickerResult.canceled && pickerResult.assets) {
        const newImages = pickerResult.assets.map((asset) => asset.uri);
        setImages([...images, ...newImages]);
      }
    } catch (error) {
      console.error("Error picking an image: ", error);
      alert("An error occurred while picking the image.");
    }
  };

  const handleDeleteImage = (index) => {
    setImages(images.filter((_, idx) => idx !== index));
  };

  return (
    <View style={styles.container}>
      <CustomText fontType={"title"} style={styles.title}>
        Add Images
      </CustomText>
      <View style={styles.containerImages}>
        <TouchableOpacity onPress={handleImagePick} style={styles.button}>
          <Image source={imageIcon} style={styles.icon} />
        </TouchableOpacity>
        <View style={styles.imageContainer}>
          {images.map((uri, index) => (
            <View key={index} style={styles.imageWrapper}>
              <Image source={{ uri }} style={styles.image} />
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteImage(index)}
              >
                <MaterialIcons name="cancel" size={18} color="red" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={alertVisible}
        onRequestClose={() => setAlertVisible(false)}
      >
        <TouchableOpacity
          style={styles.centeredView}
          activeOpacity={1}
          onPressOut={() => setAlertVisible(false)}
        >
          <View style={styles.alertModalView}>
            <CustomText style={styles.modalText}>
              Ups! You can upload up to 3 pictures
            </CustomText>
            <TouchableOpacity
              style={styles.buttonClose}
              onPress={() => setAlertVisible(false)}
            >
              <CustomText style={styles.textStyle}>Got it!</CustomText>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  title: {
    marginTop: 15,
    marginLeft: 15,
    fontSize: 17,
  },
  containerImages: {
    alignItems: "center",
    flexDirection: "row",
  },
  imageContainer: {
    flexDirection: "row",
  },
  image: {
    marginTop: 10,
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  imageWrapper: {
    position: "relative",
    marginHorizontal: 10,
  },
  deleteButton: {
    position: "absolute",
    top: -4,
    right: -10,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 1,
  },
  button: {
    marginHorizontal: 10,
    marginTop: 16,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  icon: {
    width: 60,
    height: 60,
  },
  imageText: {
    alignSelf: "center",
    marginTop: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  alertModalView: {
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
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
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
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default ImageUpload;
