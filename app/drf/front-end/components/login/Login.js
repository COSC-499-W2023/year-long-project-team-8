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

// base endpoint
const baseEndpoint = "http://localhost:8000/api";

// Login component for user authentication (original)
// const Login = ({ onSwitch }) => {
//   // Local state variables to manage email and password input values
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   // State variables for validation error messages
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");

//   // Function to handle login upon button press
//   const handleLogin = () => {
//     let isValid = true;

//     // Regex pattern to validate email address format
//     const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

//     // Validate email format
//     if (!email || !emailRegex.test(email)) {
//       setEmailError("*Invalid email");
//       isValid = false;
//     } else {
//       setEmailError("");
//     }

//     // Check if password is provided
//     if (!password) {
//       setPasswordError("*Password required");
//       isValid = false;
//     } else {
//       setPasswordError("");
//     }

//     // If the provided email and password are valid, add login logic
//     if (isValid) {
//       // TODO: Implement back-end login logic here
//     }
//   };

// Login component for user authentication
const Login = ({ onSwitch, navigation }) => {
  // Local state variables to manage email and password input values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State variables for validation error messages
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  //jwt token endpoint
  const loginEndpoint = `${baseEndpoint}/token/`;

  // Function to handle login upon button press
  const handleLogin = () => {
    let isValid = true;

    // Regex pattern to validate email address format
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

    // Validate email format
    // if (!email || !emailRegex.test(email)) {
    //   setEmailError("*Invalid email");
    //   isValid = false;
    // } else {
    //   setEmailError("");
    // }

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
      console.log(email);
      console.log(password);

      // here we are taking in the email field as username as this is the way authentication is used (username/pass)
      let bodyObj = {
        username: email,
        password: password,
      };

      // need to pass the data as JSON for our API to deal with
      const bodyStr = JSON.stringify(bodyObj);
      console.log(bodyStr);
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: bodyStr,
      };
      fetch(loginEndpoint, options) //  Promise
        .then((response) => {
          console.log(response);
          return response.json();
        })
        .then((authData) => {
          if (authData && authData.access) {
            navigation.navigate("HomePage");
            handleAuthData(authData, getProductList);
          } else {
            console.error("Authentication failed.");
          }
        })
        .then((x) => {
          console.log(x);
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  };

  //alternative handle login for testing
  //   function handleLogin(event) {
  //     console.log(event)
  //     event.preventDefault()
  //     const loginEndpoint = `${baseEndpoint}/token/` //jwt token endpoint
  //     let loginFormData = new FormData(loginForm)
  //     let loginObjectData = Object.fromEntries(loginFormData)
  //     let bodyStr = JSON.stringify(loginObjectData)
  //     const options = {
  //         method: "POST",
  //         headers: {
  //             "Content-Type": "application/json"
  //         },
  //         body: bodyStr
  //     }
  //     fetch(loginEndpoint, options) //  Promise
  //     .then(response=>{
  //         console.log(response)
  //         return response.json()
  //     })
  //     .then(authData => {
  //         handleAuthData(authData, getProductList) // use callback to get product list
  //     })
  //     .then(x => {
  //         console.log(x)
  //     })
  //     .catch(err=> {
  //         console.log('err', err)
  //     })
  // };

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
function handleAuthData(authData, callback) {
  localStorage.setItem("access", authData.access);
  localStorage.setItem("refresh", authData.refresh);
  if (callback) {
    callback();
  }
}
function getFetchOptions(method, body) {
  return {
    method: method === null ? "GET" : method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access")}`, //access token!
    },
    body: body ? body : null,
  };
}
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
