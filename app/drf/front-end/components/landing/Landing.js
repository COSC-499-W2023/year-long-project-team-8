import React, { useState, useRef, useEffect } from "react";
import {
  ImageBackground,
  Image,
  Animated,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Dimensions,
} from "react-native";

import Login from "../login/Login";
import Signup from "../Signup/Signup.js";
import logo from "../../assets/logo.png";
import styles from "./LandingStyle";

// Background image and screen width constants
const backgroundImage = require("../../assets/wave.png");
const { width } = Dimensions.get("window");

const Landing = () => {
  // Ref for the animated value for the translation along X-axis
  const translateXValue = useRef(new Animated.Value(width / 2)).current;

  // Animation to show Signup screen
  const animateToSignup = () => {
    Animated.timing(translateXValue, {
      toValue: -width / 2,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // Animation to show Login screen
  const animateToLogin = () => {
    Animated.timing(translateXValue, {
      toValue: width / 2,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.screen}>
      {/* Component to avoid overlapping the keyboard */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {/* Vertical scroll view to accommodate Login and Signup screens when keyboard is covering screen*/}
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {/* Background image */}
          <ImageBackground
            source={backgroundImage}
            resizeMode="cover"
            style={styles.backgroundImage}
          >
            {/* Application logo */}
            <Image source={logo} resizeMode="cover" style={styles.logoImage} />

            {/* Animated container holding both Login and Signup */}
            <Animated.View
              style={{
                flexDirection: "row",
                width: width * 2,
                transform: [
                  {
                    translateX: translateXValue,
                  },
                ],
              }}
            >
              {/* Login component */}
              <Login onSwitch={animateToSignup} />
              {/* Signup component */}
              <Signup onSwitch={animateToLogin} />
            </Animated.View>
          </ImageBackground>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Landing;
