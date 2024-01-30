import React, { useEffect, useState } from 'react';
import { SafeAreaView, TouchableOpacity, Image} from 'react-native';
import MapView, { Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import CustomText from "../CustomText";
import { useNavigation } from "@react-navigation/native";
import Slider from '@react-native-community/slider';
import FilterModal from '../homePage/FilterModal.js'

import styles from './mapStyles';

const MapScreen = () => {
    const [circleRadius, setCircleRadius] = useState(1000);
    const [location, setLocation] = useState(null);
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
            setLocation({
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            });
        };

        requestLocationPermission().then(setErrorMsg("Location Permission Allowed"));
    }, []);

    const goBack = () => navigation.goBack();

    return (
        <SafeAreaView style={styles.mainContainer}>
            <MapView style={styles.map} region={location}>
                <TouchableOpacity onPress={goBack}>
                    <Image source={require("../../assets/back_arrow.png")} style={styles.backArrow} />
                </TouchableOpacity>
                <Slider
                    style={styles.slider}
                    minimumValue={1000}
                    maximumValue={25000}
                    value={circleRadius}
                    onValueChange={setCircleRadius}
                    thumbTintColor="#F8B951"
                    minimumTrackTintColor="#F8B951"
                    maximumTrackTintColor="#000000"
                />
                <CustomText style={styles.sliderText} fontType="text">
                    {Math.floor(circleRadius / 1000)} KM
                </CustomText>
                <Circle
                    center={location}
                    radius={circleRadius}
                    strokeWidth={2}
                    strokeColor="#FCA63C"
                    fillColor="rgba(211,211,211,0.5)"
                />
            </MapView>
        </SafeAreaView>
    );
};

export default MapScreen;