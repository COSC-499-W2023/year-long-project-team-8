import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { TextInput } from "react-native-paper";

const AddListing = () => {
  const [imageUris, setImageUris] = useState([]);
  const { showActionSheetWithOptions } = useActionSheet();

  const addImage = (asset) => {
    const updatedUris = [...imageUris, asset.uri];
    setImageUris(updatedUris);
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

  const handleImageSelection = async () => {
    if (!(await requestPermissions())) return;

    const options = ["Cancel", "Take Photo", "Choose from Gallery"];
    const cancelButtonIndex = 0;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        if (buttonIndex === 1) {
          const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [3, 2],
            quality: 1,
          });
          if (!result.canceled) {
            addImage(result);
          }
        } else if (buttonIndex === 2) {
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 2],
            quality: 1,
          });
          if (!result.canceled) {
            addImage(result);
          }
        }
      }
    );
  };

  const handleRemoveImage = (index) => {
    const updatedUris = imageUris.filter((_, i) => i !== index);
    setImageUris(updatedUris);
  };

  const renderImageWithTrashcan = (uri, index) => (
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.imagesScrollContainer}
      >
        {imageUris.map(renderImageWithTrashcan)}
        {imageUris.length < 3 && (
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleImageSelection}
          >
            <MaterialIcons name="add-a-photo" size={24} color="white" />
          </TouchableOpacity>
        )}
      </ScrollView>
    </ScrollView>
  );
};

export default AddListing;

// Update styles as needed
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
    paddingTop: 20,
    paddingBottom: 20,
  },
  imagesScrollContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  imageContainer: {
    marginRight: 8,
    alignItems: "center",
    marginBottom: 8,
    position: "relative",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  trashcanButton: {
    alignSelf: "flex-start",
  },
  addButton: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
});
