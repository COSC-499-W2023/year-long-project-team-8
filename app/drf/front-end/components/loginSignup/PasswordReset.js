import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, KeyboardAvoidingView, ScrollView, Platform, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import styles from './LoginStyles'; // Assuming you have styles defined in LoginStyles.js
import InputField from './InputField';
import PasswordStrengthBar from "./PasswordStrengthBar";
import ChecklistModal from "./ChecklistModal";
import ButtonSignup from "./ButtonLanding";
import { baseEndpoint } from '../../config/config';

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

      // Additional password strength checks can be added here

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
        <View style={styles.headerContainer}>
          <Text
            style={[
              styles.headerText,
              fontLoaded ? { fontFamily: 'titleFont' } : {},
            ]}
          >
            Password Reset
          </Text>
          <Text
            style={[
              styles.subHeaderText,
              fontLoaded ? { fontFamily: 'subHeaderFont' } : {},
            ]}
          >
            Enter your code and create a new password.
          </Text>
        </View>

        <View style={styles.fields}>
          <InputField
            icon="email" // Adjust icon as needed
            placeholder="Enter code"
            value={reset_code}
            onChangeText={(text) => setCode(text)}
          />
         
          <InputField
            icon="lock" // Adjust icon as needed
            placeholder="Enter new password"
            value={password}
            onChangeText={(text) => setNewPassword(text)}
            secureTextEntry={!showPassword} // Added for show/hide functionality
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
            icon="lock" // Adjust icon as needed
            placeholder="Confirm new password"
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            secureTextEntry={!showPassword} // Added for show/hide functionality
          />
          <ButtonSignup title="Reset Password" onPress={handleResetPassword} />

          {successMessage ? (
            <Text style={{ color: 'green' }}>{successMessage}</Text>
          ) : null}
          {errorMessage ? (
            <Text style={{ color: 'red' }}>{errorMessage}</Text>
          ) : null}
          <Pressable
            style={styles.backButton}
            onPress={() => navigation.navigate('Landing')}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default PasswordResetScreen;