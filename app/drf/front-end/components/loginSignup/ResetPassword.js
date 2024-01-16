import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const ResetPassword = ({ route, navigation }) => {
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Extract the token from the route parameters
    const { token } = route.params;
    setToken(token);
  }, [route.params]);

  const handleResetPassword = async () => {
    // Make API call to submit the password reset form
    try {
      const response = await fetch(`/api/auth/reset-password/<token>/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, token }),
      });

      if (response.ok) {
        // Password reset successful, handle accordingly
        console.log('Password reset successful');
        // Navigate to a success screen or perform other actions
      } else {
        // Handle error response
        console.error('Error:', response);
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Network error:', error);
    }
  };

  return (
    <View>
      <Text>Reset Password</Text>
      <Text>Token: {token}</Text>
      {/* Your password reset form */}
      <TextInput
        placeholder="Enter new password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Reset Password" onPress={handleResetPassword} />
    </View>
  );
};

export default ResetPassword;
