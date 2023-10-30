import React from "react";
import { View, StyleSheet, Text, SafeAreaView } from "react-native";
import HomePage from "../homePage/HomePage.js";
import Profile from "../profilePage/profilePage.js"
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

// Main Bottom Tabs Component
function BottomTabs({ route }) {
  // Configure and render the tab navigator
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator
        initialRouteName="Home"
        tabBarPosition="bottom"
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.label,
          swipeEnabled: false,
          tabBarActiveTintColor: "#FCA63C",
          tabBarInactiveTintColor: "black",
          tabBarIndicatorStyle: { backgroundColor: "transparent" },
          tabBarPressColor: "transparent",
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomePage}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ focused, size }) => (
              <View style={styles.iconContainer}>
                <Ionicons
                  name="home"
                  color={focused ? "#FCA63C" : "#4a4642"}
                  size={25}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Browse"
          component={Browse}
          options={{
            tabBarLabel: "Browse",
            tabBarIcon: ({ focused, size }) => (
              <View style={styles.iconContainer}>
                <Ionicons
                  name="search"
                  color={focused ? "#FCA63C" : "#4a4642"}
                  size={25}
                />
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="add"
          component={Add}
          options={{
            tabBarLabel: "Add",
            tabBarIcon: ({ focused, size }) => (
              <View style={styles.iconContainer}>
                <Ionicons
                  name="add-circle-outline"
                  color={focused ? "#FCA63C" : "#4a4642"}
                  size={25}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Chat"
          component={Chat}
          options={{
            tabBarLabel: "Chat",
            tabBarIcon: ({ focused, size }) => (
              <View style={styles.iconContainer}>
                <Ionicons
                  name="chatbubbles"
                  color={focused ? "#FCA63C" : "#4a4642"}
                  size={25}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ focused, size }) => (
              <View style={styles.iconContainer}>
                <Ionicons
                  name="person-circle-outline"
                  color={focused ? "#FCA63C" : "#4a4642"}
                  size={25}
                />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabBar: {
    height: 65,
    backgroundColor: "white",
    borderTopWidth: 0.5,
    borderTopColor: "#d1d1d1",
    paddingBottom: 5,
  },
  label: {
    fontSize: 12,
    textTransform: "none",
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
