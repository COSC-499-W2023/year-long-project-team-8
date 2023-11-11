import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import * as ExpoImagePicker from "expo-image-picker";
import styles from "./styles";

const ImagePickerComponent = ({ onImageSelected }) => {
  const [imageUri, setImageUri] = useState(null);

  const getPermissions = async () => {
    const cameraRollStatus =
      await ExpoImagePicker.requestMediaLibraryPermissionsAsync();
    const cameraStatus = await ExpoImagePicker.requestCameraPermissionsAsync();
    if (!cameraRollStatus.granted || !cameraStatus.granted) {
      Alert.alert(
        "Permissions required",
        "Please grant camera and camera roll permissions to continue."
      );
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    if (await getPermissions()) {
      const result = await ExpoImagePicker.launchImageLibraryAsync({
        mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.cancelled) {
        setImageUri(result.uri);
        onImageSelected(result.uri);
      }
    }
  };

  const takePicture = async () => {
    if (await getPermissions()) {
      const result = await ExpoImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 1,
      });

      if (!result.cancelled) {
        setImageUri(result.uri);
        onImageSelected(result.uri);
      }
    }
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <Text style={styles.placeholderText}>No image selected</Text>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={takePicture}>
          <Text style={styles.buttonText}>Take Picture</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Pick from Gallery</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ImagePickerComponent;
