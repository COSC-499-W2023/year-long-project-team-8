import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Pressable,
  Keyboard,
  Modal,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as Font from "expo-font";
import LoginStyles from "./LoginStyles";
import ButtonLogin from "./ButtonLanding";
import InputField from "./InputField";
import { Linking } from 'react-native';

import { baseEndpoint } from '../../config/config';
import AuthContext from "../../context/AuthContext";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Login component for user authentication
const Login = ({ onSwitch, navigation }) => {
  // Local state variables to manage email and password input values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State variables for validation error messages
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [authError, setAuthError] = useState("");
  const [isForgotPasswordModalVisible, setForgotPasswordModalVisible] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');

  //State variable for show password
  const [showPassword, setShowPassword] = useState(false);

  const { loginUser } = useContext(AuthContext);

  // new login call from AuthContext - can refactor to include the front end validation
  const login = async () => {
    await loginUser(email, password); // loginUser should return a Promise
    navigation.navigate("Tabs");
  };
   // Handle opening and closing the forgot password modal
   const handleOpenForgotPasswordModal = () => {
    setForgotPasswordModalVisible(true);
  };

  const handleCloseForgotPasswordModal = () => {
    setForgotPasswordModalVisible(false);
  };

  // Handle sending forgot password email
  const handleForgotPassword = async () => {
    try {
      // Make API call to initiate password reset
      const response = await fetch(`${baseEndpoint}/auth/forgot-password/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: forgotPasswordEmail}),
      });
  
      const responseData = await response.json();
  
      if (response.ok) {
        // Password reset email sent successfully
        console.log('Password reset email sent successfully');
      } else {
        // Handle error response
        console.error('Error:', responseData);
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Network error:', error);
    } finally {
      // Close the modal after handling the forgot password logic
      setForgotPasswordModalVisible(false);
    }
  };  
  //jwt token endpoint
  const loginEndpoint = `${baseEndpoint}/token/`;

  const handleLogin = async () => {
    let isValid = true;
    Keyboard.dismiss();

    // Regex pattern to validate email address format
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

    // If the provided email and password are valid, add login logic
    if (isValid) {

      try {
        let bodyObj = {
          email: email,
          password: password,
        };

        // need to pass the data as JSON for our API to deal with
        const bodyStr = JSON.stringify(bodyObj);
        //console.log(bodyStr);
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: bodyStr,
        };

        const response = await fetch(loginEndpoint, options);
        //console.log(response);
        const authData = await response.json();

        if (authData && authData.access) {
          await loginUser(email, password);
          navigation.navigate("MainApp");
          //navigation.navigate("Tabs");
          // handleAuthData(authData, getProductList);
        } else {
          if (password && email) setAuthError("Wrong email or password");
        }
      } catch (err) {
        console.log("err", err);
      }
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
        <View style={LoginStyles.headerContainer}>
          <Text
            style={[
              LoginStyles.headerText,
              fontLoaded ? { fontFamily: "titleFont" } : {},
            ]}
          >
            Login
          </Text>
          <Text
            style={[
              LoginStyles.subHeaderText,
              fontLoaded ? { fontFamily: "subHeaderFont" } : {},
            ]}
          >
            Hungry or emptying space in the fridge?
          </Text>
        </View>

        <View style={LoginStyles.fields}>
          <InputField
            icon={"email"}
            placeholder="email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setEmailError("");
              setAuthError("");
            }}
            onFocus={() => {
              setAuthError("");
              setEmailError("");
            }}
            errorText={emailError}
            inputMode="email"
            autoCapitalize="none"
            autoCorrect={false}
            name="email"
          />

          <InputField
            icon={"lock"}
            placeholder="password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setPasswordError("");
              setAuthError("");
            }}
            onFocus={() => {
              setAuthError("");
              setPasswordError("");
            }}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            autoCorrect={false}
            name="password"
            rightComponent={
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
            }
            errorText={passwordError || authError}
          />

          <ButtonLogin title="LOGIN" onPress={handleLogin} />
          {/* <ButtonLogin title="LOGIN" onPress={login} /> */}
          <Pressable style={LoginStyles.signupContainer} onPress={onSwitch}>
            <Text
              style={[
                LoginStyles.signupText,
                fontLoaded ? { fontFamily: "textFont" } : {},
              ]}
            >
              Don't have an account?{" "}
              <Text
                style={[
                  LoginStyles.signup,
                  fontLoaded ? { fontFamily: "textFont" } : {},
                ]}
              >
                Sign up!
              </Text>
            </Text>
          </Pressable>
          <Pressable
          style={LoginStyles.forgotPasswordContainer}
          onPress={handleOpenForgotPasswordModal}
        >
          <Text style={LoginStyles.forgotPasswordText}>Forgot password?</Text>
        </Pressable>
        </View>
         {/* Forgot Password Modal */}
         <Modal
          animationType="slide"
          transparent={true}
          visible={isForgotPasswordModalVisible}
          onRequestClose={handleCloseForgotPasswordModal}
        >
          <View style={LoginStyles.forgotPasswordModalContainer}>
            <View style={LoginStyles.forgotPasswordModalContent}>
              <Text style={LoginStyles.forgotPasswordModalHeader}>Forgot Password?</Text>
              <InputField
                style={LoginStyles.forgotPasswordModalInput}
                placeholder="Enter your email"
                onChangeText={(text) => setForgotPasswordEmail(text)}
                value={forgotPasswordEmail}
              />
              <Pressable
                style={LoginStyles.forgotPasswordModalButton}
                onPress={handleForgotPassword}
              >
                <Text style={LoginStyles.forgotPasswordModalButtonText}>Send Instructions</Text>
              </Pressable>
              <Pressable
                style={LoginStyles.forgotPasswordModalCloseButton}
                onPress={handleCloseForgotPasswordModal}
              >
                <Text style={LoginStyles.forgotPasswordModalCloseButtonText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
    
  );
};

export default Login;

// below is added functions to test
function getProductList() {
  const endpoint = `${baseEndpoint}/products/`;
  const options = getFetchOptions();
  fetch(endpoint, options)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const validData = isTokenNotValid(data);
      if (validData) {
        console.log(data);
        //writeToContainer(data) // uses writeToContainer to display the product list
      }
    });
}

// new function for react native asynctorage
async function handleAuthData(authData, callback) {
  try {
    await AsyncStorage.setItem("access", authData.access);
    await AsyncStorage.setItem("refresh", authData.refresh);

    if (callback) {
      callback();
    }
  } catch (error) {
    // Handle errors here, e.g., by logging or displaying an error message.
    console.error("Error storing data in AsyncStorage:", error);
  }
}
// function handleAuthData(authData, callback) {
//   localStorage.setItem("access", authData.access);
//   localStorage.setItem("refresh", authData.refresh);
//   if (callback) {
//     callback();
//   }
// }

// new function for asyncstorage in react native
async function getFetchOptions(method, body) {
  const accessToken = await AsyncStorage.getItem("access");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken || ""}`, // Use an empty string if access token is not found
  };

  return {
    method: method === null ? "GET" : method,
    headers,
    body: body ? body : null,
  };
}
// function getFetchOptions(method, body) {
//   return {
//     method: method === null ? "GET" : method,
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${localStorage.getItem("access")}`, //access token!
//     },
//     body: body ? body : null,
//   };
// }
function isTokenNotValid(jsonData) {
  if (jsonData.code && jsonData.code === "token_not_valid") {
    // run a refresh token fetch
    alert("Please login again");
    return false;
  }
  return true;
}

// function validateJWTToken() {
//   // fetch
//   const endpoint = `${baseEndpoint}/token/verify/`
//   const options = {
//       method: "POST",
//       headers: {
//           "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//           token: localStorage.getItem('access')
//       })
//   }
//   fetch(endpoint, options)
//   .then(response=>response.json())
//   .then(x=> {
//       // refresh token
//   })
// }
// validateJWTToken()
