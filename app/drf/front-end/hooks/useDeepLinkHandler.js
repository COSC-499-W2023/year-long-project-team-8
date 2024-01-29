import { useEffect } from 'react';
import * as Linking from 'expo-linking';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useDeepLinkHandler = () => {
  useEffect(() => {
    const handleDeepLink = (event) => {
      const data = Linking.parse(event.url);
      if (data.path && data.path.startsWith('passtheplate/posts/')) {
        const listingId = data.path.replace('passtheplate/posts/', '');
        AsyncStorage.setItem('pendingListingId', listingId);
        console.log(listingId);
      }
    };

    Linking.getInitialURL().then((url) => {
      if (url) handleDeepLink({ url });
    });

    const subscription = Linking.addEventListener('url', handleDeepLink);

    return () => subscription.remove();
  }, []);
};
