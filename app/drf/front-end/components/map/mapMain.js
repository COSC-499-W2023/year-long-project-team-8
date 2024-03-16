import React, { useEffect, useState, useContext, useRef } from "react";
import { Dimensions, SafeAreaView, View, Linking, Modal } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import CustomText from "../CustomText";
import Slider from "@react-native-community/slider";
import { useSlider } from "../../context/MapContext";
import styles from "./mapStyles";
import { getProductList, getUserData } from "../helperFunctions/apiHelpers";
import AuthContext from "../../context/AuthContext";
import { useAppState } from "../../context/AppStateContext";
import PostPreviewModal from "./postPreviewModal"; // Import the PostModal component

const MapScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const { sliderValue, setSliderValue } = useSlider();
  const [posts, setPosts] = useState([]);
  const { authTokens } = useContext(AuthContext);
  const { postCreated } = useAppState();
  const [selectedPost, setSelectedPost] = useState(null); // State to track selected post
  const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility

  const mapRef = useRef(null);

  const fetchFoodListings = async () => {
    try {
      const productList = await getProductList(authTokens);
      const listingsWithAdditionalData = await Promise.all(
        productList.results.map(async (post) => {
          try {
            const ownerDetails = await getUserData(post.owner, authTokens);
            return { ...post, ownerDetails };
          } catch (error) {
            console.error(
              "Error fetching additional data for listing:",
              post.id,
              error
            );
            return post;
          }
        })
      );
      setPosts(listingsWithAdditionalData);
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
        {location && posts && (
          <>
            {posts
              .filter((post) => post.latitude && post.longitude)
              .map((post) => (
                <Marker
                  key={post.id}
                  coordinate={{
                    latitude: post.latitude,
                    longitude: post.longitude,
                  }}
                  onPress={() => handleMarkerPress(post)}
                />
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
          // Zoom logic here
        }}
        thumbTintColor="#F8B951"
        minimumTrackTintColor="#F8B951"
        maximumTrackTintColor="#000000"
      />
      <CustomText style={styles.sliderText} fontType="text">
        {Math.floor(sliderValue / 1000)} KM
      </CustomText>

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
