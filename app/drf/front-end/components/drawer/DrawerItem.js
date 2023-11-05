import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomText from "../CustomText";
const DrawerItem = ({ iconName, label, onPress, isActive }) => (
  <TouchableOpacity
    style={[styles.drawerItem, isActive ? styles.activeDrawerItem : null]}
    onPress={onPress}
  >
    <Ionicons
      name={iconName}
      size={24}
      style={[styles.icon, isActive ? styles.activeIcon : null]}
    />
    <CustomText
      style={[styles.drawerText, isActive ? styles.activeDrawerText : null]}
    >
      {label}
    </CustomText>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: "#d1d1d1",
  },
  activeDrawerItem: {
    backgroundColor: "#EFEFEF",
  },
  drawerText: {
    fontSize: 16,
    color: "#444",
    marginLeft: 15,
  },
  activeDrawerText: {
    color: "orange",
  },
  icon: {
    color: "#777",
  },
  activeIcon: {
    color: "orange",
  },
});

export default DrawerItem;
