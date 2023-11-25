import React from "react";
import { StatusBar, View } from "react-native";
import Landing from "./components/landing/Landing.js";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Details from "./components/loginSignup/Details.js";
import MainApp from "./components/drawer/DrawerNav.js";

import { AuthProvider } from "./context/AuthContext";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

const Stack = createStackNavigator();

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar />
      <ActionSheetProvider>
        <AuthProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="MainApp"
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="Landing" component={Landing} />
              <Stack.Screen name="Details" component={Details} />
              <Stack.Screen name="MainApp" component={MainApp} />
            </Stack.Navigator>
          </NavigationContainer>
        </AuthProvider>
      </ActionSheetProvider>
    </View>
  );
};

export default App;
