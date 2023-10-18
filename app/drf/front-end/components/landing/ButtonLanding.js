import React, { useState, useEffect, useRef } from "react";
import { Animated, Pressable, Text, View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

import * as Font from "expo-font";

const ButtonLogin = ({ title, onPress }) => {
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
        textFont: require("../../assets/fonts/Inter-Medium.ttf"),
      });
      setFontLoaded(true);
    };
    loadFont();
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
          style={styles.buttonContent} // Apply the style directly here
        >
          <Text
            style={[
              styles.buttonText,
              fontLoaded ? { fontFamily: "textFont" } : {},
            ]}
          >
            {title}
          </Text>
          <MaterialIcons
            name="arrow-forward-ios"
            size={20}
            color="white"
            style={styles.arrow}
          />
        </Pressable>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 30,
    alignSelf: "flex-end",
    textAlign: "center",
    width: "50%",
    borderRadius: 50,
    elevation: 5, // for Android
    shadowColor: "#000", // for iOS
    shadowOffset: { width: 0, height: 2 }, // for iOS
    shadowOpacity: 0.25, // for iOS
    shadowRadius: 3.84, // for iOS
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 20, // Moved padding from 'button' to here
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

export default ButtonLogin;
