import React from "react";
import { View, StyleSheet, Text } from "react-native";
import HomePage from "../homePage/HomePage.js";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

// Create a Material Top Tab Navigator
const Tab = createMaterialTopTabNavigator();

// Individual screens for each tab:
// These are placeholders and can be replaced with actual screens when developed

// Screen for Browse
const Browse = () => (
  <View style={styles.content}>
    <Text style={styles.title}>Dummy Browse</Text>
  </View>
);

// Screen for Chat
const Chat = () => (
  <View style={styles.content}>
    <Text style={styles.title}>Dummy Chat</Text>
  </View>
);

// Screen for Adding Listings
const Add = () => (
  <View style={styles.content}>
    <Text style={styles.title}>Dummy Add Listing</Text>
  </View>
);

// Screen for Profile
const Profile = () => (
  <View style={styles.content}>
    <Text style={styles.title}>Dummy Profile</Text>
  </View>
);

// Main Bottom Tabs Component
function BottomTabs({ route }) {
  // Welcome message passed from navegation
  //const { message } = route.params;

  // Configure and render the tab navigator
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarPosition="bottom"
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: "#F8B951",
        tabBarInactiveTintColor: "gray",
        tabBarIndicatorStyle: { backgroundColor: "transparent" },
        tabBarPressColor: "transparent",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomePage}
        //initialParams={{ message: message }}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused, size }) => (
            <View style={styles.iconContainer}>
              <Ionicons
                name="home"
                color={focused ? "#F8B951" : "gray"}
                size={25}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Browse"
        component={Browse}
        //initialParams={{ message: message }}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused, size }) => (
            <View style={styles.iconContainer}>
              <Ionicons
                name="search"
                color={focused ? "#F8B951" : "gray"}
                size={25}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="add"
        component={Add}
        //  initialParams={{ message: message }}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused, size }) => (
            <View style={styles.iconContainer}>
              <Ionicons
                name="add-circle-outline"
                color={focused ? "#F8B951" : "gray"}
                size={25}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        // initialParams={{ message: message }}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused, size }) => (
            <View style={styles.iconContainer}>
              <Ionicons
                name="chatbubbles"
                color={focused ? "#F8B951" : "gray"}
                size={25}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        // initialParams={{ message: message }}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused, size }) => (
            <View style={styles.iconContainer}>
              <Ionicons
                name="person-circle-outline"
                color={focused ? "#F8B951" : "gray"}
                size={25}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabBar: {
    height: 60,
    backgroundColor: "white",
    borderTopWidth: 0.5,
    borderTopColor: "#d1d1d1",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
});
export default BottomTabs;
