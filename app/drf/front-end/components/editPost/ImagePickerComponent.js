import React, { useState } from 'react';
import { View, TouchableOpacity, Modal, Image, Alert } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ImageGrid from './ImageGrid';
import CustomText from '../CustomText';
import styles from './styles';
import CustomAlertModal from '../CustomAlertModal';
import * as ImagePicker from 'expo-image-picker';

const ImagePickerComponent = ({ images, onImagesUpdated }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');


  const showImagePickerOptions = async () => {
    const options = ['Take Photo', 'Choose from Library', 'Cancel'];

    Alert.alert(
      'Select an option',
      '',
      options.map((option, index) => ({
        text: option,
        onPress: () => {
          if (index === 0) {
            takePhoto();
          } else if (index === 1) {
            chooseFromLibrary();
          }
        },
      })),
      { cancelable: true }
    );
  };

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your camera!");
      return;
    }

    const cameraResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!cameraResult.canceled) {
      const newImages = [...images, cameraResult.uri];
      onImagesUpdated(newImages);
    }
  };

  const chooseFromLibrary = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }

    const libraryResult = await ImagePicker.launchImageLibraryAsync({
      aspect: [4, 3],
      quality: 0.7,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!libraryResult.canceled && libraryResult.assets) {
      const newImages = [...images, ...libraryResult.assets.map(asset => asset.uri)];
      onImagesUpdated(newImages);
    }
  };

  const handleDeleteImageModal = () => {
    if (images.length <= 1) {
      setAlertMessage('At least one image is required');
      setIsAlertVisible(true);
      setImageModalVisible(false);
      return;
    }

    if (selectedImage) {
      const updatedImages = images.filter(img => img !== selectedImage);
      onImagesUpdated(updatedImages);
    }
    setImageModalVisible(false);
  };

  const onImagePress = (uri, index) => {
    setSelectedImage(uri);
    setImageModalVisible(true);
  };

  const handleCloseModal = () => {
    setImageModalVisible(false);
  };

  return (
    <View style={styles.section}>
      <View style={styles.imageSection}>
        <CustomText style={styles.title}>Images</CustomText>
        {images.length < 6 && (
          <TouchableOpacity style={styles.addIconContainer} onPress={showImagePickerOptions}>
            <MaterialIcons name="add" size={26} color="#000" />
          </TouchableOpacity>
        )}
      </View>
      <ImageGrid
        images={images}
        onImagePress={onImagePress}
      />

      <Modal visible={imageModalVisible} transparent={true} onRequestClose={handleCloseModal}>
        <View style={styles.modalView}>
          <View style={styles.imageAndCloseButtonContainer}>
            <Image source={{ uri: selectedImage }} style={styles.modalImage} />
          </View>
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity onPress={handleCloseModal} style={styles.modalButton}>
              <CustomText style={styles.modalButtonText}>Close</CustomText>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDeleteImageModal} style={styles.modalButton}>
              <CustomText style={styles.modalButtonTextDelete}>Delete</CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Custom Alert Modal */}
      <CustomAlertModal
        isVisible={isAlertVisible}
        message={alertMessage}
        onClose={() => setIsAlertVisible(false)}
      />
    </View>
  );
};

export default ImagePickerComponent;
