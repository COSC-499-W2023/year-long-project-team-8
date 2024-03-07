/*
import * as Location from 'expo-location';

const reverseGeocode = async (latitude, longitude) => {
  try {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission to access location was denied');
      return null;
    }

    let reverseGeo = await Location.reverseGeocodeAsync({ latitude, longitude });
    if (reverseGeo.length > 0) {
      return `${reverseGeo[0].city}, ${reverseGeo[0].region}`;
    }
  } catch (error) {
    console.error('Error in reverse geocoding:', error);
    return null;
  }
};

export default reverseGeocode;

 */
