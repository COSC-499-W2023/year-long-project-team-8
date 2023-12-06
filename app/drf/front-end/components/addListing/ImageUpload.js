import React, { useState } from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import CustomText from "../CustomText";

const imageIcon = require("../../assets/icons/addImage.png");

// ImageUpload component allows users to pick images from their gallery and displays them.
const ImageUpload = () => {
  const [images, setImages] = useState([]);

  // Function to handle picking an image from the gallery
  const handleImagePick = async () => {
    // Check if the limit of 3 images is already reached
    if (images.length >= 3) {
      alert("You can only upload up to 3 images.");
      return;
    }

    try {
      // Request permission to access the media library
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
        alert("You've refused to allow this app to access your gallery!");
        return;
      }

      // Launch the image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
        allowsEditing: true,
        aspect: [1, 1],
      });

      // If the operation wasn't cancelled, update the images state
      if (!result.canceled) {
        setImages([...images, result.uri]);
      }
    } catch (error) {
      console.error("Error picking an image: ", error);
      alert("An error occurred while picking the image.");
    }
  };

  // Function to handle deletion of a selected image
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
          <CustomText style={styles.imageText} fontType={"textFont"}>
            Upload
          </CustomText>
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
    fontSize: 20,
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
    top: -10,
    right: -10,
    borderRadius: 15,
  },
  button: {
    marginHorizontal: 10,
    marginTop: 16,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  icon: {
    width: 40,
    height: 40,
  },
  imageText: {
    alignSelf: "center",
    marginTop: 5,
  },
});

export default ImageUpload;
