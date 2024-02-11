import React, { useEffect, useState } from 'react';
import {View, TouchableOpacity, Text, Image, Platform, StyleSheet, SafeAreaView} from 'react-native';
import MapView, { Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import styles from './mapStyles';
import Slider from '@react-native-community/slider';

const MapScreen = () => {
    const [location, setLocation] = useState(null);
    const [circleRadius, setCircleRadius] = useState(1000);
    const [errorMsg, setErrorMsg] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Location Permission Denied');
                return;
            }

            const currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation.coords);
        })();
    }, []);

    const goBack = () => navigation.goBack();

    return (
        <View style={{ flex: 1 }}>
            {location && (
                <MapView
                    style={StyleSheet.absoluteFillObject}
                    showsUserLocation={true}
                    followUserLocation={true}
                    initialRegion={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                    }}
                >
                    <Circle
                        center={{ latitude: location.latitude, longitude: location.longitude }}
                        radius={circleRadius}
                        fillColor="rgba(248, 185, 81, 0.3)"
                        strokeColor="#DB6D2A"
                        strokeWidth={1}
                    />
                    {Platform.OS === 'ios' && (
                        <TouchableOpacity style={styles.backButton} onPress={goBack}>
                            <Image source={require('../../assets/back_arrow.png')} style={styles.backButtonImage} />
                        </TouchableOpacity>
                    )}
                    <View style={styles.sliderContainer}>
                        <Slider
                            style={styles.slider}
                            minimumValue={1000}
                            maximumValue={25000}
                            step={1000}
                            value={circleRadius}
                            onValueChange={setCircleRadius}
                            minimumTrackTintColor="#F8B951"
                            maximumTrackTintColor="#000000"
                            thumbTintColor="#FFFFFF"
                        />
                        <Text style={styles.sliderText}>{circleRadius / 1000} km</Text>
                    </View>
                </MapView>
            )}
            {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}
        </View>
    );
};

export default MapScreen;
