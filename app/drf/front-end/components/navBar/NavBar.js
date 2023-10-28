import React from "react";
import { View, StyleSheet, Image } from "react-native";
import Dropdown from "../dropdown/Dropdown";

const logo = require("../../assets/logo.png");

// Navbar component to render the application's navigation bar.
// It can optionally display a dropdown based on the provided items.
const Navbar = ({ items, dropdown = false, iconName, iconLabel, onSelect }) => {
  return (
    <View style={styles.navbar}>
      {/* Display the logo or brand image of the application.*/}
      <Image source={logo} style={styles.appName} resizeMode="contain" />
      <View style={styles.dropdown}>
        {/* Conditionally render the Dropdown component if the 'dropdown' prop is true.*/}
        {dropdown && (
          <Dropdown
            items={items}
            iconName={iconName}
            label={iconLabel}
            onSelect={onSelect}
          />
        )}
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
    zIndex: 10,
  },
  appName: {
    width: 185,
    resizeMode: "contain",
  },
  dropdown: {
    marginRight: 10,
  },
});

export default Navbar;
