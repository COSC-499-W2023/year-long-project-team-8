import React , { useEffect } from "react";
import { StatusBar, View, Linking } from "react-native";
import Landing from "./components/landing/Landing.js";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Details from "./components/loginSignup/Details.js";
import MainApp from "./components/drawer/DrawerNav.js";
import PasswordReset from './components/loginSignup/PasswordReset';

import { AuthProvider } from "./context/AuthContext";


const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    // Deep linking listener
    const handleDeepLink = async (event) => {
      // Extract the path from the deep link URL
      const path = event.url.replace(/.*?:\/\//g, '');

      // Check if the deep link matches the expected format
      const match = path.match(/^reset-password\/(.+)$/);

      if (match) {
        // Extract the reset token from the deep link
        const resetToken = match[1];

        // Navigate to the ResetPassword screen with the reset token
        // Replace this with your navigation logic
        navigation.navigate('ResetPassword', { resetToken });
      }
    };
    // Add the event listener
    Linking.addEventListener('url', handleDeepLink);

    // Remove the event listener when the component is unmounted
    return () => {
      Linking.removeEventListener('url', handleDeepLink);
    };
  }, []);

  const extractResetTokenFromURL = (url) => {
    const tokenRegex = /reset-password\/([^/]+)/;
  
    // Use the regular expression to extract the token
    const match = url.match(tokenRegex);

    // If there's a match, return the captured token, otherwise return null
    return match ? match[1] : null;
};

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
            <Stack.Screen name="PasswordReset" component={PasswordReset} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </View>
  );
};

export default App;
