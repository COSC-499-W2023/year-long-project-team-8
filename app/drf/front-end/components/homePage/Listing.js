import React, { useRef } from "react";
import { View, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { Card } from "react-native-paper";
import CustomText from "../CustomText";
import { MaterialIcons } from "@expo/vector-icons";

const Listing = ({ listing, navigation, userLocation }) => {
  const scaleValue = useRef(new Animated.Value(1)).current; // Initial scale is 1

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance; // Return distance with two decimal points
  };

  // Get the distance between the user and the post
  const postDistance = userLocation
    ? calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        listing.latitude,
        listing.longitude
      )
    : "N/A";
  const zoomIn = () => {
    Animated.spring(scaleValue, {
      toValue: 1.05, // Zoom in to 105%
      useNativeDriver: true, // Use native driver for better performance
    }).start();
  };

  const zoomOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1, // Zoom out back to 100%
      useNativeDriver: true,
    }).start();
  };

  const getDisplayName = () =>
    listing.ownerDetails?.firstname ||
    listing.ownerDetails?.email.split("@")[0] ||
    "Unknown";

  const getDisplayRating = () => {
    // Check if ownerDetails and rating exist
    if (listing.ownerDetails && listing.ownerDetails.rating) {
      // Round the rating to the nearest whole number
      return Math.round(listing.ownerDetails.rating);
    }
    return "New User"; // Default text if rating is not available
  };

  const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.round((now - date) / 1000);
    const minutes = Math.round(seconds / 60);
    const hours = Math.round(minutes / 60);
    const days = Math.round(hours / 24);
    const months = Math.round(days / 30);
    const years = Math.round(months / 12);

    if (seconds < 60) {
      return `Just Now`;
    } else if (minutes < 60) {
      return `Just Now`;
    } else if (hours < 2) {
      return `${hours} hour ago`;
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else if (days < 2) {
      return `${days} day ago`;
    } else if (days < 30) {
      return `${days} days ago`;
    } else if (months < 2) {
      return `${months} month ago`;
    } else if (months < 12) {
      return `${months} months ago`;
    } else {
      return `${years} years ago`;
    }
  };

  // Check if the best_before date is after today
  const isExpired = new Date(listing.best_before) < new Date();

  const currentDate = new Date();
  const oneDayFromNow = new Date();
  oneDayFromNow.setDate(oneDayFromNow.getDate() + 1);
  const almostExpired =
    new Date(listing.best_before) < oneDayFromNow &&
    new Date(listing.best_before) >= currentDate;
  const pickedUp = listing.pickedUp;
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPressIn={zoomIn}
      onPressOut={zoomOut}
      onPress={() => navigation.navigate("PostDetails", { listing })}
    >
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        <Card style={styles.card}>
          {listing.images && listing.images.length > 0 && (
            <Card.Cover
              source={{ uri: listing.images[0].image }}
              style={styles.cardImage}
            />
          )}
          <CustomText fontType={"title"} style={styles.cardTitle}>
            {listing.title}
          </CustomText>
          <View style={styles.nameAndRatingContainer}>
            <CustomText fontType={"text"} style={styles.byName}>
              By {getDisplayName()}
            </CustomText>
            <MaterialIcons
              name="star"
              size={16}
              color="gold"
              style={styles.star}
            />
            <CustomText fontType={"subHeader"} style={styles.rating}>
              {getDisplayRating()}
            </CustomText>
          </View>
          <View style={styles.dateContainer}>
            <CustomText fontType={"subHeader"} style={styles.datePosted}>
              {timeAgo(listing.created_at)}
            </CustomText>
            {/* {isExpired && !pickedUp && (
              <View style={styles.expiredBox}>
                <CustomText fontType={"expired"} style={styles.expiredText}>
                  Expired
                </CustomText>
              </View>
            )} */}
            {almostExpired && !pickedUp && (
              <View style={styles.almostExpiredBox}>
                <CustomText fontType={"expired"} style={styles.expiredText}>
                  Expires Soon!
                </CustomText>
              </View>
            )}
            {/* {pickedUp && (
              <View style={styles.pickedUpBox}>
                <CustomText fontType={"expired"} style={styles.expiredText}>
                  Picked Up!
                </CustomText>
              </View>
            )} */}
          </View>
          <View style={styles.distanceContainer}>
            <CustomText style={styles.distanceText}>
              {postDistance !== null
                ? postDistance < 1
                  ? "Less than 1 km"
                  : `${postDistance.toFixed(0)} km`
                : "N/A"}
            </CustomText>
          </View>
        </Card>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default Listing;

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    borderRadius: 5,
    backgroundColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  cardImage: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: "100%",
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 18,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    color: "black",
  },
  nameAndRatingContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  star: {
    paddingLeft: 10,
    paddingRight: 2,
  },
  rating: {
    fontSize: 16,
    color: "grey",
  },
  byName: {
    fontSize: 16,
    color: "grey",
    marginTop: 0,
    paddingLeft: 10,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  datePosted: {
    fontSize: 14,
    color: "grey",
  },
  distanceText: {
    position: "absolute",
    fontSize: 14,
    color: "grey",
    right: 2,
    paddingRight: 10,
  },
  expiredBox: {
    backgroundColor: "#FF5733",
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  expiredText: {
    color: "white",
    fontSize: 14,
  },
  almostExpiredBox: {
    backgroundColor: "orange",
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  pickedUpBox: {
    backgroundColor: "#3FC080",
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  distanceContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 5,
    borderRadius: 5,
  },
  distanceText: {
    fontSize: 14,
    color: "grey",
  },
});
