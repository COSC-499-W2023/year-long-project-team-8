import React from 'react';
import { ImagePicker } from 'expo-image-multiple-picker';

const ImagePickerScreen = ({ route, navigation }) => {
  const { onPick } = route.params;

  const handleSave = (selectedImages) => {
    onPick(selectedImages); // Pass selected images back
    navigation.goBack(); // Go back to the previous screen
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <ImagePicker
      onSave={handleSave}
      onCancel={handleCancel}
      maxFiles={6} // Adjust according to your needs
      mediaType="photo"
    />
  );
};

export default ImagePickerScreen;
