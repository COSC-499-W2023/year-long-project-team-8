import React, { useRef } from "react";
import { View, TouchableOpacity, Animated } from "react-native";
import CustomText from "../CustomText";
import styles from "./styles";
import { MaterialIcons } from "@expo/vector-icons";

const Item = ({ title, description, icon = "arrow-forward-ios", onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.95,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        <Animated.View
          style={[styles.itemContainer, { transform: [{ scale: scaleAnim }] }]}
        >
          <View style={styles.headerContainer}>
            <CustomText style={styles.itemTitle} fontType={"text"}>
              {title}
            </CustomText>
            <CustomText style={styles.itemDescription} fontType={"subHeader"}>
              {description}
            </CustomText>
          </View>
          <View style={styles.iconContainer}>
            <MaterialIcons
              name={icon}
              size={30}
              color={"grey"}
              style={styles.icon}
            />
          </View>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

export default Item;
