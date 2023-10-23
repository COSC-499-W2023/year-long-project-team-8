import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Navbar = () => {
  return (
    <View style={styles.navbar}>
      <Text style={styles.appName}>Our Logo</Text>
      <View style={styles.iconGroup}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="menu-outline" size={25} color="grey" />
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
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  iconGroup: {
    flexDirection: "row",
  },
  iconButton: {
    marginLeft: 15,
  },
});

export default Navbar;
