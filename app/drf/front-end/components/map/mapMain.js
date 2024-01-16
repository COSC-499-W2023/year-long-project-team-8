import React, { useEffect, useState } from 'react';
import {Button, TouchableOpacity, View, Image} from 'react-native';
import MapView, { Circle } from 'react-native-maps';
import * as Location from 'expo-location';

const MapScreen = () => {
  const [currentPosition, setCurrentPosition] = useState(null);
  // radius is in meters
  const radius = 1500; //1.5km

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const latitudeDelta = (radius * 2) / 111000;
      const longitudeDelta = latitudeDelta / Math.cos(location.coords.latitude * Math.PI / 160);

      setCurrentPosition({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta,
        longitudeDelta,
      });
    })();
  }, []);

  const zoomIn = () => {
    setCurrentPosition(prevState => ({
      ...prevState,
      latitudeDelta: prevState.latitudeDelta / 1.5,
      longitudeDelta: prevState.longitudeDelta / 1.5,
    }));
  };

    const zoomOut = () => {
        setCurrentPosition(prevState => ({
        ...prevState,
        latitudeDelta: prevState.latitudeDelta * 1.5,
        longitudeDelta: prevState.longitudeDelta * 1.5,
        }));
    };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        region={currentPosition}
      >
        {currentPosition && (
          <Circle
            center={currentPosition}
            radius={radius}
            strokeWidth={1}
            strokeColor={"#1a66ff"}
            fillColor={"rgba(230,238,255,0.5)"}
          />
        )}
      </MapView>

    </View>
  );
};

export default MapScreen;

