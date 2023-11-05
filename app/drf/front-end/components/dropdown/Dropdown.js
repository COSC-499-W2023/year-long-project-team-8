// Import required modules and components
import React, { useState, useRef } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Animated,
  Easing,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import CustomText from "../CustomText";

// Dropdown component
const Dropdown = ({ items, iconName, label, onSelect }) => {
  // State to control dropdown visibility
  const [isOpen, setIsOpen] = useState(false);

  // Array of animation values for each dropdown item
  const animations = items.map(() => useRef(new Animated.Value(0)).current);

  // Function to handle opening and closing of the dropdown
  const toggleDropdown = (shouldOpen) => {
    if (!shouldOpen) {
      // If the dropdown is not required to be open, close it
      animations
        .slice()
        .reverse()
        .forEach((animation, index) => {
          // Animate each item to hide
          Animated.timing(animation, {
            toValue: 0,
            duration: 300,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
            delay: index * 100,
          }).start();
        });
      // Set state to close dropdown after animation
      setTimeout(() => {
        setIsOpen(false);
      }, 300 + animations.length * 100);
    } else {
      // Otherwise, open the dropdown
      setIsOpen(true);
      animations.forEach((animation, index) => {
        // Animate each item to show
        Animated.timing(animation, {
          toValue: 1,
          duration: 300,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
          delay: index * 100,
        }).start();
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Dropdown button */}
      <TouchableOpacity
        onPress={() => toggleDropdown(!isOpen)}
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        {label && (
          <CustomText fontType="text" style={styles.labelStyle}>
            {label}
          </CustomText>
        )}
        {iconName && (
          <MaterialIcons
            name={iconName}
            size={25}
            color="grey"
            style={styles.iconStyle}
          />
        )}
      </TouchableOpacity>
      {/* Render dropdown items if the dropdown is open */}
      {isOpen && (
        <View style={styles.dropdown}>
          {items.map((item, index) => (
            <TouchableOpacity
              key={item.label}
              onPress={() => {
                onSelect(item.label);
                toggleDropdown(false);
              }}
              activeOpacity={0.7}
            >
              <Animated.View
                style={[
                  styles.item,
                  {
                    opacity: animations[index],
                    transform: [
                      {
                        translateY: animations[index].interpolate({
                          inputRange: [0, 1],
                          outputRange: [20, 0],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <CustomText fontType="text" style={styles.text}>
                  {item.label}
                </CustomText>
              </Animated.View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

// Styles for the Dropdown component
const styles = StyleSheet.create({
  container: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "flex-end",
    zIndex: 1000, // <-- added this line
  },
  iconStyle: {
    width: 25,
    height: 25,
  },
  labelStyle: {
    color: "black",
    marginRight: 10,
  },
  dropdown: {
    position: "absolute",
    top: 40,
    right: 0,
    zIndex: 1000,
    borderRadius: 20,
    backgroundColor: "transparent",
  },
  item: {
    backgroundColor: "#FCA63C",
    padding: 15,
    marginTop: 15,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 10,
  },
  text: {
    textAlign: "center",
    color: "white",
  },
});

// Export the Dropdown component for use in other files
export default Dropdown;
