import React, { useState, useEffect, useRef } from "react";
import {
  Animated,
  Pressable,
  Text,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

import * as Font from "expo-font";

// Get the width of the current device's screen
const screenWidth = Dimensions.get("window").width;
// Calculate the translation value as half of the screen width, intended for the shine animation
const translateValue = screenWidth * 0.5;

// Animated button component with a shiny effect for landing pages
const ButtonLanding = ({ title, onPress, showIcon = true, style }) => {
  // Initial scaling value for the button's press-in animation
  const scaleValue = new Animated.Value(1);

  // Animation function for when the button is pressed in
  const animatePressIn = () => {
    Animated.timing(scaleValue, {
      toValue: 0.95,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  // Animation function for when the button is released
  const animatePressOut = () => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  // State to track if the custom font has loaded
  const [fontLoaded, setFontLoaded] = useState(false);

  // Reference for the position of the shine effect
  const shinePosition = useRef(new Animated.Value(-1)).current;

  // Animation function for the shine effect
  const animateShine = () => {
    shinePosition.setValue(-translateValue);
    Animated.timing(shinePosition, {
      toValue: screenWidth * 0.5 + translateValue,
      duration: 600,
      useNativeDriver: true,
    }).start();
  };

  // Effect to load custom fonts when the component mounts
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

  // Effect to initiate the shine animation when the component mounts
  useEffect(() => {
    animateShine();
  }, []);

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      <LinearGradient
        colors={["#F8B951", "#FCA63C"]}
        style={styles.button}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Pressable
          onPress={onPress}
          onPressIn={animatePressIn}
          onPressOut={animatePressOut}
          style={[styles.buttonContent, style]}
        >
          <Text
            style={[
              styles.buttonText,
              fontLoaded ? { fontFamily: "textFont" } : {},
            ]}
          >
            {title}
          </Text>
          {showIcon && (
            <MaterialIcons
              name="arrow-forward-ios"
              size={20}
              color="white"
              style={styles.arrow}
            />
          )}
        </Pressable>
        <Animated.View
          pointerEvents="none"
          style={[
            styles.shine,
            {
              transform: [
                { translateX: shinePosition },
                { perspective: 800 },
                { scaleX: 2 },
                { rotate: "45deg" },
              ],
            },
          ]}
        />
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 30,
    alignSelf: "flex-end",
    textAlign: "center",
    borderRadius: 50,
    elevation: 5, // for Android
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    overflow: "hidden",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  shine: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "140%",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  arrow: {
    marginLeft: 10,
  },
});

export default ButtonLanding;
