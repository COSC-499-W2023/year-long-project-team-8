import React, { useEffect } from "react";
import { StatusBar, View, Linking } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthProvider } from "./context/AuthContext";
import { AppStateProvider } from "./context/AppStateContext";
import { RootSiblingParent } from "react-native-root-siblings";

import { SliderProvider } from "./context/MapContext";
import AppNavigator from "./components/AppNavigator";

const Stack = createStackNavigator();

const App = () => {
  return (
    <AppStateProvider>
      <RootSiblingParent>
        <View style={{ flex: 1 }}>
          <StatusBar />
          <AuthProvider>
            {/* Wrap the NavigationContainer with the SliderProvider */}
            <SliderProvider>
              <AppNavigator />
            </SliderProvider>
          </AuthProvider>
        </View>
      </RootSiblingParent>
    </AppStateProvider>
  );
};

export default App;
