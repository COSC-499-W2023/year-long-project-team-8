import React, { useState, useEffect } from 'react';
import { View, Text, Switch, Button, Alert } from 'react-native';
import * as Location from 'expo-location';

const LocationPermissionScreen = () => {
  const [locationEnabled, setLocationEnabled] = useState(false);

  useEffect(() => {
    checkLocationPermission();
  }, []);

  const checkLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      setLocationEnabled(true);
    }
  };

  const toggleLocationSwitch = async (value) => {
    if (value) {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Please enable location services in settings to use this feature.');
        setLocationEnabled(false);
      } else {
        setLocationEnabled(true);
      }
    } else {
      setLocationEnabled(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Allow app to access your location?</Text>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={locationEnabled ? '#f4f3f4' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleLocationSwitch}
        value={locationEnabled}
      />
      <Button
        title="Continue"
        onPress={() => {
          // Navigate to the next screen or perform any necessary action
        }}
        disabled={!locationEnabled}
      />
    </View>
  );
};

export default LocationPermissionScreen;
