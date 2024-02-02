import React, {useContext} from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomText from "../CustomText";
import DrawerItem from "./DrawerItem";
import AuthContext from '../../context/AuthContext'
// Logo asset
const logo = require("../../assets/logo.png");

/**
 * Custom Drawer Content component
 * @param {object} navigation - React Navigation's navigation prop.
 * @param {object} state - Current navigation state.
 */
const DrawerProps = ({ navigation, state }) => {
  // import logout function from AuthContext
  const { logoutUser } = useContext(AuthContext);
  // Extract the name of the currently active route
  const activeRouteName = state.routes[state.index].name;

  /**
   * Logout handler function
   */
  const handleLogout = () => {
    logoutUser();
    navigation.closeDrawer();
    navigation.navigate('Landing');
  };

  return (
    <View style={styles.container}>
      {/* Drawer header containing the logo */}
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
      </View>

      {/* Drawer items for navigation */}
      <DrawerItem
        iconName="home"
        label="Home"
        onPress={() => navigation.navigate("Home")}
        isActive={activeRouteName === "Tabs"}
      />
      <DrawerItem
        iconName="person"
        label="Profile"
        onPress={() => navigation.navigate("Tabs", { screen: "Profile" })}
        isActive={activeRouteName === "Profile"}
      />
      <DrawerItem
        iconName="settings"
        label="Settings"
        onPress={() => navigation.navigate("Settings")}
        isActive={activeRouteName === "Settings"}
      />
      <DrawerItem
        iconName="chatbubbles"
        label="Chat"
        onPress={() => navigation.navigate("Chat")}
        isActive={activeRouteName === "Chat"}
      />

      {/* Push the logout button to the bottom */}
      <View style={styles.flexGrow} />

      {/* Help button */}
      <DrawerItem
        iconName="help-circle"
        label="Help & Support"
        onPress={() => console.log("HelpSupport")}
        isActive={activeRouteName === "HelpSupport"}
      />

      {/* Logout button */}
      <TouchableOpacity
        style={[styles.drawerItem, styles.logout]}
        onPress={handleLogout}
      >
        <Ionicons name="log-out" size={24} style={styles.logoutIcon} />
        <CustomText
          style={[styles.drawerText, styles.logoutText]}
          fontType="text"
        >
          Logout
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  header: {
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "#d1d1d1",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  logo: {
    width: 200,
    height: 40,
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: "#d1d1d1",
  },
  drawerText: {
    fontSize: 16,
    color: "#444",
    marginLeft: 15,
  },
  activeDrawerItem: {
    backgroundColor: "#EFEFEF",
  },
  activeDrawerText: {
    color: "orange",
    fontWeight: "600",
  },
  icon: {
    color: "#777",
  },
  activeIcon: {
    color: "orange",
  },
  logout: {
    borderTopWidth: 0.5,
    borderTopColor: "#d1d1d1",
  },
  logoutIcon: {
    color: "#f73e47",
  },
  flexGrow: {
    flex: 1,
  },
});

export default DrawerProps;
