import { createStackNavigator } from "@react-navigation/stack";
import BottomTabs from "../tabs/BottomTabs";
import PostDetails from "../posts/PostDetails";
import UserMessages from "../chat/UserMessages";
import ChatList from "../chat/ChatList";
import OtherProfile from "../othersProfile/OtherProfile";
import Landing from "../landing/Landing";
import Details from "../loginSignup/Details.js";
import MainApp from "../drawer/DrawerNav.js";
import PasswordReset from "../loginSignup/PasswordReset";
import SettingsNav from "../settingsPage/Settings.js";
import EditProfile from "../editProfile/editProfileMain.js";
import mapView from "../map/mapMain";

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Landing"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Landing"
        component={Landing}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Tabs"
        component={BottomTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PostDetails"
        component={PostDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OtherProfile"
        component={OtherProfile}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Details"
        component={Details}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PasswordReset"
        component={PasswordReset}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsNav}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="mapView"
        component={mapView}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UserMessages"
        component={UserMessages}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChatList"
        component={ChatList}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
