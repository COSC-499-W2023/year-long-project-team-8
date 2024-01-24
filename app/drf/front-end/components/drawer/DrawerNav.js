import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Tabs from "../tabs/BottomTabs"; // Importing the bottom tabs navigation component
import DrawerProps from "./DrawerProps.js"; // Custom drawer content
import SettingsPage from "../settingsPage/Settings"; // Settings page component
import Profile from "../profilePage/profilePage.js";
import Chat from "../chat/chat.js";

// Assets for icons and logos
const customHamburgerIcon = require("../../assets/hamburger.png");
const logo = require("../../assets/logo.png");
const notificationIcon = require("../../assets/notification.png");

// Create a drawer navigator
const Drawer = createDrawerNavigator();

const DrawerNav = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Tabs" // Set the initial route to be the Tabs
      drawerContent={(props) => <DrawerProps {...props} />}
      screenOptions={{
        swipeEnabled: false,
      }}
    >
      <Drawer.Screen
        name="Tabs"
        component={Tabs}
        options={({ navigation }) => ({
          headerTitleAlign: "center",
          headerTitle: () => (
            <Image source={logo} style={{ width: 200, height: 40 }} />
          ),
          headerLeft: () => (
            // Hamburger icon button to toggle the drawer
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <Image
                source={customHamburgerIcon}
                style={{ width: 22, height: 22, marginLeft: 20 }}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            // Notification icon button on the right of the header
            <TouchableOpacity
              onPress={() => {
                console.log("Notifications pressed");
              }}
            >
              <Image
                source={notificationIcon}
                style={{ width: 25, height: 25, marginRight: 20 }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={({ navigation }) => ({
          headerTitleAlign: "center",
          headerTitle: () => (
            <Image source={logo} style={{ width: 200, height: 40 }} />
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <Image
                source={customHamburgerIcon}
                style={{ width: 25, height: 25, marginLeft: 20 }}
              />
            </TouchableOpacity>
          ),
        })}
      />

      <Drawer.Screen
        name="Settings"
        component={SettingsPage}
        options={({ navigation }) => ({
          headerTitleAlign: "center",
          headerTitle: () => (
            // Display the logo in the center of the header
            <Image source={logo} style={{ width: 200, height: 40 }} />
          ),
          headerLeft: () => (
            // Hamburger icon button to toggle the drawer
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <Image
                source={customHamburgerIcon}
                style={{ width: 25, height: 25, marginLeft: 20 }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Drawer.Screen
        name="Chat"
        component={Chat}
        options={({ navigation }) => ({
          headerTitleAlign: "center",
          headerTitle: () => (
            <Image source={logo} style={{ width: 200, height: 40 }} />
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <Image
                source={customHamburgerIcon}
                style={{ width: 22, height: 22, marginLeft: 20 }}
              />
            </TouchableOpacity>
          ),
        })}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNav;
