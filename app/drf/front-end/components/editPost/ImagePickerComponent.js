import React, { useState } from 'react';
import { View, TouchableOpacity, Modal, Image } from 'react-native';
import { ImagePicker } from 'expo-image-multiple-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ImageGrid from './ImageGrid'; 
import CustomText from '../CustomText'; 
import styles from './styles'; 

const ImagePickerComponent = ({ images, onImagesUpdated }) => {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [editingImageIndex, setEditingImageIndex] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageModalVisible, setImageModalVisible] = useState(false);

  const handleChangeImage = (index) => {
    setEditingImageIndex(index); // Set the index of the image to be replaced
    setIsPickerOpen(true); // Open the image picker for new selection
  };
  

  const handleImageSave = (selectedImages) => {
    if (editingImageIndex !== null && selectedImages.length > 0) {
      const updatedImages = [...images];
      updatedImages[editingImageIndex] = { image: selectedImages[0].uri };
      onImagesUpdated(updatedImages);
      setEditingImageIndex(null);
    } else {
      const newImages = selectedImages.map(img => ({ image: img.uri }));
      onImagesUpdated([...images, ...newImages]);
    }
    setIsPickerOpen(false);
  };
  
  

  const handleImageCancel = () => {
    setIsPickerOpen(false);
    setEditingImageIndex(null);
  };

  const handleDeleteImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    onImagesUpdated(updatedImages);
  };

  const onImagePress = (img, index) => {
    setSelectedImage(img); // Set the selected image for the modal
    setImageModalVisible(true); // Open the modal to show the image with options
  };

  const handleCloseModal = () => {
    setImageModalVisible(false);
  };

  const handleDeleteImageModal = () => {
    if (selectedImage && selectedImage.image) {
      const updatedImages = images.filter(img => img.image !== selectedImage.image);
      onImagesUpdated(updatedImages);
    }
    setImageModalVisible(false);
  };

  return (
    <View style={styles.section}>
      <View style={styles.imageSection}>
        <CustomText style={styles.title}>Images</CustomText>
        {images.length < 6 && (
          <TouchableOpacity style={styles.addIconContainer} onPress={() => setIsPickerOpen(true)}>
            <MaterialIcons name="add" size={26} color="#000" />
          </TouchableOpacity>
        )}
      </View>
      <ImageGrid
        images={images}
        onChangeImage={handleChangeImage}
        onDeleteImage={handleDeleteImage}
        onImagePress={onImagePress}
      />

      <Modal
        visible={isPickerOpen}
        animationType="slide"
        onRequestClose={() => setIsPickerOpen(false)}
        transparent={false}
      >
        <ImagePicker
          onSave={handleImageSave}
          onCancel={handleImageCancel}
          limit={6 - images.length}
          mediaType="photo"
          multiple
        />
      </Modal>

      <Modal visible={imageModalVisible} transparent={true} onRequestClose={handleCloseModal}>
        <View style={styles.modalView}>
            <View style={styles.imageAndCloseButtonContainer}>
                <Image source={{ uri: selectedImage?.image }} style={styles.modalImage} />
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

    </View>
  );
};

export default ImagePickerComponent;
