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

const screenWidth = Dimensions.get("window").width;
const translateValue = screenWidth * 0.5; // make this equal to half of the button's width so the shine fully translates across it

const ButtonLanding = ({ title, onPress, showIcon = true, style }) => {
  const scaleValue = new Animated.Value(1);

  const animatePressIn = () => {
    Animated.timing(scaleValue, {
      toValue: 0.95,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const animatePressOut = () => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const [fontLoaded, setFontLoaded] = useState(false);
  const shinePosition = useRef(new Animated.Value(-1)).current; // -1 represents the initial offscreen position

  const animateShine = () => {
    shinePosition.setValue(-translateValue);
    Animated.timing(shinePosition, {
      toValue: screenWidth * 0.5 + translateValue,
      duration: 600,
      useNativeDriver: true,
    }).start();
  };

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
    shadowColor: "#000", // for iOS
    shadowOffset: { width: 0, height: 2 }, // for iOS
    shadowOpacity: 0.25, // for iOS
    shadowRadius: 3.84, // for iOS
    overflow: "hidden", // <<< Add this line
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
