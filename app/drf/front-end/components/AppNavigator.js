import React from "react";
import DrawerNav from "./drawer/DrawerNav";
import MainStackNavigator from "./mainStackNav/MainStack";
import { useAuth } from "../context/AuthContext";
import { NavigationContainer } from "@react-navigation/native";

const AppNavigator = () => {
  const { authTokens } = useAuth();

  return (
    <NavigationContainer>
      {authTokens ? <DrawerNav /> : <MainStackNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
