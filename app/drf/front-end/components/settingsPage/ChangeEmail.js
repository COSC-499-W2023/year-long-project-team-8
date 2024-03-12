import React, { useState, useEffect, useContext } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  StyleSheet,
} from "react-native";
import InputField from "../loginSignup/InputField";
import AuthContext from "../../context/AuthContext";
import { updateUserData, getUserData } from "../helperFunctions/apiHelpers";
import ButtonSignup from "../loginSignup/ButtonLanding";
import CustomText from "../CustomText";

const ChangeEmail = ({ navigation }) => {
  const [currentEmail, setCurrentEmail] = useState("");
  const [existingEmail, setExistingEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { authTokens, userId } = useContext(AuthContext);

  const isEmailValid = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleChangeEmail = async () => {
    // Check if any field is empty
    if (!currentEmail || !newEmail) {
      setErrorMessage("Please fill in all fields");
      return;
    }
    // Validate the current email format
    if (!isEmailValid(currentEmail)) {
      setErrorMessage("Invalid current email format");
      return;
    }
    //valide entered email with backend
    if(currentEmail !== existingEmail){
      setErrorMessage("Current email is not valid");
      return;
    }

    // Validate the new email format
    if (!isEmailValid(newEmail)) {
      setErrorMessage("Invalid new email format");
      return;
    }

    try {
      // Call updateUserData to update the email
      const updatedData = await updateUserData(userId, authTokens, {
        email: newEmail,
      });
  
      console.log("Email changed successfully");
      setErrorMessage("");
      navigation.goBack();
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Something went wrong while updating email");
    }
  };

  // Reset all fields and errors when the user leaves the screen
  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      setCurrentEmail("");
      setNewEmail("");
      setErrorMessage("");
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    getUserData(userId, authTokens)
      .then((data) => {
        setExistingEmail(data?.email || "");
      })
      .catch((error) => {
        console.log("Error fetching user data: ", error);
      });
  }, [userId, authTokens]);

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
            <CustomText style={styles.headerText}>Change Email</CustomText>
          </View>

          <View style={styles.fields}>
            <InputField
              icon="email"
              placeholder="Current Email"
              value={currentEmail}
              onChangeText={setCurrentEmail}
              keyboardType="email-address"
            />

            <InputField
              icon="email"
              placeholder="New Email"
              value={newEmail}
              onChangeText={setNewEmail}
              keyboardType="email-address"
            />

            {errorMessage ? (
              <CustomText style={styles.errorMessage}>
                {errorMessage}
              </CustomText>
            ) : null}

            <ButtonSignup title="Change Email" onPress={handleChangeEmail} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default ChangeEmail;

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
  errorMessage: {
    color: "red",
    marginTop: 10,
  },
});
