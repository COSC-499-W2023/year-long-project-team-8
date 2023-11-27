import React from "react";
import { StatusBar, View } from "react-native";
import Landing from "./components/landing/Landing.js";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Details from "./components/loginSignup/Details.js";
import MainApp from "./components/drawer/DrawerNav.js";
import { AuthProvider } from "./context/AuthContext";

import SettingsNav from "./components/settingsPage/Settings.js";
import EditProfile from "./components/editProfile/editProfileMain.js";


const Stack = createStackNavigator();

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar />
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Landing"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Landing" component={Landing} />
            <Stack.Screen name="Details" component={Details} />
            <Stack.Screen name="MainApp" component={MainApp} />
            <Stack.Screen name="Settings" component={SettingsNav} />
              <Stack.Screen name="EditProfile" component={EditProfile} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </View>
  );
};

export default App;
