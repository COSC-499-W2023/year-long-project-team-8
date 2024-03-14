import * as Location from 'expo-location';

const reverseGeocode = async (latitude, longitude) => {
  try {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      throw new Error('Permission to access location was denied');
    }

    let reverseGeo = await Location.reverseGeocodeAsync({ latitude, longitude });
    if (reverseGeo.length > 0) {
      return `${reverseGeo[0].city}, ${reverseGeo[0].region}`;
    } else {
      throw new Error('Reverse geocoding response is empty');
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error in reverse geocoding:', error.message);
    } else {
      console.error('Error in reverse geocoding:', error);
    }
    return null;
  }
};

export default reverseGeocode;
