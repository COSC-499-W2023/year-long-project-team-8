import React from "react";
import { StatusBar, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Landing from "./components/landing/Landing";
import Details from "./components/loginSignup/Details.js";
import MainApp from "./components/drawer/DrawerNav.js";
import PasswordReset from './components/loginSignup/PasswordReset';
import SettingsNav from "./components/settingsPage/Settings.js";
import EditProfile from "./components/editProfile/editProfileMain.js";
import Chat from "./components/chat/chat.js";
import mapView from "./components/map/mapMain";

import { AuthProvider } from "./context/AuthContext";

const Stack = createStackNavigator();

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar />
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Landing"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Profile" component={ProfilePage} />
            <Stack.Screen name="Landing" component={Landing} />
            <Stack.Screen name="Details" component={Details} />
            <Stack.Screen name="MainApp" component={MainApp} />
            <Stack.Screen name="PasswordReset" component={PasswordReset} />
            <Stack.Screen name="Settings" component={SettingsNav} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="Chat" component={Chat} />
            <Stack.Screen name="mapView" component={mapView} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </View>

  );
};

export default App;
