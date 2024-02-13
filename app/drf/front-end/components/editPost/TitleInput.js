// TitleInput.js
import React from 'react';
import { View, TextInput } from 'react-native';
import CustomText from '../CustomText';
import styles from './styles';

const TitleInput = ({ title, setTitle }) => {
  return (
    <View>
      <CustomText style={styles.title}>Title</CustomText>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
      />
    </View>
  );
};

export default TitleInput;
