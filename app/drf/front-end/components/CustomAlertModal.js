import React from 'react';
import { Modal, View, TouchableOpacity, StyleSheet } from 'react-native';
import CustomText from './CustomText';
import { MaterialIcons } from '@expo/vector-icons';

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
                    <View style={styles.header}>
                    </View>
                    <View style={styles.body}>
                        <CustomText style={styles.modalTitle} fontType={'title'}>Ooops!</CustomText>
                        <CustomText style={styles.modalText} fontType={'text'}>{message}</CustomText>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={onClose}
                        >
                            <CustomText style={styles.textStyle}>Close</CustomText>
                        </TouchableOpacity>
                    </View>
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
    },
    modalView: {
        marginHorizontal: 20,
        backgroundColor: "white",
        borderRadius: 10,
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
    body:{
        backgroundColor: "white",
        borderRadius: 10,
        alignItems: "center",
        justifyContent:"center",
        marginVertical:20,
        padding:10,
    },
    button: {
        marginTop:10,
        borderRadius: 10,
        paddingHorizontal: "30%",
        paddingVertical:10
    },
    buttonClose: {
        backgroundColor: "orange",
    },
    textStyle: {
        fontSize:16,
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalTitle:{
        fontSize:25,
    },
    modalText: {
        fontSize:16,
        marginVertical: 10,
        textAlign: "center",
        color:"grey"
    }
    
});

export default CustomAlertModal;
