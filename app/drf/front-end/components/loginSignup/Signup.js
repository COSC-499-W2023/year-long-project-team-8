
import React, { useState, useImperativeHandle, forwardRef, useEffect, useContext } from 'react';
import {
  View,
  Text,
  Pressable,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import * as Font from "expo-font";
import styles from "./LoginStyles";
import { MaterialIcons } from "@expo/vector-icons";
import ButtonSignup from "./ButtonLanding";
import InputField from "./InputField";
import { baseEndpoint } from '../../config/config';
import PasswordStrengthBar from "./PasswordStrengthBar";
import ChecklistModal from "./ChecklistModal";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from '../../context/AuthContext'

const tokenEndpoint = `${baseEndpoint}/token/`;
const signUpEndpoint = `${baseEndpoint}/users/`;

const Signup = forwardRef(({ onSwitch, navigation }, ref) => {
  // State for form fields
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // State for form field errors
  const [signupEmailError, setSignupEmailError] = useState("");
  const [signupPasswordError, setSignupPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [isEmailErrorIcon, setIsEmailErrorIcon] = useState(false);
  const [isPassErrorIcon, setIsPassErrorIcon] = useState(false);
  const [isConfPassErrorIcon, setIsConfPassErrorIcon] = useState(false);
  const [isChecklistModalVisible, setChecklistModalVisible] = useState(false);


  const { loginUser } = useContext(AuthContext);

  // Password validation criteria
  const hasUpperCase = (password) => /[A-Z]/.test(password);
  const hasLowerCase = (password) => /[a-z]/.test(password);
  const hasDigits = (password) => /\d/.test(password);
  const hasSpecialChars = (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isLongEnough = (password) => password.length >= 8;

  // Combined password validation check
  const isPasswordValid = (password) => {
    return hasUpperCase(password) && hasLowerCase(password) && hasDigits(password) && hasSpecialChars(password) && isLongEnough(password);
  };


  // Function to reset form fields
  const resetFields = () => {
    // Reset error states and icons
    setSignupEmailError("");
    setSignupPasswordError("");
    setConfirmPasswordError("");
    setIsEmailErrorIcon(false);
    setIsPassErrorIcon(false);
    setIsConfPassErrorIcon(false);
    setSignupEmail("");
    setSignupPassword("");
    setConfirmPassword("");
  };

  // Export the reset function for the parent to call
  useImperativeHandle(ref, () => ({
    resetFields,
  }));

  // Function to handle signup validation and submission

  //TODO: Check if email is already in use
  const handleSignup = async () => {
    let isValid = true;
    Keyboard.dismiss();

    // Reset error states and icons
    setSignupEmailError("");
    setSignupPasswordError("");
    setConfirmPasswordError("");
    setIsEmailErrorIcon(false);
    setIsPassErrorIcon(false);
    setIsConfPassErrorIcon(false);

    // Validate email
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!signupEmail.trim() || !emailRegex.test(signupEmail.trim())) {
      setSignupEmailError("Invalid email");
      setIsEmailErrorIcon(true);
      isValid = false;
    }

    // Validate password
    if (!isPasswordValid(signupPassword)) {
      setSignupPasswordError("Password doesn't meet the requirements");
      setIsPassErrorIcon(true);
      setChecklistModalVisible(true);
      isValid = false;
    }

    // Validate confirm password - Check both that it's not empty and matches the password
    if (!confirmPassword || signupPassword !== confirmPassword) {
      setConfirmPasswordError(confirmPassword ? "Passwords do not match" : "Confirm password is required");
      setIsConfPassErrorIcon(true);
      isValid = false;
    }

    if (isValid) {
      try {
        // Create user account
        const createUserResponse = await fetch(signUpEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: signupEmail,
            password: signupPassword,
          }),
        });

        if (!createUserResponse.ok) {
          throw new Error("Error creating user account");
        }

        // Fetch token for the created user
        const tokenResponse = await fetch(tokenEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: signupEmail,
            password: signupPassword,
          }),
        });

        if (!tokenResponse.ok) {
          throw new Error("Error fetching token");
        }
        //Retrieving token data for user
        const tokenData = await tokenResponse.json();
        const receivedToken = tokenData.access;

        //Parsing respone to get userId
        const userData = await createUserResponse.json();
        const userId = extractUserIdFromUrl(userData.url);

        // Store the token and navigate to the Details screen
        AsyncStorage.setItem('user_id', userId.toString());
        AsyncStorage.setItem('access_token', receivedToken);
        AsyncStorage.setItem('authTokens', JSON.stringify(tokenData));
       // navigation.navigate("Details", { userId, accessToken: receivedToken });
       loginUser(signupEmail,signupPassword);
       resetFields();
        navigation.navigate("Details");

      } catch (error) {
        console.log("Error during signup:", error);
        setConfirmPasswordError("Something went wrong")
      }
    }
  };

  // Function to extract userId from the URL
  const extractUserIdFromUrl = (url) => {
    const idRegex = /\/users\/(\d+)\//;
    const match = url.match(idRegex);
    return match && match[1] ? parseInt(match[1], 10) : null;
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
    <KeyboardAvoidingView
      style={{ flex: 1, paddingTop: 30 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
        }}
        keyboardShouldPersistTaps="handled"
      >
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
            Create and account and join the community!
          </Text>
        </View>

        <View style={styles.fields}>
          <InputField
            icon="email"
            placeholder="email"
            value={signupEmail}
            onChangeText={(text) => {
              setSignupEmail(text.trim());
              setSignupEmailError("");
              setIsEmailErrorIcon(false);
            }}
            onFocus={() => {
              setSignupEmailError("");
              setIsEmailErrorIcon(false);
            }}
            inputMode="email"
            autoCapitalize="none"
            autoCorrect={false}
            name="email"
            errorText={signupEmailError}
            isErrorIcon={isEmailErrorIcon}
          />

          <InputField
            icon="lock"
            placeholder="password"
            value={signupPassword}
            onChangeText={(text) => {
              setSignupPassword(text);
              setSignupPasswordError("");
              setConfirmPasswordError("");
              setIsPassErrorIcon(false);
              setChecklistModalVisible(false); // Hide checklist modal when user starts typing
            }}
            onFocus={() => {
              setSignupPasswordError("");
              setConfirmPasswordError("");
              setIsPassErrorIcon(false);
            }}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            autoCorrect={false}
            name="password"
            rightComponent={
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Pressable
                  onPress={() => setShowPassword(!showPassword)}
                  style={{ marginRight: 10 }}
                  testID="password-visibility-icon"
                >
                  <MaterialIcons
                    name={showPassword ? "visibility" : "visibility-off"}
                    size={25}
                    color="gray"
                  />
                </Pressable>
                <Pressable
                  onPress={() => setChecklistModalVisible(true)}
                  testID="password-info-icon"
                >
                  <MaterialIcons
                    name="info-outline"
                    size={25}
                    color="gray"
                  />
                </Pressable>
              </View>
            }
            errorText={signupPasswordError}
            isErrorIcon={isPassErrorIcon}
          />

          <ChecklistModal
            password={signupPassword}
            isVisible={isChecklistModalVisible}
            onClose={() => setChecklistModalVisible(false)}
          />

          <PasswordStrengthBar password={signupPassword} />

          <InputField
            icon="lock"
            placeholder="confirm password"
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              setConfirmPasswordError("");
              setIsConfPassErrorIcon(false);
            }}
            onFocus={() => {
              setConfirmPasswordError("");
              setIsConfPassErrorIcon(false);
            }}
            autoCapitalize="none"
            secureTextEntry={true}
            autoCorrect={false}
            name="confirmPassword"
            errorText={confirmPasswordError}
            isErrorIcon = {isConfPassErrorIcon}

          />

          <ButtonSignup title="SIGN UP" onPress={handleSignup} />

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
      </ScrollView>
    </KeyboardAvoidingView>
  );
});

export default Signup;