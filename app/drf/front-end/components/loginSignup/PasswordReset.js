import React, { useState } from 'react';
import { baseEndpoint } from '../../config/config';
import { View, TextInput, Button } from 'react-native';

const PasswordResetScreen = () => {
    const [reset_code, setCode] = useState('');
    const [password, setNewPassword] = useState('');
  
    const handleResetPassword = async () => {
      try {
        const response = await fetch(`${baseEndpoint}/auth/reset-password/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ reset_code, password }),
        });
  
        if (response.ok) {
          console.log('Password reset successful');
          // Optionally, navigate to a success screen
        } else {
          // Handle error response
          console.error('Error:', response);
        }
      } catch (error) {
        console.error('Network or other error:', error);
      }
    };
  
    return (
      <View>
        <TextInput
          placeholder="Enter code"
          value={reset_code}
          onChangeText={(text) => setCode(text)}
        />
        <TextInput
          placeholder="Enter new password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setNewPassword(text)}
        />
        <Button title="Reset Password" onPress={handleResetPassword} />
      </View>
    );
  };
  
  export default PasswordResetScreen;
  