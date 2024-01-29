import { useEffect, useState } from 'react';
import * as Linking from 'expo-linking';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState } from 'react-native';

export const useDeepLinkHandler = (navigation) => {
  const [appState, setAppState] = useState(AppState.currentState);
  const [receivedDeepLinkInBackground, setReceivedDeepLinkInBackground] = useState(false);

  const handleDeepLink = async (event) => {
    console.log("Received deep link URL:", event.url);
    if (event.url) {
      setReceivedDeepLinkInBackground(true); // Mark that a deep link was received while in background
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
        navigation.navigate('Landing');
      }
    }
    setAppState(nextAppState);
  };

  useEffect(() => {
    // Process the initial URL only if no deep link was received while in background
    const handleInitialURL = async () => {
      if (!receivedDeepLinkInBackground) {
        const initialURL = await Linking.getInitialURL();
        if (initialURL) {
          console.log("Initial URL:", initialURL);
          handleDeepLink({ url: initialURL });
        }
      }
    };

    handleInitialURL();

    const linkingSubscription = Linking.addEventListener('url', handleDeepLink);
    const appStateSubscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      linkingSubscription.remove();
      appStateSubscription.remove();
    };
  }, [appState, navigation, receivedDeepLinkInBackground]);
};
