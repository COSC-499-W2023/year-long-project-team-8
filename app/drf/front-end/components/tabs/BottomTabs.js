import React, { useContext, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import HomePage from "../homePage/HomePage.js";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AuthContext from '../../context/AuthContext'


// Create a Material Top Tab Navigator
const Tab = createMaterialTopTabNavigator();
const baseEndpoint = "http://localhost:8000/api";

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

  // use Authcontext to get our token, query the database, and use logout if query fails
  let {authTokens, logoutUser} = useContext(AuthContext)
  useEffect(()=> {
    getProducts()
}, [])


let getProducts = async() =>{
    let response = await fetch(`${baseEndpoint}/products/`, {
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + String(authTokens.access) // you can comment out this code to remove the token and see that you are redirected to login and tokens are gone
        }
    })
    let data = await response.json()

    if(response.status === 200){
        console.log(data)
    }else if(response.statusText === 'Unauthorized'){
        logoutUser()
    }
    
}
  // Configure and render the tab navigator
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarPosition="bottom"
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        swipeEnabled: false,
        tabBarActiveTintColor: "#FCA63C",
        tabBarInactiveTintColor: "gray",
        tabBarIndicatorStyle: { backgroundColor: "transparent" },
        tabBarPressColor: "transparent",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused, size }) => (
            <View style={styles.iconContainer}>
              <Ionicons
                name="home"
                color={focused ? "#FCA63C" : "gray"}
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
          tabBarLabel: "",
          tabBarIcon: ({ focused, size }) => (
            <View style={styles.iconContainer}>
              <Ionicons
                name="search"
                color={focused ? "#FCA63C" : "gray"}
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
          tabBarLabel: "",
          tabBarIcon: ({ focused, size }) => (
            <View style={styles.iconContainer}>
              <Ionicons
                name="add-circle-outline"
                color={focused ? "#FCA63C" : "gray"}
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
          tabBarLabel: "",
          tabBarIcon: ({ focused, size }) => (
            <View style={styles.iconContainer}>
              <Ionicons
                name="chatbubbles"
                color={focused ? "#FCA63C" : "gray"}
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
          tabBarLabel: "",
          tabBarIcon: ({ focused, size }) => (
            <View style={styles.iconContainer}>
              <Ionicons
                name="person-circle-outline"
                color={focused ? "#FCA63C" : "gray"}
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
