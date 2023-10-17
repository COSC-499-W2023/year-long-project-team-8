import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { TextInput } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";

import styles from "./LoginStyles";

// Login component for user authentication
const Login = ({ onSwitch }) => {
  // Local state variables to manage email and password input values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State variables for validation error messages
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Function to handle login upon button press
  const handleLogin = () => {
    let isValid = true;

    // Regex pattern to validate email address format
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

    // Validate email format
    if (!email || !emailRegex.test(email)) {
      setEmailError("*Invalid email");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Check if password is provided
    if (!password) {
      setPasswordError("*Password required");
      isValid = false;
    } else {
      setPasswordError("");
    }

    // If the provided email and password are valid, add login logic
    if (isValid) {
      // TODO: Implement back-end login logic here
    }
  };

  // Initial value for button animation
  const scaleValue = new Animated.Value(1);

  // Animate button press-in effect (scale down)
  const animatePressIn = () => {
    Animated.timing(scaleValue, {
      toValue: 0.95,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  // Animate button press-out effect (scale up)
  const animatePressOut = () => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {/* Input fields container */}
        <View style={styles.fields}>
          {/* Email input with conditional styling for error state */}
          <TextInput
            style={[styles.input, emailError ? styles.inputError : null]}
            label="Email"
            name="email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setEmailError("");
            }}
            inputMode="email"
            autoCapitalize="none"
            autoCorrect={false}
            mode="outlined"
          />
          {/* Display email validation errors */}
          <Text style={styles.errorText}>{emailError}</Text>

          {/* Password input with forgot password link */}
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, passwordError ? styles.inputError : null]}
              label="Password"
              name="password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setPasswordError("");
              }}
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}
              mode="outlined"
            />
            <View style={styles.pass}>
              {/* Display password validation errors */}
              <Text style={styles.errorText}>{passwordError}</Text>
              {/* Link to trigger forgotten password logic */}
              <Text
                style={styles.forgotText}
                onPress={() => {
                  // TODO: Implement forgot password logic here
                }}
              >
                Forgot Password?
              </Text>
            </View>
          </View>
        </View>

        {/* Animated login button */}
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <Pressable
            onPressIn={animatePressIn}
            onPressOut={animatePressOut}
            style={styles.button}
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>
        </Animated.View>

        {/* Signup prompt link */}
        <Pressable style={styles.signupContainer} onPress={onSwitch}>
          <View style={styles.joinUsSection}>
            <Text style={styles.signUpText}>Join Us</Text>
          </View>
          <View style={styles.arrowSection}>
            <MaterialIcons name="arrow-forward" size={28} color="white" />
          </View>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
