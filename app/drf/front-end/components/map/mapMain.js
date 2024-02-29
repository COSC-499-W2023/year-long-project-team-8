import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import MapView, { Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import CustomText from "../CustomText";
import Slider from '@react-native-community/slider';
import { useSlider } from '../../context/MapContext';

import styles from './mapStyles';

const MapScreen = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const { sliderValue, setSliderValue } = useSlider();

    useEffect(() => {
        const requestLocationPermission = async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Location Permission Denied');
                return;
            }
            const currentLocation = await Location.getCurrentPositionAsync({});
            setLocation({
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
                latitudeDelta: 0.5,
                longitudeDelta: 0.5,
            });
        };

        requestLocationPermission().then(() => setErrorMsg("Location Permission Allowed"));
    }, []);

    return (
        <SafeAreaView style={styles.mainContainer}>
            <MapView style={styles.map} region={location}>
                <Slider
                    style={styles.slider}
                    minimumValue={1000}
                    maximumValue={25000}
                    value={sliderValue}
                    onValueChange={(value) => setSliderValue(value)}
                    thumbTintColor="#F8B951"
                    minimumTrackTintColor="#F8B951"
                    maximumTrackTintColor="#000000"
                />
                <CustomText style={styles.sliderText} fontType="text">
                    {Math.floor(sliderValue / 1000)} KM
                </CustomText>
                {location && (
                    <Circle
                        center={location}
                        radius={sliderValue}
                        strokeWidth={2}
                        strokeColor="#FCA63C"
                        fillColor="rgba(211,211,211,0.5)"
                    />
                )}
            </MapView>
        </SafeAreaView>
    );
};

export default MapScreen;
