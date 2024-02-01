import React, { useRef } from "react";
import { View, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { Card } from "react-native-paper";
import CustomText from "../CustomText";
import { MaterialIcons } from "@expo/vector-icons";

const Listing = ({ listing, navigation }) => {
  const scaleValue = useRef(new Animated.Value(1)).current; // Initial scale is 1

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

  // Assuming 'listing' now includes 'ownerDetails' fetched in HomePage
  const getDisplayName = () => listing.ownerDetails?.firstname || listing.ownerDetails?.email.split('@')[0] || "Unknown";
  const getDisplayRating = () => listing.ownerDetails?.rating || "New User";

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
    } else if (days < 30) {
      return `${days} days ago`;
    } else if (months < 12) {
      return `${months} months ago`;
    } else {
      return `${years} years ago`;
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPressIn={zoomIn}
      onPressOut={zoomOut}
      onPress={() => navigation.navigate('PostDetails', { listing })}
    >
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        <Card style={styles.card}>
          {listing.images && listing.images.length > 0 && (
            <Card.Cover source={{ uri: listing.images[0].image }} style={styles.cardImage} />
          )}
          <CustomText fontType={"title"} style={styles.cardTitle}>
            {listing.title}
          </CustomText>
          <View style={styles.nameAndRatingContainer}>
            <CustomText fontType={"text"} style={styles.byName}>
              By {getDisplayName()}
            </CustomText>
            <MaterialIcons name="star" size={16} color="gold" style={styles.star} />
            <CustomText fontType={"subHeader"} style={styles.rating}>
              {getDisplayRating()}
            </CustomText>
          </View>
          <View>
            <CustomText fontType={"subHeader"} style={styles.datePosted}>
              {timeAgo(listing.created_at)}
            </CustomText>
            <CustomText fontType={"subHeader"} style={styles.distanceText}>
              {"0" /* Replace with actual distance if available */}
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
  nameAndRatingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  distanceText: {
    position: "absolute",
    fontSize: 14,
    color: "grey",
    right: 2,
    paddingRight: 10,
  },
  byName: {
    fontSize: 16,
    color: "grey",
    marginTop: 0,
    paddingLeft: 10,
  },
  datePosted: {
    fontSize: 14,
    color: "grey",
    marginTop: 5,
    paddingLeft: 10,
    paddingBottom: 10,
  },
});
