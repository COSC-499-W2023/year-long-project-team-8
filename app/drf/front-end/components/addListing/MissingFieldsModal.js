import React from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import CustomText from '../CustomText';
import { AntDesign } from '@expo/vector-icons';

const window = Dimensions.get('window');

const MissingFieldsModal = ({ visible, missingFields, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <AntDesign name="close" size={18} color="white" />
          </TouchableOpacity>
          
          <CustomText style={styles.modalTitle} fontType={"title"}>Missing Information</CustomText>

          <CustomText style={styles.modalText} fontType={"subHeader"}>
            Please complete the following fields to share your leftovers
          </CustomText>

          {missingFields.map((field, index) => (
            <CustomText key={index} style={styles.fieldItem}>{field}</CustomText>
          ))}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalView: {
    width: window.width,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'relative', 
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 22,
  },
  lineSeparator: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  horizontalLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'black'
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
    margin: 5
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center'
  },
  fieldItem: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18
  },
  closeButton: {
    position: 'absolute', 
    top: 10, 
    right: 10, 
    width: 30, 
    height: 30, 
    backgroundColor: '#FFA500', 
    borderRadius: 15, 
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2
  },
});

export default MissingFieldsModal;
