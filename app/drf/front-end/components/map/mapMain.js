import React, { useEffect, useState, useContext } from "react";
import {
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import MapView, { Circle, Marker } from "react-native-maps";
import * as Location from "expo-location";
import CustomText from "../CustomText";
import Slider from "@react-native-community/slider";
import { useSlider } from "../../context/MapContext";
import styles from "./mapStyles";
import { getProductList, getUserData } from "../helperFunctions/apiHelpers"; // Import getProductList function
import { Platform } from "react-native";
import AuthContext from "../../context/AuthContext";
import { useAppState } from "../../context/AppStateContext";

const MapScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const { sliderValue, setSliderValue } = useSlider();
  const [posts, setPosts] = useState([]);
  const { authTokens } = useContext(AuthContext);
  const { postCreated } = useAppState();

  const fetchFoodListings = async () => {
    try {
      const productList = await getProductList(authTokens); // Fetch listings
      const listingsWithAdditionalData = await Promise.all(
        productList.results.map(async (post) => {
          try {
            // Fetch additional data for each listing here (e.g., owner details)
            const ownerDetails = await getUserData(post.owner, authTokens);
            // Combine the listing with its additional data
            return { ...post, ownerDetails };
          } catch (error) {
            console.error(
              "Error fetching additional data for listing:",
              post.id,
              error
            );
            // Return the listing without additional data if there's an error
            return post;
          }
        })
      );
      setPosts(listingsWithAdditionalData); // Update state with enriched listings
    } catch (error) {
      console.error("Error fetching food listings:", error);
    }
  };

  useEffect(() => {
    console.log("Fetching food listings...");
    fetchFoodListings();
    console.log("Posts in map: ", JSON.stringify(posts));
  }, []);

  useEffect(() => {
    fetchFoodListings();
    console.log("Posts in map tirggered: ", JSON.stringify(posts));
  }, [postCreated]);

  useEffect(() => {
    fetchFoodListings();
    console.log("Posts in map tirggered new funccy: ", JSON.stringify(posts));
    const requestLocationPermission = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Location Permission Denied");
          return;
        }
        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });
        setErrorMsg("Location Permission Allowed");
      } catch (error) {
        setErrorMsg("Error fetching location: " + error.message);
      }
    };
    requestLocationPermission();
  }, []);

  const zoomWithMap = (radius) => {
    const latDelta = radius * 0.00003;
    const longDelta = radius * 0.00003;

    setLocation((prevLocation) => ({
      ...prevLocation,
      longitudeDelta: longDelta,
      latitudeDelta: latDelta,
    }));
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <MapView style={styles.map} region={location}>
        {location && posts && (
          <>
            {/* Render markers for posts with valid latitude and longitude */}
            {posts
              .filter((post) => post.latitude && post.longitude)
              .map((post) => (
                <Marker
                  key={post.id}
                  coordinate={{
                    latitude: post.latitude,
                    longitude: post.longitude,
                  }}
                  onPress={() => {
                    console.log("Marker pressed:", post);
                    navigation.navigate("PostDetails", { listing: post });
                  }}
                  // Handle press event
                >
                  {/* Custom marker component using the post image */}
                  {/* <Image
                    source={{ uri: post.images[0].image }} // Assuming the image URL is stored in the 'image' field of the post object
                    style={{ width: 40, height: 40 }} // Adjust the size of the marker image as needed
                  /> */}
                </Marker>
              ))}
          </>
        )}
      </MapView>
      <Slider
        style={styles.slider}
        minimumValue={1000}
        maximumValue={25000}
        value={sliderValue}
        onValueChange={(value) => {
          setSliderValue(value);
          zoomWithMap(value);
        }}
        thumbTintColor="#F8B951"
        minimumTrackTintColor="#F8B951"
        maximumTrackTintColor="#000000"
      />
      <CustomText style={styles.sliderText} fontType="text">
        {Math.floor(sliderValue / 1000)} KM
      </CustomText>
    </SafeAreaView>
  );
};

export default MapScreen;
