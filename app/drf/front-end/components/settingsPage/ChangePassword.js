import React, { useState, useEffect, useContext } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Toast from "react-native-root-toast";
import InputField from "../loginSignup/InputField";
import PasswordStrengthBar from "../loginSignup/PasswordStrengthBar";
import { changePassword, getUserData } from "../helperFunctions/apiHelpers";
import ChecklistModal from "../loginSignup/ChecklistModal";
import ButtonSignup from "../loginSignup/ButtonLanding";
import CustomText from "../CustomText";
import AuthContext from "../../context/AuthContext";

const ChangePassword = ({ navigation }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [existingEmail, setExistingEmail] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isChecklistModalVisible, setChecklistModalVisible] = useState(false);
  const { authTokens, userId } = useContext(AuthContext);

  // Password validation criteria
  const hasUpperCase = (password) => /[A-Z]/.test(password);
  const hasLowerCase = (password) => /[a-z]/.test(password);
  const hasDigits = (password) => /\d/.test(password);
  const hasSpecialChars = (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isLongEnough = (password) => password.length >= 8;

  // Reset all fields and errors when the user leaves the screen
  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setErrorMessage("");
      setShowPassword(false);
      setChecklistModalVisible(false);
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (authTokens) {
      getUserData(userId, authTokens)
        .then((data) => {
          setExistingEmail(data?.email || "");
        })
        .catch((error) => {
          console.log("Error fetching user data: ", error);
        });
    }
  }, [userId, authTokens]);

  const showToastSuccess = (message) => {
    Toast.show(message, {
      duration: Toast.durations.SHORT,
      position: Toast.positions.TOP,
      shadow: true,
      animation: true,
      hideOnPress: true,
      backgroundColor: "#D5FDCE",
      textColor: "black",
      opacity: 1,
    });
  };

  const handleChangePassword = async () => {
    // Trim the passwords
    const trimmedCurrentPassword = currentPassword.trim();
    const trimmedNewPassword = newPassword.trim();
    const trimmedConfirmNewPassword = confirmNewPassword.trim();

    // Check if any field is empty
    if (
      !trimmedCurrentPassword ||
      !trimmedNewPassword ||
      !trimmedConfirmNewPassword
    ) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    // Validate the new password
    if (!isPasswordValid(trimmedNewPassword)) {
      setErrorMessage("Password doesn't meet the requirements");
      setChecklistModalVisible(true);
      return;
    }

    // Check if the new password and confirm new password match
    if (trimmedNewPassword !== trimmedConfirmNewPassword) {
      setErrorMessage("New passwords do not match");
      return;
    }

    try {
      // Call changePassword to change the password
      await changePassword(
        existingEmail,
        trimmedCurrentPassword,
        trimmedNewPassword,
        authTokens
      );
      console.log("Password changed successfully");
      setErrorMessage("");
      showToastSuccess("Password changed successfully");
      navigation.goBack();
    } catch (error) {
      if (error.message === "Current password is incorrect") {
        setErrorMessage("Current password is incorrect");
      } else {
        console.error("Error changing password:", error);
        setErrorMessage("Something went wrong while changing the password");
      }
    }
  };

  const isPasswordValid = (password) => {
    return (
      hasUpperCase(password) &&
      hasLowerCase(password) &&
      hasDigits(password) &&
      hasSpecialChars(password) &&
      isLongEnough(password)
    );
  };

  return (
    <ImageBackground
      source={require("../../assets/wave.png")}
      style={styles.container}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
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
            <CustomText style={styles.headerText}>Reset Password</CustomText>
          </View>

          <View style={styles.fields}>
            <InputField
              icon="lock"
              placeholder="Current Password"
              value={currentPassword}
              onChangeText={setCurrentPassword}
              secureTextEntry={true}
            />

            <InputField
              icon="lock"
              placeholder="New Password"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry={!showPassword}
              rightComponent={
                <View style={{ flexDirection: "row" }}>
                  <Pressable
                    onPress={() => setShowPassword(!showPassword)}
                    style={{ marginRight: 10 }}
                  >
                    <MaterialIcons
                      name={showPassword ? "visibility" : "visibility-off"}
                      size={25}
                      color="gray"
                    />
                  </Pressable>
                  <Pressable onPress={() => setChecklistModalVisible(true)}>
                    <MaterialIcons name="info-outline" size={25} color="gray" />
                  </Pressable>
                </View>
              }
            />
            <PasswordStrengthBar password={newPassword} />

            <InputField
              icon="lock"
              placeholder="Confirm New Password"
              value={confirmNewPassword}
              onChangeText={setConfirmNewPassword}
              secureTextEntry={!showPassword}
            />

            {errorMessage ? (
              <CustomText style={styles.forgotPasswordModalError}>
                {errorMessage}
              </CustomText>
            ) : null}

            <ButtonSignup
              title="Change Password"
              onPress={handleChangePassword}
            />
          </View>

          <ChecklistModal
            password={newPassword}
            isVisible={isChecklistModalVisible}
            onClose={() => setChecklistModalVisible(false)}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffbf0",
  },
  headerContainer: {
    padding: 30,
  },
  headerText: {
    fontSize: 50,
    fontWeight: "700",
    color: "#1f1f1f",
  },
  fields: {
    paddingHorizontal: 30,
  },
  forgotPasswordModalError: {
    color: "red",
    marginTop: 10,
  },
});
