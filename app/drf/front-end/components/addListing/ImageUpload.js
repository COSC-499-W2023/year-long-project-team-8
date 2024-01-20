import React, { useState } from "react";
import { View, TouchableOpacity, Image, ImageBackground, StyleSheet, Modal, ScrollView, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import CustomText from "../CustomText";

const imageIcon = require("../../assets/add-image.png");

const ImageUpload = ({ images, setImages, isFieldMissing }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);

  const showAlert = () => setAlertVisible(true);

  const handleAddImagePress = () => {
    if (images.length >= 3) {
      showAlert(); 
    } else {
      setModalVisible(true); 
    }
  };

  const handleMediaSelection = async (type) => {
    setModalVisible(false);

    if (images.length >= 3) {
      showAlert();
      return;
    }

    try {
      const permissionResult = type === 'camera'
        ? await ImagePicker.requestCameraPermissionsAsync()
        : await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert("Permission required", "You need to grant permission to access the camera/gallery.");
        return;
      }

      const pickerResult = await (type === 'camera'
        ? ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [3, 2],
            quality: 0.5,
          })
        : ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.5,
            allowsEditing: true,
            aspect: [3, 2],
          }));

      if (!pickerResult.canceled && pickerResult.assets) {
        const newImages = pickerResult.assets.map((asset) => asset.uri);
        setImages([...images, ...newImages]);
      }
    } catch (error) {
      console.error("Error picking an image: ", error);
      Alert.alert("Error", "An error occurred while picking the image.");
    }
  };

  const handleDeleteImage = (index) => {
    setImages(images.filter((_, idx) => idx !== index));
  };

  return (
    <View style={[styles.container, isFieldMissing && styles.missingField]}>
      <CustomText fontType={"title"} style={styles.title}>
        Add Images
      </CustomText>
      <View style={styles.containerImages}>
      <TouchableOpacity onPress={handleAddImagePress} style={styles.button}>
        <Image source={imageIcon} style={styles.icon} />
      </TouchableOpacity>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageScrollView}>
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
        </ScrollView>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <MaterialIcons name="close" size={24} color="white" />
            </TouchableOpacity>
            <CustomText style={styles.uploadModalHeaderText} fontType={"title"}>Add Image</CustomText>
            <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleMediaSelection('gallery')}
            >
              <CustomText style={styles.modalButtonText}>Upload from Gallery</CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleMediaSelection('camera')}
            >
              <CustomText style={styles.modalButtonText}>Take Picture</CustomText>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
              Oops! You can upload up to 3 pictures.
            </CustomText>
            <TouchableOpacity
              style={styles.modalButton}
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
    fontSize: 20,
    
  },
  uploadModalHeaderText:{
    fontSize:22,
    alignSelf:"center",
    color:"black"
  },
  containerImages: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 10, 
  },
  imageWrapper: {
    position: "relative",
    marginRight: 15, 
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2, 
    },
    shadowOpacity: 0.3,
    shadowRadius: 3, 
    elevation: 5, 
    backgroundColor: 'white', 
    borderRadius: 5,
    marginTop: 15,
    marginBottom: 15,
  },
  buttonsContainer:{
    margin:10,
  },
  image: {
    width: 65,
    height: 65,
    borderRadius: 5,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginRight: -15,
    marginTop: -15,
    backgroundColor:"orange",
    borderRadius:20,
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
    marginRight: 15, 
    marginTop: 15,
    marginBottom: 15,
    borderRadius: 15,
    marginLeft:10,
  },
  icon: {
    width: 70,
    height: 70,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
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
  modalButton: {
    backgroundColor: "#FCA63C",
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginTop: 15,
    width: 200,
    alignItems: 'center',
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
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
    borderRadius: 10,
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
  missingField: {
    borderColor: "red",
    borderWidth: 1,
  },
  modalBackgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

export default ImageUpload;
