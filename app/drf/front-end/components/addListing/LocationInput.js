import React, { useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const LocationInput = ({ handleAddressSelection }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <GooglePlacesAutocomplete
          placeholder="Enter Address"
          onPress={handleAddressSelection}
          query={{
            key: "AIzaSyBB5vOjixk-P19lYhkkiO7EVYfRu-4yp60", //DONT LEAK
            language: "en",
            components: "country:ca", // Restrict to Canada
          }}
          fetchDetails
          styles={styles.location}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default LocationInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  location: {
    textInputContainer: {
      backgroundColor: "white",
      borderTopWidth: 0,
      borderBottomWidth: 0,
      borderRadius: 10,
      elevation: 3,
    },
    textInput: {
      marginLeft: 0,
      marginRight: 0,
      height: 38,
      color: "#5d5d5d",
      fontSize: 16,
    },
    predefinedPlacesDescription: {
      color: "#1faadb",
    },
    poweredContainer: {
      justifyContent: "flex-end",
      alignItems: "center",
      borderBottomRightRadius: 5,
      borderBottomLeftRadius: 5,
      borderColor: "#c8c7cc",
      borderTopWidth: 0.5,
    },
  },
});
