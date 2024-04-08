import React, {useState} from "react";
import {Image, StyleSheet, View} from "react-native";

const LocationIcon = () => {
      const [userData, setUserData] = useState(null);


    return (
        <View style={styles.imageContainer}>
            <Image
                style={styles.locationIcon}
                source={require("../../assets/images/map/location_icon.png")}
            />
            <Image
              source={
                userData?.profile_picture
                  ? { uri: userData.profile_picture }
                  : require("../../assets/icons/profile.png")
              }
              style={styles.profilePicture}
            />
        </View>
    );
};

export default LocationIcon;

const styles = StyleSheet.create({
  imageContainer: {
    position: "relative",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  locationIcon: {
    width: 50,
    height: 50,
  },
  profilePicture: {
    position: "absolute",
    top: 3,
    left: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});
