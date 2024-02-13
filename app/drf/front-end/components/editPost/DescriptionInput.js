// DescriptionInput.js
import React from 'react';
import { View, TextInput } from 'react-native';
import CustomText from '../CustomText';
import styles from './styles';

const DescriptionInput = ({ content, setContent }) => {
  return (
    <View style={styles.section}>
      <CustomText style={styles.title}>Description</CustomText>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={content}
        onChangeText={setContent}
        placeholder="Description"
        multiline={true}
        textAlignVertical='top'
      />
    </View>
  );
};

export default DescriptionInput;
