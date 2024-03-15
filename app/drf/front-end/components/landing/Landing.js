import React, { useRef } from "react";
import { ImageBackground, Animated, View, Dimensions } from "react-native";
import Login from "../loginSignup/Login";
import Signup from "../loginSignup/Signup.js";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"; // Importing the library
import styles from "./LandingStyle";

// Background image and screen width constants
const backgroundImage = require("../../assets/wave.png");
const { width } = Dimensions.get("window");
const { height } = Dimensions.get("screen");

const Landing = ({ navigation }) => {
  const loginRef = useRef(null);
  const signupRef = useRef(null);

  // Ref for the animated value for the translation along X-axis
  const translateXValue = useRef(new Animated.Value(width / 2)).current;

  // Animation to show Signup screen
  const animateToSignup = () => {
    Animated.timing(translateXValue, {
      toValue: -width / 2,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      if (loginRef.current) {
        loginRef.current.resetFields();
      }
    });
  };

  // Animation to show Login screen
  const animateToLogin = () => {
    Animated.timing(translateXValue, {
      toValue: width / 2,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      if (signupRef.current) {
        signupRef.current.resetFields();
      }
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.screen}>
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={{ flexGrow: 1 }}
          scrollEnabled={true}
          centerContent={true}
        >
          <ImageBackground
            source={backgroundImage}
            resizeMode="cover"
            style={styles.backgroundImage}
          >
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
              <View style={{ width: width }}>
                <Login
                  onSwitch={animateToSignup}
                  navigation={navigation}
                  ref={loginRef}
                />
              </View>
              <View style={{ width: width, height: height }}>
                <Signup
                  onSwitch={animateToLogin}
                  navigation={navigation}
                  ref={signupRef}
                />
              </View>
            </Animated.View>
          </ImageBackground>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

export default Landing;
