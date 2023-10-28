import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const logo = require("../../assets/logo.png");
const Navbar = () => {
  return (
    <View style={styles.navbar}>
      <Image source={logo} style={styles.appName} resizeMode="contain" />
      <View style={styles.iconGroup}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="menu-outline" size={25} color="orange" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    backgroundColor: "white",
    borderBottomWidth: 0.5,
    borderBottomColor: "#d1d1d1",
  },
  appName: {
    width: 185, // set as per your need
    resizeMode: "contain",
  },
  iconGroup: {
    flexDirection: "row",
  },
  iconButton: {
    marginLeft: 15,
  },
});

export default Navbar;
