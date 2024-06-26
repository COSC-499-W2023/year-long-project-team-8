import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useNavigationState } from "@react-navigation/native";
import Tabs from "../tabs/BottomTabs";
import DrawerProps from "./DrawerProps";
import SettingsPage from "../settingsPage/Settings";
import Profile from "../profilePage/profilePage";
import ChatList from "../chat/ChatList.js";
import PostDetails from "../posts/PostDetails";
import OtherProfile from "../othersProfile/OtherProfile";
import EditPost from "../editPost/EditPost";
import EditProfilePage from "../editProfile/editProfileMain";
import ChangeEmail from "../settingsPage/ChangeEmail";
import ChangePassword from "../settingsPage/ChangePassword";
import SavedPosts from "../savedPosts/SavedPosts";
import UserMessages from "../chat/UserMessages";
import Landing from "../landing/Landing";
import HelpSupport from "../helpSupport/HelpSupport";
const customHamburgerIcon = require("../../assets/hamburger.png");
const logo = require("../../assets/logo.png");
const notificationIcon = require("../../assets/notification.png");
const backArrowIcon = require("../../assets/icons/back-arrow.png");

const Drawer = createDrawerNavigator();

const DrawerNav = ({ navigation }) => {
  // Function to determine the active route name
  const getActiveRouteName = (navigationState) => {
    if (!navigationState) {
      return null;
    }
    const route = navigationState.routes[navigationState.index];
    // Dive into nested navigators
    if (route.state) {
      return getActiveRouteName(route.state);
    }
    return route.name;
  };
  const navigationState = useNavigationState((state) => state);
  const activeRouteName = getActiveRouteName(navigationState);

  return (
    <Drawer.Navigator
      initialRouteName="Tabs"
      drawerContent={(props) => (
        <DrawerProps {...props} activeRouteName={activeRouteName} />
      )}
      screenOptions={{
        swipeEnabled: true,
      }}
    >
      <Drawer.Screen
        name="Tabs"
        component={Tabs}
        options={({ navigation, route }) => ({
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
          headerRight: () => (
            <TouchableOpacity
              onPress={() => console.log("Notifications pressed")}
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
                style={{ width: 22, height: 22, marginLeft: 20 }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Drawer.Screen
        name="EditProfile"
        component={EditProfilePage}
        options={({ navigation, route }) => ({
          headerTitleAlign: "center",
          headerTitle: () => (
            <Image source={logo} style={{ width: 200, height: 40 }} />
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                const sourceScreen = route.params?.sourceScreen;
                if (sourceScreen === "Profile") {
                  navigation.navigate("Profile");
                } else if (sourceScreen === "Settings") {
                  navigation.navigate("Settings");
                } else {
                  navigation.goBack();
                }
              }}
            >
              <Image
                source={backArrowIcon}
                style={{ width: 25, height: 25, marginLeft: 20 }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Drawer.Screen
        name="ChangeEmail"
        component={ChangeEmail}
        options={({ navigation, route }) => ({
          headerTitleAlign: "center",
          headerTitle: () => (
            <Image source={logo} style={{ width: 200, height: 40 }} />
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Settings");
              }}
            >
              <Image
                source={backArrowIcon}
                style={{ width: 25, height: 25, marginLeft: 20 }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Drawer.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={({ navigation, route }) => ({
          headerTitleAlign: "center",
          headerTitle: () => (
            <Image source={logo} style={{ width: 200, height: 40 }} />
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Settings");
              }}
            >
              <Image
                source={backArrowIcon}
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
      <Drawer.Screen
        name="HelpSupport"
        component={HelpSupport}
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
        name="PostDetails"
        component={PostDetails}
        options={({ navigation, route }) => ({
          drawerItemStyle: { display: "none" },
          headerTitleAlign: "center",
          headerTitle: () => (
            <Image source={logo} style={{ width: 200, height: 40 }} />
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                const fromSavedPosts = route.params?.fromSavedPosts;
                if (fromSavedPosts) {
                  navigation.navigate("SavedPosts");
                } else {
                  navigation.goBack();
                }
              }}
            >
              <Image
                source={backArrowIcon}
                style={{ width: 25, height: 25, marginLeft: 20 }}
              />
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
      <Drawer.Screen
        name="SavedPosts"
        component={SavedPosts}
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
          drawerItemStyle: { display: "none" },
          headerTitleAlign: "center",
          headerTitle: () => (
            <Image source={logo} style={{ width: 200, height: 40 }} />
          ),
        })}
      />
      <Drawer.Screen
        name="EditPost"
        component={EditPost}
        options={({ navigation }) => ({
          drawerItemStyle: { display: "none" },
          headerTitleAlign: "center",
          headerTitle: () => (
            <Image source={logo} style={{ width: 200, height: 40 }} />
          ),
        })}
      />
      <Drawer.Screen
        name="UserMessages"
        component={UserMessages}
        options={{
          drawerItemStyle: { display: "none" },
          headerShown: false,
        }}
      />

      <Drawer.Screen
        name="Landing"
        component={Landing}
        options={{
          drawerItemStyle: { display: "none" },
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNav;
