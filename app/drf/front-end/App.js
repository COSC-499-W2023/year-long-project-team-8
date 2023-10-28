import React from "react";
import { StatusBar, SafeAreaView, View } from "react-native";
import Landing from "./components/landing/Landing.js";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabs from "./components/tabs/BottomTabs.js";
import Details from "./components/loginSignup/Details.js";

const Stack = createStackNavigator();

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Landing"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Landing" component={Landing} />
          <Stack.Screen name="Details" component={Details} />
          <Stack.Screen name="Tabs" component={BottomTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default App;
