import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as Font from "expo-font";
import LoginStyles from "./LoginStyles";
import ButtonLogin from "./ButtonLanding";
import InputField from "./InputField";

// base endpoint
const baseEndpoint = "http://localhost:8000/api";
//const baseEndpoint = "http://ip:8000/api";

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
  const [authError, setAuthError] = useState("");

  //State variable for show password
  const [showPassword, setShowPassword] = useState(false);

  //jwt token endpoint
  const loginEndpoint = `${baseEndpoint}/token/`;

  // Function to handle login upon button press
  const handleLogin = () => {
    let isValid = true;
    Keyboard.dismiss();

    // Regex pattern to validate email address format
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

    // Validate email format
    if (!email || !emailRegex.test(email)) {
      setEmailError("Invalid email");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Check if password is provided
    if (!password) {
      setPasswordError("Password required");
      isValid = false;
    } else {
      setPasswordError("");
    }

    // If the provided email and password are valid, add login logic
    if (isValid) {
      // TODO: Implement back-end login logic here
      //console.log(email);
      //console.log(password);

      // here we are taking in the email field as username as this is the way authentication is used (username/pass)
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
      fetch(loginEndpoint, options) //  Promise
        .then((response) => {
          // console.log(response);
          return response.json();
        })
        .then((authData) => {
          if (authData && authData.access) {
            navigation.navigate("Tabs");
            handleAuthData(authData, getProductList);
          } else {
            if (password && email) setAuthError("Wrong email or password");
          }
        })
        .then((x) => {
          // console.log(x);
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
          <Pressable style={LoginStyles.forgotPasswordContainer}>
            <Text style={LoginStyles.forgotPasswordText}>Forgot password?</Text>
          </Pressable>

          <ButtonLogin title="LOGIN" onPress={handleLogin} />

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
        </View>
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
