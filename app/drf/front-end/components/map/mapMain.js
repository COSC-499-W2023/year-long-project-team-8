import React, { useEffect, useState } from 'react';
import {SafeAreaView, TouchableOpacity, Image, View, Pressable} from 'react-native';
import MapView, { Circle } from 'react-native-maps';

import * as Location from 'expo-location';
import CustomText from "../CustomText";
import { useNavigation } from "@react-navigation/native";
import Slider from '@react-native-community/slider';
import FilterModal from '../homePage/FilterModal.js'

import styles from './mapStyles';

const MapScreen = () => {

    const [location, setLocation] = useState(null);
    const [circleRadius, setCircleRadius] = useState(1000);
    const [errorMsg, setErrorMsg] = useState(null);
    const navigation = useNavigation();


    useEffect(() => {
        const requestLocationPermission = async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Location Permission Denied');
                return;
            }
            const currentLocation = await Location.getCurrentPositionAsync({});
        };

        requestLocationPermission().then(setErrorMsg("Location Permission Allowed"));
    }, []);

    const goBack = () => navigation.goBack();


    return (
        <View style={styles.mapContainer}>
            <MapView
                style={styles.map}
                initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
            >
                <Circle
          center={{ latitude: currentLocation.coords.latitude, longitude: currentLocation.coords.longitude }}
          radius={1000}
          fillColor="rgba(135, 206, 235, 0.5)"
          strokeColor="rgba(0,0,0,0.5)"
          strokeWidth={2}>

                </Circle>

            </MapView>
        </View>
    );
};

export default MapScreen;
