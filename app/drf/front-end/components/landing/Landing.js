import React, { useRef } from "react";
import {
  ImageBackground,
  Animated,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Dimensions,
  SafeAreaView,
} from "react-native";

import Login from "../login/Login";
import Signup from "../Signup/Signup.js";
import logo from "../../assets/logo.png";
import styles from "./LandingStyle";

// Background image and screen width constants
const backgroundImage = require("../../assets/wave.png");
const { width } = Dimensions.get("window");
const { height } = Dimensions.get("screen");

const Landing = ({ navigation }) => {
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
    <SafeAreaView style={{ flex: 1 }}>
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
            centerContent={true}
          >
            {/* Background image */}
            <ImageBackground
              source={backgroundImage}
              resizeMode="cover"
              style={styles.backgroundImage}
            >
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
                <View style={{ width: width }}>
                  <Login onSwitch={animateToSignup} navigation={navigation} />
                </View>
                {/* Signup component */}
                <View style={{ width: width, height: height }}>
                  <Signup onSwitch={animateToLogin} />
                </View>
              </Animated.View>
            </ImageBackground>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default Landing;
