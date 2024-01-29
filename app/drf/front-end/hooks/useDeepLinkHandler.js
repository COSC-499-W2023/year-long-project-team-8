import { useEffect, useState } from 'react';
import * as Linking from 'expo-linking';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState } from 'react-native';

export const useDeepLinkHandler = (navigation) => {
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const handleDeepLink = async (event) => {
      console.log("Received deep link URL:", event.url);
      if (event.url){
        const data = Linking.parse(event.url);
        if (data.path && data.path.startsWith('passtheplate/posts/')) {
          const listingId = data.path.replace('passtheplate/posts/', '');
          await AsyncStorage.setItem('pendingListingId', listingId);
        }
      }
      };

    const handleAppStateChange = async (nextAppState) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        const storedListingId = await AsyncStorage.getItem('pendingListingId');
        if (storedListingId) {
          // Ensure the user is redirected to the login screen
          // and the listingId is handled appropriately after login
          console.log(storedListingId);
          navigation.navigate('Landing');
        }
      }
      setAppState(nextAppState);
    };

    Linking.getInitialURL().then(handleDeepLink);
    const linkingSubscription = Linking.addEventListener('url', handleDeepLink);
    const appStateSubscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      linkingSubscription.remove();
      appStateSubscription.remove();
    };
  }, [appState, navigation]);
};
