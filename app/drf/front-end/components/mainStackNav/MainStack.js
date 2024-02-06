import { createStackNavigator } from '@react-navigation/stack';
import BottomTabs from '../tabs/BottomTabs'; 
import PostDetails from '../posts/PostDetails';
import Chat from '../chat/chat';
import ChatList from '../chat/ChatList';
import MapScreen from "../map/mapMain";
import DrawerNav from '../drawer/DrawerNav';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Tabs" component={BottomTabs} options={{ headerShown: false }} />
        <Stack.Screen name="PostDetails" component={PostDetails} options={{ headerShown: false }} />
        <Stack.Screen name="ChatList" component={ChatList} />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    );
  };
  

export default MainStackNavigator;
