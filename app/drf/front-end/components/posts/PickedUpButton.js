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
const translateValue = screenWidth * 0.5;

const ButtonLogin = ({ title, onPress }) => {
  const scaleValue = new Animated.Value(1);
  const shinePosition = useRef(new Animated.Value(-1)).current;

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

  const animateShine = () => {
    shinePosition.setValue(-translateValue);
    Animated.timing(shinePosition, {
      toValue: screenWidth * 0.5 + translateValue,
      duration: 600,
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

  useEffect(() => {
    animateShine();
  }, []);

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      <LinearGradient
        colors={["#3FC080", "#5CD993"]} // Green gradient colors
        style={styles.button}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Pressable
          onPress={onPress}
          onPressIn={animatePressIn}
          onPressOut={animatePressOut}
          style={styles.buttonContent}
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
            name="check"
            size={20}
            color="white"
            style={styles.arrow}
          />
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
    alignSelf: "flex-end",
    textAlign: "center",
    borderRadius: 30,
    elevation: 3,
    marginLeft: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    overflow: "hidden",
    width: 160,
    paddingHorizontal: 10,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
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
    fontSize: 16,
  },
  arrow: {
    marginLeft: 5,
  },
});

export default ButtonLogin;
