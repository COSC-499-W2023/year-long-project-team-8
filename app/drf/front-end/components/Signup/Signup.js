import React, { useState } from "react";
import { View, Text, SafeAreaView, Pressable, Animated } from "react-native";
import { TextInput } from "react-native-paper";
import styles from "./SignupStyles";
import { MaterialIcons } from "@expo/vector-icons";

const Signup = ({ onSwitch }) => {
  // State for form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // State for form field errors
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  // Function to handle signup validation and submission
  const handleSignup = () => {
    let isValid = true;
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

    // Validate email
    if (!email || !emailRegex.test(email)) {
      setEmailError("*Invalid email");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Validate password
    if (!password) {
      setPasswordError("*Password required");
      isValid = false;
    } else {
      setPasswordError("");
    }

    // Validate password confirmation
    if (password !== confirmPassword) {
      setConfirmPasswordError("*Passwords do not match");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    if (isValid) {
      // TODO: back-end signup logic
    }
  };

  // Animation values
  const scaleValue = new Animated.Value(1);

  // Button press-in animation
  const animatePressIn = () => {
    Animated.timing(scaleValue, {
      toValue: 0.95,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  // Button press-out animation
  const animatePressOut = () => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView style={styles.screen}>
      {/* Input fields container */}
      <View style={styles.fields}>
        {/* Email input */}
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
        <Text style={styles.errorText}>{emailError}</Text>

        {/* Password input */}
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
        <Text style={styles.errorText}>{passwordError}</Text>

        {/* Confirm password input */}
        <TextInput
          style={[
            styles.input,
            confirmPasswordError ? styles.inputError : null,
          ]}
          label="Confirm Password"
          name="confirmPassword"
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            setConfirmPasswordError("");
          }}
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
          mode="outlined"
        />
        <Text style={styles.errorText}>{confirmPasswordError}</Text>
      </View>

      {/* Animated Signup button */}
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        <Pressable
          onPressIn={animatePressIn}
          onPressOut={animatePressOut}
          style={styles.button}
          onPress={handleSignup}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>
      </Animated.View>

      {/* Link to switch to login */}
      <Pressable style={styles.loginContainer} onPress={onSwitch}>
        <View style={styles.arrowSection}>
          <MaterialIcons name="arrow-back" size={28} color="white" />
        </View>
        <View style={styles.joinUsSection}>
          <Text style={styles.loginText}>Log in</Text>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

export default Signup;
