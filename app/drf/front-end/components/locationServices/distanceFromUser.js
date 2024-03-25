import React, { useEffect, useState } from "react";
import { View } from "react-native";
import * as Location from "expo-location";
import CustomText from "../CustomText";

const DistanceComponent = ({ postLat, postLong }) => {
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    const distanceFromUser = async () => {
      const getUserLocation = async () => {
        try {
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== "granted") {
            console.log("Location Permission Denied");
            return;
          }

          const location = await Location.getCurrentPositionAsync({});
          const userLat = location.coords.latitude;
          const userLong = location.coords.longitude;
          console.log("User Latitude: ", userLat);
          console.log("User Longitude: ", userLong);

          return { latitude: userLat, longitude: userLong };
        } catch (error) {
          console.error("Error fetching location:", error.message);
          return null;
        }
      };

      const distanceBetween = (userLocation, postLat, postLong) => {
        const earthRadius = 6371;
        const { latitude: userLat, longitude: userLong } = userLocation;

        const dLat = ((postLat - userLat) * Math.PI) / 180;
        const dLong = ((postLong - userLong) * Math.PI) / 180;

        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos((userLat * Math.PI) / 180) *
            Math.cos((postLat * Math.PI) / 180) *
            Math.sin(dLong / 2) *
            Math.sin(dLong / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return earthRadius * c;
      };

      const userLocation = await getUserLocation();
      const distance = distanceBetween(userLocation, postLat, postLong);
      console.log("Distance between user and post:", distance, "km");
      setDistance(distance);
    };

    distanceFromUser();
  }, [postLat, postLong]);

  return (
    <View>
      <CustomText>
        Distance: {distance ? `${distance.toFixed(2)} km` : "Calculating..."}
      </CustomText>
    </View>
  );
};

export default DistanceComponent;
