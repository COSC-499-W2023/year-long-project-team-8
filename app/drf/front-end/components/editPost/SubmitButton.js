import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import CustomText from '../CustomText';
import styles from './styles';

const SubmitButton = ({ handleUpdatePost, title }) => {
    return (
        <View style={styles.submitButtonContainer}>
            <TouchableOpacity onPress={handleUpdatePost} style={styles.submitButton}>
                <CustomText fontType={"title"} style={styles.submitText}>{title}</CustomText>
            </TouchableOpacity>
        </View>
    );
};

export default SubmitButton;
