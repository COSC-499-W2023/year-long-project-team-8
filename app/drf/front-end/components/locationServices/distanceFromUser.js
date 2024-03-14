import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import * as Location from 'expo-location';

const DistanceComponent = () => {
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    const distanceFromUser = async () => {
      const getUserLocation = async () => {
        try {
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            console.log('Location Permission Denied');
            return;
          }

          const location = await Location.getCurrentPositionAsync({});
          const userLat = 49.941013;
          const userLong = -119.396912;
          console.log('User Latitude: ', userLat);
          console.log('User Longitude: ', userLong);

          return { latitude: userLat, longitude: userLong };

        } catch (error) {
          console.error('Error fetching location:', error.message);
          return null;
        }
      };

      // TODO: put the posts actual location here once implemented in the backend
      const postLocation = () => {
        const postLat = location.coords.latitude;
        const postLong = location.coords.longitude;
        console.log('Post Latitude: ', postLat);
        console.log('Post Longitude', postLong);

        return { latitude: postLat, longitude: postLong };

      };

      const distanceBetween = (userLocation, postLocation) => {
        const earthRadius = 6371;
        const { latitude: userLat, longitude: userLong } = userLocation;
        const { latitude: postLat, longitude: postLong } = postLocation;

        const dLat = (postLat - userLat) * Math.PI / 180;
        const dLong = (postLong - userLong) * Math.PI / 180;

        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(userLat * Math.PI / 180) * Math.cos(postLat * Math.PI / 180) *
                  Math.sin(dLong / 2) * Math.sin(dLong / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return earthRadius * c;
      };

      const userLocation = await getUserLocation();
      const postLoc = postLocation();
      const distance = distanceBetween(userLocation, postLoc);
      console.log('Distance between user and post:', distance, 'km');
      setDistance(distance);
    };

    distanceFromUser();
  }, []);
};

export default DistanceComponent;
