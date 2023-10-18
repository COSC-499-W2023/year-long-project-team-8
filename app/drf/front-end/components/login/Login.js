import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  Animated,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Font from "expo-font";
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
  const [authError, setAuthError] = useState("");

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
            navigation.navigate("HomePage", { username: email });
            handleAuthData(authData, getProductList);
          } else {
            if (password && email) setAuthError("*Wrong email or password");
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
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={styles.headerContainer}>
          <Text
            style={[
              styles.headerText,
              fontLoaded ? { fontFamily: "customFont" } : {},
            ]}
          >
            Login
          </Text>
          <Text
            style={[
              styles.subHeaderText,
              fontLoaded ? { fontFamily: "subHeaderFont" } : {},
            ]}
          >
            Please sign in to continue.
          </Text>
        </View>

        <View style={styles.fields}>
          <View style={styles.inputWrapper}>
            <MaterialIcons
              name="email"
              size={20}
              color="gray"
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
              onFocus={() => setAuthError("")}
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

          <View style={styles.inputWrapper}>
            <MaterialIcons
              name="lock"
              size={20}
              color="gray"
              style={styles.iconForm}
            />
            <TextInput
              style={[
                styles.input,
                passwordError ? styles.inputError : null,
                fontLoaded ? { fontFamily: "textFont" } : {},
              ]}
              placeholder="PASSWORD"
              name="password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setPasswordError("");
              }}
              onFocus={() => setAuthError("")}
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}
              mode="outlined"
            />
            <Pressable style={styles.forgotPasswordContainer}>
              <Text style={styles.forgotPasswordText}>Forgot?</Text>
            </Pressable>
          </View>
          <Text
            style={[
              styles.errorText,
              fontLoaded ? { fontFamily: "textFont" } : {},
            ]}
          >
            {passwordError}
          </Text>

          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <Pressable
              onPress={handleLogin}
              onPressIn={animatePressIn}
              onPressOut={animatePressOut}
            >
              <LinearGradient
                colors={["#F8B951", "#FCA63C"]}
                style={styles.button}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <View style={styles.buttonContent}>
                  <Text
                    style={[
                      styles.buttonText,
                      fontLoaded ? { fontFamily: "textFont" } : {},
                    ]}
                  >
                    LOGIN
                  </Text>
                  <MaterialIcons
                    name="arrow-forward-ios"
                    size={20}
                    color="white"
                    style={styles.arrow}
                  />
                </View>
              </LinearGradient>
            </Pressable>
          </Animated.View>
          <Pressable style={styles.signupContainer} onPress={onSwitch}>
            <Text
              style={[
                styles.signupText,
                fontLoaded ? { fontFamily: "textFont" } : {},
              ]}
            >
              Don't have an account?{" "}
              <Text
                style={[
                  styles.signup,
                  fontLoaded ? { fontFamily: "textFont" } : {},
                ]}
              >
                Sign up!
              </Text>
            </Text>
          </Pressable>
        </View>
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
