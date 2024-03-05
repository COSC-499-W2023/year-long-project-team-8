import React from 'react';
import { View, TextInput } from 'react-native';
import CustomText from '../CustomText';
import styles from './styles';

const TitleInput = ({ title, setTitle, isValid, setIsValid  }) => {

  const handleChangeText = (text) => {
    setTitle(text);
    setIsValid(true); 
  };

  return (
    <View>
      <CustomText style={styles.title}>Title</CustomText>
      <TextInput
        style={[styles.input, !isValid ? styles.invalidInput : {}]}
        value={title}
        onChangeText={handleChangeText} 
        placeholder="Title"
        testID="title-input"
      />
    </View>
  );
};

export default TitleInput;
