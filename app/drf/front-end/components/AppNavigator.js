import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import DrawerNav from "./drawer/DrawerNav";
import MainStackNavigator from "./mainStackNav/MainStack";
import { useAuth } from "../context/AuthContext";
import Details from "./loginSignup/Details";
import Tabs from "./tabs/BottomTabs";

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { authTokens, isNavigatingFromSignup } = useAuth();

  return (
    <NavigationContainer>
      {authTokens ? (
        isNavigatingFromSignup ? (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Details" component={Details} />
            <Stack.Screen name="Tabs" component={Tabs} />
          </Stack.Navigator>
        ) : (
          <DrawerNav />
        )
      ) : (
        <MainStackNavigator />
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
