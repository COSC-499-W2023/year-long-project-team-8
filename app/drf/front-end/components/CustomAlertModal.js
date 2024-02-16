import React from 'react';
import { Modal, View, TouchableOpacity, StyleSheet } from 'react-native';
import CustomText from './CustomText';

const CustomAlertModal = ({ isVisible, message, onClose }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <CustomText style={styles.modalTitle} fontType={'title'}>Ooops</CustomText>
                    <CustomText style={styles.modalText}>{message}</CustomText>
                    <TouchableOpacity
                        style={[styles.button, styles.buttonClose]}
                        onPress={onClose}
                    >
                        <CustomText style={styles.textStyle}>Close</CustomText>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        marginHorizontal: 20,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%', 
    },
    button: {
        marginTop:10,
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical:10
    },
    buttonClose: {
        backgroundColor: "#f73e47",
    },
    textStyle: {
        fontSize:16,
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalTitle:{
        fontSize:18,
    },
    modalText: {
        fontSize:16,
        marginVertical: 10,
        textAlign: "center"
    }
    
});

export default CustomAlertModal;
