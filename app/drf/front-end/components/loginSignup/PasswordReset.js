import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, KeyboardAvoidingView, ScrollView, Platform, Pressable, ImageBackground } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import LoginStyles from "./LoginStyles";
import InputField from './InputField';
import PasswordStrengthBar from "./PasswordStrengthBar";
import ChecklistModal from "./ChecklistModal";
import ButtonSignup from "./ButtonLanding";
import { baseEndpoint } from '../../config/config';
import CustomText from '../CustomText';

const PasswordResetScreen = ({ navigation }) => {
  const [reset_code, setCode] = useState('');
  const [password, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); 

  const handleResetPassword = async () => {
    try {
      // Check if the password field is empty
      if (!password) {
        setErrorMessage('Please enter a new password');
        setSuccessMessage('');
        return;
      }

      // Check if the passwords match
      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match');
        setSuccessMessage('');
        return;
      }

      //api call
      const response = await fetch(`${baseEndpoint}/auth/reset-password/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reset_code, password }),
      });

      if (response.ok) {
        setSuccessMessage('Password reset successful');
        setErrorMessage('');
        navigation.navigate('Landing');
      } else {
        const errorResponse = await response.json();
        setErrorMessage(`Error with entered code. Try again`);
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Network or other error:', error);
      setErrorMessage('Invalid code. Try again');
      setSuccessMessage('');
    }
  };

  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        titleFont: require('../../assets/fonts/Inter-Bold.ttf'),
        subHeaderFont: require('../../assets/fonts/Inter-Regular.ttf'),
        textFont: require('../../assets/fonts/Inter-Medium.ttf'),
      });
      setFontLoaded(true);
    };
    loadFont();
  }, []);

  return (
    <ImageBackground 
      source={require('../../assets/wave.png')} 
      style={{ flex: 1 }}
      resizeMode="cover" 
    >
    <KeyboardAvoidingView
      style={{ flex: 1, paddingTop: 50 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={LoginStyles.headerContainer}>
          <CustomText style={LoginStyles.headerText}>
            Password Reset
          </CustomText>
          <CustomText
            style={LoginStyles.subHeaderText}>
            Enter your code and create a new password.
          </CustomText>
        </View>

        <View style={LoginStyles.fields}>
          <InputField
            icon="email" 
            placeholder="Enter code"
            value={reset_code}
            onChangeText={(text) => setCode(text)}
          />
         
          <InputField
            icon="lock" 
            placeholder="Enter new password"
            value={password}
            onChangeText={(text) => setNewPassword(text)}
            secureTextEntry={!showPassword} 
            rightComponent={ 
              <View style={{ flexDirection: 'row' }}>
                <Pressable
                  onPress={() => setShowPassword(!showPassword)}
                  style={{ marginRight: 10 }}
                  testID="password-visibility-icon"
                >
                  <MaterialIcons
                    name={showPassword ? 'visibility' : 'visibility-off'}
                    size={25}
                    color="gray"
                  />
                </Pressable>
                <ChecklistModal password={password} />
                
              </View>
            }
          />
          <PasswordStrengthBar password={password} />
          <InputField
            icon="lock" 
            placeholder="Confirm new password"
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            secureTextEntry={!showPassword} 
          />
          {successMessage ? (
            <CustomText style={{ color: 'green' }}>{successMessage}</CustomText>
          ) : null}
          {errorMessage ? (
            <CustomText style={LoginStyles.forgotPasswordModalError}>{errorMessage}</CustomText>
          ) : null}
          <ButtonSignup title="Reset Password" onPress={handleResetPassword} />
          <Pressable
            style={LoginStyles.backButton}
            onPress={() => navigation.navigate('Landing')}
          >
            <CustomText style={LoginStyles.backButton} fontType="text">BACK</CustomText>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default PasswordResetScreen;