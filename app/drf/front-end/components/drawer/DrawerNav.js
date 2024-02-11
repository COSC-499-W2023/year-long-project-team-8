import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Tabs from "../tabs/BottomTabs";
import DrawerProps from "./DrawerProps.js";
import SettingsPage from "../settingsPage/Settings";
import Profile from "../profilePage/profilePage.js";
import ChatList from "../chat/ChatList.js";
import PostDetails from "../posts/PostDetails.js";
import OtherProfile from "../othersProfile/OtherProfile.js";

// Assets for icons and logos
const customHamburgerIcon = require("../../assets/hamburger.png");
const logo = require("../../assets/logo.png");
const notificationIcon = require("../../assets/notification.png");
const backArrowIcon = require('../../assets/icons/back-arrow.png');

const Drawer = createDrawerNavigator();

const DrawerNav = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Tabs"
      drawerContent={(props) => <DrawerProps {...props} />}
      screenOptions={{
        swipeEnabled: true, // Consider enabling swipe for a more intuitive navigation experience
      }}
    >
      <Drawer.Screen
        name="Tabs"
        component={Tabs}
        options={({ navigation }) => ({
          headerTitleAlign: "center",
          headerTitle: () => <Image source={logo} style={{ width: 200, height: 40 }} />,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <Image source={customHamburgerIcon} style={{ width: 22, height: 22, marginLeft: 20 }} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => console.log("Notifications pressed")}>
              <Image source={notificationIcon} style={{ width: 25, height: 25, marginRight: 20 }} />
            </TouchableOpacity>
          ),
        })}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={({ navigation }) => ({
          headerTitleAlign: "center",
          headerTitle: () => <Image source={logo} style={{ width: 200, height: 40 }} />,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <Image source={customHamburgerIcon} style={{ width: 22, height: 22, marginLeft: 20 }} />
            </TouchableOpacity>
          ),
        })}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsPage}
        options={({ navigation }) => ({
          headerTitleAlign: "center",
          headerTitle: () => <Image source={logo} style={{ width: 200, height: 40 }} />,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <Image source={customHamburgerIcon} style={{ width: 22, height: 22, marginLeft: 20 }} />
            </TouchableOpacity>
          ),
        })}
      />
      {/* PostDetails screen hidden from the drawer but accessible via navigation */}
      <Drawer.Screen
        name="PostDetails"
        component={PostDetails}
        options={({ navigation }) => ({
          drawerItemStyle: { display: 'none' },
          headerTitleAlign: "center",
          headerTitle: () => <Image source={logo} style={{ width: 200, height: 40 }} />,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={backArrowIcon} style={{ width: 25, height: 25, marginLeft: 20 }} />
            </TouchableOpacity>
          ),
        })}
      />
      <Drawer.Screen
        name="Chat"
        component={ChatList}
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
      {/* PostDetails screen hidden from the drawer but accessible via navigation */}
      <Drawer.Screen
        name="OtherProfile"
        component={OtherProfile}
        options={({ navigation }) => ({
          drawerItemStyle: { display: 'none' },
          headerTitleAlign: "center",
          headerTitle: () => <Image source={logo} style={{ width: 200, height: 40 }} />,
        })}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNav;
