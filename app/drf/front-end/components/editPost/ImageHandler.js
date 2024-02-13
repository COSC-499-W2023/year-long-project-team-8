import React, { useState } from 'react';
import { View, Modal, Image, TouchableOpacity, Text, Alert } from 'react-native';
import { ImagePicker } from 'expo-image-multiple-picker';
import ImageGrid from './ImageGrid'; // Ensure this component is properly implemented
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './styles'; // Your StyleSheet goes here

const ImageHandler = ({ images, setImages }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const handleImagePress = (index) => {
    if (images[index]) { // Check if the image exists at the index
      setSelectedImageIndex(index);
      setModalVisible(true);
    } else {
      Alert.alert('Error', 'Image does not exist.');
    }
  };

  const closeModal = () => setModalVisible(false);

  const handleDeleteImage = () => {
    if (selectedImageIndex != null && images[selectedImageIndex]) {
      const updatedImages = images.filter((_, index) => index !== selectedImageIndex);
      setImages(updatedImages);
      closeModal();
    }
  };

  const handleChangeImage = () => {
    if (selectedImageIndex != null && images[selectedImageIndex]) {
      setIsPickerOpen(true);
    }
  };

  const handleImageSave = (selectedImages) => {
    if (selectedImages.length > 0 && selectedImageIndex != null) {
      const updatedImages = [...images];
      updatedImages[selectedImageIndex] = { image: selectedImages[0].uri };
      setImages(updatedImages);
    }
    setIsPickerOpen(false);
    closeModal();
  };

  return (
    <View>
      <ImageGrid images={images} onImagePress={handleImagePress} />

      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalView}>
          {selectedImageIndex != null && images[selectedImageIndex] && (
            <Image source={{ uri: images[selectedImageIndex].image }} style={styles.modalImage} />
          )}
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity onPress={handleDeleteImage} style={styles.modalButton}>
              <Text>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleChangeImage} style={styles.modalButton}>
              <Text>Change</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {isPickerOpen && (
        <ImagePicker
          onSave={handleImageSave}
          onCancel={() => setIsPickerOpen(false)}
          maxFiles={1} // Limit to only 1 image
          mediaType="photo"
          multiple={false} // Disable multiple selection
        />
      )}
    </View>
  );
};

export default ImageHandler;
