import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Pressable,
  ImageBackground,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import LoginStyles from "./LoginStyles";
import InputField from "./InputField";
import PasswordStrengthBar from "./PasswordStrengthBar";
import ChecklistModal from "./ChecklistModal";
import ButtonSignup from "./ButtonLanding";
import CustomText from "../CustomText";

const PasswordResetScreen = ({ navigation }) => {
  const [reset_code, setCode] = useState("");
  const [password, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isChecklistModalVisible, setChecklistModalVisible] = useState(false);
  const baseEndpoint = "http://passtheplate.pythonanywhere.com/api";

  // Password validation criteria
  const hasUpperCase = (password) => /[A-Z]/.test(password);
  const hasLowerCase = (password) => /[a-z]/.test(password);
  const hasDigits = (password) => /\d/.test(password);
  const hasSpecialChars = (password) =>
    /[!@#$%^&*(),.?":{}|<>~`_+\-=\[\]\\';\/]/.test(password);
  const isLongEnough = (password) => password.length >= 8;

  // Combined password validation check
  const isPasswordValid = (password) => {
    return (
      hasUpperCase(password) &&
      hasLowerCase(password) &&
      hasDigits(password) &&
      hasSpecialChars(password) &&
      isLongEnough(password)
    );
  };

  const handleResetPassword = async () => {
    try {
      // Check if the password field is empty
      // Validate password
      if (!isPasswordValid(password)) {
        setErrorMessage("Password doesn't meet the requirements");
        +setChecklistModalVisible(true);
        return;
      }

      // Check if the passwords match
      if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match");
        setSuccessMessage("");
        return;
      }

      //api call
      const response = await fetch(`${baseEndpoint}/auth/reset-password/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reset_code, password }),
      });

      if (response.ok) {
        setSuccessMessage("Password reset successful");
        setErrorMessage("");
        navigation.navigate("Landing");
      } else {
        const errorResponse = await response.json();
        setErrorMessage(`Error with entered code. Try again`);
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Network or other error:", error);
      setErrorMessage("Invalid code. Try again");
      setSuccessMessage("");
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/wave.png")}
      style={{ flex: 1, backgroundColor: "white" }}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        style={{ flex: 1, paddingTop: 50 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={LoginStyles.headerContainer}>
            <CustomText style={LoginStyles.headerText}>
              Password Reset
            </CustomText>
            <CustomText style={LoginStyles.subHeaderText}>
              Enter your code and create a new password.
            </CustomText>
          </View>

          <View style={LoginStyles.fields}>
            <InputField
              icon="email"
              placeholder="Enter code"
              value={reset_code}
              onChangeText={(text) => {
                setCode(text);
                setErrorMessage(""); // Clear error message
                setChecklistModalVisible(false); // Hide checklist modal
              }}
            />

            <InputField
              icon="lock"
              placeholder="Enter new password"
              value={password}
              onChangeText={(text) => {
                setNewPassword(text);
                setErrorMessage(""); // Clear error message
                setChecklistModalVisible(false); // Hide checklist modal
              }}
              secureTextEntry={!showPassword}
              rightComponent={
                <View style={{ flexDirection: "row" }}>
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
                    <MaterialIcons name="info-outline" size={25} color="gray" />
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
              onChangeText={(text) => {
                setConfirmPassword(text);
                setErrorMessage(""); // Clear error message
                setChecklistModalVisible(false); // Hide checklist modal
              }}
              secureTextEntry={!showPassword}
            />
            {successMessage ? (
              <CustomText style={{ color: "green" }}>
                {successMessage}
              </CustomText>
            ) : null}
            {errorMessage ? (
              <CustomText style={LoginStyles.forgotPasswordModalError}>
                {errorMessage}
              </CustomText>
            ) : null}
            <ButtonSignup
              title="Reset Password"
              onPress={handleResetPassword}
            />
            <Pressable
              style={LoginStyles.backButton}
              onPress={() => navigation.navigate("Landing")}
            >
              <CustomText style={LoginStyles.backButton} fontType="text">
                BACK
              </CustomText>
            </Pressable>
          </View>
        </ScrollView>
        <ChecklistModal
          password={password}
          isVisible={isChecklistModalVisible}
          onClose={() => setChecklistModalVisible(false)}
        />
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default PasswordResetScreen;
