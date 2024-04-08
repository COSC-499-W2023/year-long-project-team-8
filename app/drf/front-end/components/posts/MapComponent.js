import React from "react";
import { View, TouchableOpacity, StyleSheet, Linking } from "react-native";
import MapView, { Marker } from "react-native-maps";
import CustomText from "../CustomText";

const MapComponent = ({ postLocation, postTitle }) => {
  const getDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${postLocation.latitude},${postLocation.longitude}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: postLocation.latitude,
          longitude: postLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker coordinate={postLocation} title={postTitle} />
      </MapView>
      <TouchableOpacity style={styles.directionsButton} onPress={getDirections}>
        <CustomText style={styles.directionsButtonText}>
          Get Directions
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 20,
    position: "relative",
    borderRadius: 20,
  },
  map: {
    width: "100%",
    height: 200,
    borderRadius: 20,
  },
  distanceText: {
    marginTop: 10,
    fontSize: 16,
  },
  directionsButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#007BFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  directionsButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default MapComponent;
