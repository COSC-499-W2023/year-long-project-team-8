import React, { useEffect, useState, useContext, useRef } from "react";
import { SafeAreaView, View, Modal, Image } from "react-native";
import MapView, { Marker, Circle } from "react-native-maps";
import * as Location from "expo-location";
import CustomText from "../CustomText";
import Slider from "@react-native-community/slider";
import { useSlider } from "../../context/MapContext";
import styles from "./mapStyles";
import { getProductList, getUserData } from "../helperFunctions/apiHelpers";
import AuthContext from "../../context/AuthContext";
import { useAppState } from "../../context/AppStateContext";
import PostPreviewModal from "./postPreviewModal";

const MapScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const { sliderValue, setSliderValue } = useSlider();
  const [posts, setPosts] = useState([]);
  const { authTokens, userId } = useContext(AuthContext);
  const { postCreated } = useAppState();
  const [selectedPost, setSelectedPost] = useState(null); // State to track selected post
  const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility

  const mapRef = useRef(null);

  //   const fetchFoodListings = async () => {
  //     try {
  //       const productList = await getProductList(authTokens);
  //       const listingsWithAdditionalData = await Promise.all(
  //         productList.results.map(async (post) => {
  //           try {
  //             const ownerDetails = await getUserData(post.owner, authTokens);
  //             return { ...post, ownerDetails };
  //           } catch (error) {
  //             console.error(
  //               "Error fetching additional data for listing:",
  //               post.id,
  //               error
  //             );
  //             return post;
  //           }
  //         })
  //       );
  //       setPosts(listingsWithAdditionalData);
  //     } catch (error) {
  //       console.error("Error fetching food listings:", error);
  //     }
  //   };

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
      const filteredListings = listingsWithAdditionalData.filter((post) => {
        const isOwner = post.owner !== userId;
        const isNotExpired = new Date(post.best_before) >= new Date();
        const isAvailable = !post.pickedUp;
        return isOwner && isNotExpired && isAvailable;
      });
      setPosts(filteredListings);
    } catch (error) {
      console.error("Error fetching food listings:", error);
    }
  };

  useEffect(() => {
    fetchFoodListings();
  }, []);

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Location Permission Denied");
          return;
        }
        const currentLocation = await Location.getCurrentPositionAsync({});
        const defaultDelta = 5000 / 40000;
        setLocation({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: defaultDelta,
          longitudeDelta: defaultDelta,
        });
        setErrorMsg("Location Permission Allowed");
      } catch (error) {
        setErrorMsg("Error fetching location: " + error.message);
      }
    };
    requestLocationPermission();
  }, []);

  const handleMarkerPress = (post) => {
    setSelectedPost(post);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <MapView ref={mapRef} style={styles.map} region={location}>
        {location && (
          <Circle
            center={location}
            radius={sliderValue * 1000}
            strokeColor="rgba(248, 185, 81, 0.7)"
            fillColor="rgba(248, 185, 81, 0.3)"
          />
        )}
        {posts &&
          posts
            .filter((post) => post.latitude && post.longitude)
            .map((post) => (
              <Marker
                key={post.id}
                coordinate={{
                  latitude: post.latitude,
                  longitude: post.longitude,
                }}
                onPress={() => handleMarkerPress(post)}
                style={styles.marker}
              >
                <View style={styles.customMarker}>
                  <Image
                    source={{ uri: post.images[0].image }}
                    style={styles.markerImage}
                  />
                </View>
              </Marker>
            ))}
      </MapView>
      <View style={styles.sliderContainer}>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={25}
          value={sliderValue}
          onValueChange={(value) => {
            setSliderValue(value);
            if (location) {
              const newLatitudeDelta = value / 35;
              const newLongitudeDelta = value / 35;
              mapRef.current.animateToRegion({
                ...location,
                latitudeDelta: newLatitudeDelta,
                longitudeDelta: newLongitudeDelta,
              });
            }
          }}
          thumbTintColor="#F8B951"
          minimumTrackTintColor="#F8B951"
          maximumTrackTintColor="#000000"
        />

        <CustomText style={styles.sliderText} fontType="text">
          {Math.floor(sliderValue)} KM
        </CustomText>
      </View>

      {/* Post modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <PostPreviewModal
            visible={modalVisible}
            post={selectedPost}
            onClose={() => setModalVisible(false)}
            navigation={navigation}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default MapScreen;
