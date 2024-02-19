import React from 'react';
import { View, TextInput } from 'react-native';
import CustomText from '../CustomText';
import styles from './styles';

const DescriptionInput = ({ content, setContent, isValid, setIsValid }) => {

  const handleChangeText = (text) => {
    setContent(text);
    setIsValid(true); 
  };

  return (
    <View style={styles.section}>
      <CustomText style={styles.title}>Description</CustomText>
      <TextInput
        style={[styles.textArea, !isValid ? styles.invalidInput : {}]}
        value={content}
        onChangeText={handleChangeText}
        placeholder="Description"
        multiline={true}
        textAlignVertical='top'
      />
    </View>
  );
};

export default DescriptionInput;
