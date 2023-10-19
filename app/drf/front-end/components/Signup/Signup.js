import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import * as Font from "expo-font";
import styles from "../login/LoginStyles";
import { MaterialIcons } from "@expo/vector-icons";
import ButtonSignup from "../landing/ButtonLanding.js";

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
    Keyboard.dismiss();

    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

    // Validate email
    if (!email || !emailRegex.test(email)) {
      setEmailError("Invalid email");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Validate password
    if (!password) {
      setPasswordError("Password required");
      isValid = false;
    } else {
      setPasswordError("");
    }

    // Validate password confirmation
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    if (isValid) {
      // TODO: back-end signup logic
    }
  };

  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        titleFont: require("../../assets/fonts/Inter-Bold.ttf"),
        subHeaderFont: require("../../assets/fonts/Inter-Regular.ttf"),
        textFont: require("../../assets/fonts/Inter-Medium.ttf"),
      });
      setFontLoaded(true);
    };
    loadFont();
  }, []);

  return (
    <View style={styles.screen}>
      <View style={styles.headerContainer}>
        <Text
          style={[
            styles.headerText,
            fontLoaded ? { fontFamily: "titleFont" } : {},
          ]}
        >
          Sign Up
        </Text>
        <Text
          style={[
            styles.subHeaderText,
            fontLoaded ? { fontFamily: "subHeaderFont" } : {},
          ]}
        >
          Please sign up to continue.
        </Text>
      </View>
      <View style={styles.fields}>
        <View
          style={[
            styles.inputWrapper,
            emailError ? styles.inputWrappererror : null,
          ]}
        >
          <MaterialIcons
            name="email"
            size={20}
            color={emailError ? "#ff7770" : "gray"}
            style={styles.iconForm}
          />
          <TextInput
            style={[
              styles.input,
              emailError ? styles.inputError : null,
              fontLoaded ? { fontFamily: "textFont" } : {},
            ]}
            placeholder="EMAIL"
            name="email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setEmailError("");
            }}
            onFocus={() => {
              setEmailError("");
            }}
            inputMode="email"
            autoCapitalize="none"
            autoCorrect={false}
            mode="outlined"
          />
        </View>
        <Text
          style={[
            styles.errorText,
            fontLoaded ? { fontFamily: "textFont" } : {},
          ]}
        >
          {emailError}
        </Text>

        <View
          style={[
            styles.inputWrapper,
            passwordError || confirmPasswordError
              ? styles.inputWrappererror
              : null,
          ]}
        >
          <MaterialIcons
            name="lock"
            size={20}
            color={passwordError || confirmPasswordError ? "#ff7770" : "gray"}
            style={styles.iconForm}
          />
          <TextInput
            style={[
              styles.input,
              passwordError || confirmPasswordError ? styles.inputError : null,
              fontLoaded ? { fontFamily: "textFont" } : {},
            ]}
            placeholder="PASSWORD"
            name="password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setPasswordError("");
              setConfirmPasswordError("");
            }}
            onFocus={() => {
              setPasswordError("");
              setConfirmPasswordError("");
            }}
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            mode="outlined"
          />
        </View>
        <Text
          style={[
            styles.errorText,
            fontLoaded ? { fontFamily: "textFont" } : {},
          ]}
        >
          {passwordError}
        </Text>
        <View
          style={[
            styles.inputWrapper,
            confirmPasswordError ? styles.inputWrappererror : null,
          ]}
        >
          <MaterialIcons
            name="lock"
            size={20}
            color={confirmPasswordError ? "#ff7770" : "gray"}
            style={styles.iconForm}
          />
          <TextInput
            style={[
              styles.input,
              passwordError ? styles.inputError : null,
              fontLoaded ? { fontFamily: "textFont" } : {},
            ]}
            placeholder="CONFIRM PASSWORD"
            name="confirm-password"
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              setConfirmPasswordError("");
            }}
            onFocus={() => {
              setConfirmPasswordError("");
            }}
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            mode="outlined"
          />
        </View>
        <Text
          style={[
            styles.errorText,
            fontLoaded ? { fontFamily: "textFont" } : {},
          ]}
        >
          {confirmPasswordError}
        </Text>
        {/* Animated Signup button */}
        <ButtonSignup title="SIGN UP" onPress={handleSignup} />

        {/* Link to switch to login */}
        <Pressable style={styles.signupContainer} onPress={onSwitch}>
          <Text
            style={[
              styles.signupText,
              fontLoaded ? { fontFamily: "textFont" } : {},
            ]}
          >
            Already have an account?{" "}
            <Text
              style={[
                styles.signup,
                fontLoaded ? { fontFamily: "textFont" } : {},
              ]}
            >
              Sign in!
            </Text>
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Signup;
