import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import CustomText from '../CustomText';
import styles from './styles';

const CancelButton = ({ handleCancel }) => {
    return (
        <View style={styles.cancelButtonContainer}>
            <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
                <CustomText fontType={"text"} style={styles.cancelText}>RESET</CustomText>
            </TouchableOpacity>
        </View>
    );
};

export default CancelButton;
