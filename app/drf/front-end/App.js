import React, { useEffect } from "react";
import { View, StatusBar } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Linking from "expo-linking";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Landing from "./components/landing/Landing";
import Details from "./components/loginSignup/Details";
import MainApp from "./components/drawer/DrawerNav";
import PasswordReset from "./components/loginSignup/PasswordReset";
import SettingsNav from "./components/settingsPage/Settings";
import EditProfile from "./components/editProfile/editProfileMain";
import mapView from "./components/map/mapMain";
import { AuthProvider } from "./context/AuthContext";
import { AppStateProvider } from "./context/AppStateContext";
import MainStack from "./components/mainStackNav/MainStack";
import CustomText from "./components/CustomText";
import { useDeepLinkHandler } from "./hooks/useDeepLinkHandler";
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';


const Stack = createStackNavigator();
const prefix = Linking.createURL("/");

// To test deep linking in emulator RUN IN COMMAND LINE: adb shell am start -a android.intent.action.VIEW -d "exp://IP:PORT/--/passtheplate/posts/[1 OR 2 OR 3, ...]" 
// To test in phone, transform this:    exp://IP ADDRESS:PORT/--/passtheplate/posts/1     into a tinyurl and then click on url
const linking = {
  prefixes: [prefix],
  config: {
    screens: {
      Landing: "Landing",
      MainApp: "MainApp",
    },
  },
};

const App = () => {

  const navigationRef = useNavigationContainerRef(); // Create a navigation reference

  useDeepLinkHandler(navigationRef); // Pass the navigation reference to the hook


  return (
    <AppStateProvider>
      <View style={{ flex: 1 }}>
        <StatusBar />
        <AuthProvider>
          <NavigationContainer linking={linking} fallback={<CustomText>Loading...</CustomText>} ref={navigationRef}>
            <Stack.Navigator initialRouteName="Landing" screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Landing" component={Landing} />
              <Stack.Screen name="Details" component={Details} />
              <Stack.Screen name="MainApp" component={MainApp} />
              <Stack.Screen name="PasswordReset" component={PasswordReset} />
              <Stack.Screen name="Settings" component={SettingsNav} />
              <Stack.Screen name="EditProfile" component={EditProfile} />
              <Stack.Screen name="mapView" component={mapView} />
              <Stack.Screen name="MainStack" component={MainStack} options={{ headerShown: false }}/>
            </Stack.Navigator>
          </NavigationContainer>
        </AuthProvider>
      </View>
    </AppStateProvider>
  );
};

export default App;
