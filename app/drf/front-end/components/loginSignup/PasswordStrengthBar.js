import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Animated } from "react-native";

const getPasswordStrength = (password) => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasDigits = /\d/.test(password);
  const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const conditionsMet = [
    hasUpperCase,
    hasLowerCase,
    hasDigits,
    hasSpecialChars,
  ].filter(Boolean).length;

  if (password.length >= 8 && conditionsMet === 4) {
    return "strong";
  } else if (password.length >= 6 && conditionsMet >= 2) {
    return "medium";
  } else if (password.length > 0) {
    return "weak";
  } else {
    return "";
  }
};

const PasswordStrengthBar = ({ password }) => {
  const strength = getPasswordStrength(password);
  const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0));

  useEffect(() => {
    let value;
    switch (strength) {
      case "weak":
        value = 1;
        break;
      case "medium":
        value = 2;
        break;
      case "strong":
        value = 3;
        break;
      default:
        value = 0;
        break;
    }
    Animated.timing(animatedValue, {
      toValue: value,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [strength]);

  return (
    <View style={styles.strengthContainer}>
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.strengthBar,
            {
              backgroundColor: animatedValue.interpolate({
                inputRange: [0, 1, 2, 3],
                outputRange: ["#d4d4d4", "red", "yellow", "green"],
              }),
            },
          ]}
        ></Animated.View>
        <Animated.View
          style={[
            styles.strengthBar,
            {
              backgroundColor: animatedValue.interpolate({
                inputRange: [0, 1, 2, 3],
                outputRange: ["#d4d4d4", "#d4d4d4", "yellow", "green"],
              }),
            },
          ]}
        ></Animated.View>
        <Animated.View
          style={[
            styles.strengthBar,
            {
              backgroundColor: animatedValue.interpolate({
                inputRange: [0, 1, 2, 3],
                outputRange: ["#d4d4d4", "#d4d4d4", "#d4d4d4", "green"],
              }),
            },
          ]}
        ></Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  strengthContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  container: {
    flexDirection: "row",
    height: 5,
    width: "100%",
    paddingLeft: 15,
    paddingRight: 15,
  },
  strengthBar: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#d4d4d4",
    borderRadius: 20,
  },
});

export default PasswordStrengthBar;
