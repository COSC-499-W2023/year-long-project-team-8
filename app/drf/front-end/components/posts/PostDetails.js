import React, { useState, useContext, useEffect } from "react";
import { View, ScrollView, Alert } from "react-native";
import CustomText from "../CustomText";
import styles from "./styles";
import {
  getUserData,
  updateProduct,
  deleteProduct,
} from "../helperFunctions/apiHelpers";
import AuthContext from "../../context/AuthContext";
import { useFocusEffect } from "@react-navigation/native";
import DetailsComponent from "./DetailsComponent";
import ChatComponent from "./ChatComponent";
import CarouselComponent from "./CarouselComponent";
import CategoriesComponent from "./CategoriesComponent";
import DescriptionComponent from "./DescriptionComponent";
import AllergensComponent from "./AllergensComponent";
import MapComponent from "./MapComponent";
import { useAppState } from "../../context/AppStateContext";
import * as Location from "expo-location";
import { calculateDistance } from "../locationServices/calculateDistance";

const PostDetails = ({ route, navigation }) => {
  const { listing } = route.params;
  const [message, onChangeMesage] = React.useState("Hi! Can I get this plate?");
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const { authTokens, userId } = useContext(AuthContext);
  const { updatePostCreated } = useAppState();
  const [distance, setDistance] = useState(null);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
      date
    );
  };

  // function to get username or first name for user that did the listing
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const data = await getUserData(listing.owner, authTokens);
        setUserDetails(data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [listing.owner]);

  const getDisplayName = () => {
    if (userDetails) {
      return userDetails.firstname || userDetails.email.split("@")[0];
    }
    return "Unknown";
  }; // Can't access user's rating. Need to add field profile picture too.

  // Helper function to display name or email
  const displayName = getDisplayName();

  //get user rating from userDetails or set to 5 if null
  const userRating =
    userDetails && userDetails.rating
      ? parseFloat(userDetails.rating).toFixed(1)
      : "5.0";

  // function to reset fields when user navigates out of listing
  useFocusEffect(
    React.useCallback(() => {
      // No operation when the screen comes into focus
      return () => {
        // Reset the message and the view more/less toggle when the screen goes out of focus
        onChangeMesage("Hi! Can I get this plate?");
        setShowFullDescription(false);
      };
    }, [])
  );

  // const handlePickedUp = async () => {
  //   const formData = {
  //     pickedUp: true,
  //   };

  //   try {
  //     await updateProduct(formData, null, authTokens, listing.id);
  //     await updatePostCreated();

  //     Alert.alert("Success", "The post has been marked as picked up!", [
  //       { text: "OK", onPress: () => navigation.navigate("Home") },
  //     ]);
  //   } catch (error) {
  //     console.error("Error marking post as picked up:", error);
  //     Alert.alert(
  //       "Error",
  //       "An error occurred while marking the post as picked up."
  //     );
  //   }
  // };

  // const handleNotPickedUp = async () => {
  //   const formData = {
  //     pickedUp: false,
  //   };

  //   try {
  //     await updateProduct(formData, null, authTokens, listing.id);
  //     await updatePostCreated();

  //     Alert.alert("Success", "The post has been marked as available!", [
  //       { text: "OK", onPress: () => navigation.navigate("Home") },
  //     ]);
  //   } catch (error) {
  //     console.error("Error marking post as available:", error);
  //     Alert.alert(
  //       "Error",
  //       "An error occurred while marking the post as available."
  //     );
  //   }
  // };

  // const handleDeleteButton = async () => {
  //   // Show confirmation dialog
  //   Alert.alert(
  //     "Delete Post",
  //     "Are you sure you want to delete this post?",
  //     [
  //       {
  //         text: "Cancel",
  //         style: "cancel",
  //       },
  //       {
  //         text: "Delete",
  //         onPress: async () => {
  //           // If user confirms, proceed with deletion
  //           await deleteProduct(authTokens, listing.id);
  //           await updatePostCreated();
  //           navigation.navigate("Home");
  //         },
  //       },
  //     ],
  //     { cancelable: false }
  //   );
  // };

  const isExpired = new Date(listing.best_before) < new Date();
  const currentDate = new Date();
  const oneDayFromNow = new Date();
  oneDayFromNow.setDate(oneDayFromNow.getDate() + 1);
  const almostExpired =
    new Date(listing.best_before) < oneDayFromNow &&
    new Date(listing.best_before) >= currentDate;

  const myPost = userId == listing.owner;
  const pickedUp = listing.pickedUp;
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // Function to get the user's location and calculate the distance
    const getLocationAndDistance = async () => {
      try {
        if (!listing.latitude || !listing.longitude) {
          console.warn("Latitude or longitude not set for the listing");
          return;
        }

        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.error("Permission to access location was denied");
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const userLocation = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        setUserLocation(userLocation);

        const calculatedDistance = calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          listing.latitude,
          listing.longitude
        );
        setDistance(calculatedDistance);
      } catch (error) {
        console.error("Error getting location and distance:", error);
      }
    };

    getLocationAndDistance();
  }, [listing.latitude, listing.longitude]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollview}>
        {/*Carousel*/}
        <CarouselComponent images={listing.images} />

        <View style={styles.card}>
          <View style={styles.titleAndTagRow}>
            <CustomText fontType={"title"} style={styles.title}>
              {listing.title}
            </CustomText>
          </View>

          <View style={styles.tagContainer}>
            {isExpired && (
              <View style={styles.expiredTag}>
                <CustomText fontType={"expired"} style={styles.expiredText}>
                  Expired
                </CustomText>
              </View>
            )}
            {almostExpired && (
              <View style={styles.almostExpiredTag}>
                <CustomText fontType={"expired"} style={styles.expiredText}>
                  Expires Soon!
                </CustomText>
              </View>
            )}
            {pickedUp && (
              <View style={styles.pickedUpTag}>
                <CustomText fontType={"expired"} style={styles.expiredText}>
                  Picked Up!
                </CustomText>
              </View>
            )}
          </View>

          <CustomText fontType={"text"} style={styles.distanceText}>
            {distance !== null
              ? `${distance < 1 ? "Less than 1 km away" : `${distance} km away`}`
              : ""}
          </CustomText>

          <CustomText fontType={"subHeader"} style={styles.bestBefore}>
            Best Before: {formatDate(listing.best_before)}
          </CustomText>

          {/*Chat Section*/}
          {!myPost && (
            <ChatComponent
              navigation={navigation}
              initialMessage="Hi! Can I get this plate?"
              listing={listing}
            />
          )}
          {/* {myPost && !pickedUp && (
            <View style={styles.buttonContainer}>
              <DeleteButton
                title="REMOVE POST"
                onPress={handleDeleteButton}
                style={styles.buttonStyle}
              />
              <PickedUpButton
                title="PICKED UP"
                onPress={handlePickedUp}
                style={styles.buttonStyle}
              />
            </View>
          )}
          {myPost && pickedUp && (
            <View style={styles.buttonContainer}>
              <DeleteButton
                title="REMOVE POST"
                onPress={handleDeleteButton}
                style={styles.buttonStyle}
              />
              <NotPickedUpButton
                title="AVAILABLE?"
                onPress={handleNotPickedUp}
                style={styles.buttonStyle}
              />
            </View>
          )} */}
          {listing.latitude && listing.longitude && (
            <MapComponent
              userLocation={userLocation}
              postLocation={{
                latitude: listing.latitude,
                longitude: listing.longitude,
              }}
              postTitle={listing.title}
            />
          )}

          {/*Category Section*/}
          <CategoriesComponent categories={listing.categories} />

          {/*Description Section*/}
          <DescriptionComponent
            content={listing.content}
            showFullDescription={showFullDescription}
            setShowFullDescription={setShowFullDescription}
            myPost={myPost}
          />

          {/*Giver details Section*/}
          <DetailsComponent
            displayName={displayName}
            rating={userRating}
            reviews={
              userDetails && userDetails.received_reviews
                ? userDetails.received_reviews.length
                : 0
            }
            userProfilePicture={
              userDetails && userDetails.profile_picture
                ? userDetails.profile_picture
                : null
            }
            navigation={navigation}
            userId={listing.owner}
            myPost={myPost}
          />

          {/* Conditionally display allergens */}
          {listing.allergens && listing.allergens.length > 0 && (
            <>
              <AllergensComponent allergens={listing.allergens} />
            </>
          )}

          <View style={styles.dividerContainer}>
            <CustomText fontType={"subHeader"} style={styles.bestBefore}>
              Posted {formatDate(listing.created_at)}
            </CustomText>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default PostDetails;
