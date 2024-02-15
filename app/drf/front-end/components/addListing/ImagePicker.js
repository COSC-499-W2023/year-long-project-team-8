import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";

const ImagePickerComponent = ({ onImageSelected }) => {
  const [imageUris, setImageUris] = useState([]);

  const addImage = (asset) => {
    const updatedUris = [...imageUris, asset.uri];
    setImageUris(updatedUris);
    onImageSelected(updatedUris);
  };

  const requestPermissions = async () => {
    const cameraResult = await ImagePicker.getCameraPermissionsAsync();
    const libraryResult = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (!cameraResult.granted || !libraryResult.granted) {
      Alert.alert(
        "Permissions required",
        "Please grant camera and media library permissions to continue."
      );
      return false;
    }
    return true;
  };

  const openCamera = async () => {
    if (!(await requestPermissions())) return;
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [3, 2],
      quality: 1,
    });
    if (!result.canceled) {
      addImage(result.assets[0]);
    }
  };

  const handleRemoveImage = (index) => {
    const updatedUris = imageUris.filter((_, i) => i !== index);
    setImageUris(updatedUris);
    onImageSelected(updatedUris);
  };

  const renderImageWithTrashcan = (uri, index) => {
    return (
      <View key={index} style={styles.imageContainer}>
        <Image source={{ uri }} style={styles.image} />
        <TouchableOpacity
          style={styles.trashcanButton}
          onPress={() => handleRemoveImage(index)}
        >
          <MaterialIcons name="delete" size={24} color="grey" />
        </TouchableOpacity>
      </View>
    );
  };

  const renderImages = () => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.imagesScrollContainer}
      >
        {imageUris.map(renderImageWithTrashcan)}
        {imageUris.length < 3 && (
          <TouchableOpacity style={styles.addButton} onPress={openCamera}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    );
  };

  return (
    <View style={styles.imagePicker}>
      <Text style={styles.titleText}>Select photos</Text>
      {renderImages()}
    </View>
  );
};

export default ImagePickerComponent;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
    paddingTop: 20,
    paddingBottom: 20,
  },
  input: {
    width: "90%",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    borderColor: "#CCCCCC",
    borderWidth: 1,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  imagePicker: {
    alignItems: "flex-start",
    width: "100%",
    marginLeft: 20,
  },
  imagesScrollContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  imageContainer: {
    marginRight: 8,
    alignItems: "center",
    marginBottom: 8,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  trashcanButton: {
    marginTop: 4,
  },
  trashcanIcon: {},
  addButton: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: "#007BFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  addButtonText: {
    fontSize: 24,
    color: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginTop: 20,
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    backgroundColor: "#007AFF",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#34C759",
  },
  placeholderText: {
    color: "#999999",
    fontSize: 16,
  },
  imagePreview: {
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#CCCCCC",
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    width: "90%",
  },
});
