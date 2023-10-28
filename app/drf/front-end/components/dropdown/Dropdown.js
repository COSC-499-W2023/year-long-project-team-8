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

const Dropdown = ({ items, iconName, label, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const animations = items.map(() => useRef(new Animated.Value(0)).current);

  const toggleDropdown = (shouldOpen) => {
    if (!shouldOpen) {
      // If shouldOpen is false, we close the dropdown
      animations
        .slice()
        .reverse()
        .forEach((animation, index) => {
          Animated.timing(animation, {
            toValue: 0,
            duration: 300,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
            delay: index * 100,
          }).start();
        });
      setTimeout(() => {
        setIsOpen(false);
      }, 300 + animations.length * 100);
    } else {
      setIsOpen(true);
      animations.forEach((animation, index) => {
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
      <TouchableOpacity
        onPress={() => toggleDropdown(!isOpen)}
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        {label && <Text style={styles.labelStyle}>{label}</Text>}
        {iconName && (
          <MaterialIcons
            name={iconName}
            size={25}
            color="grey"
            style={styles.iconStyle}
          />
        )}
      </TouchableOpacity>
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
                <Text style={styles.text}>{item.label}</Text>
              </Animated.View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "flex-end",
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
    backgroundColor: "#de8900",
    padding: 20,
    marginTop: 10,
    borderRadius: 50,
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

export default Dropdown;
