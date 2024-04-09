import React, { useRef } from "react";
import {
  View,
  TouchableHighlight,
  Image,
  StyleSheet,
  Animated,
} from "react-native";
import CustomText from "../CustomText";
import { MaterialIcons } from "@expo/vector-icons";

const Item = ({ listing, navigation, onMorePress }) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  //TODO: Implement check for expired, picked up, etc.
  const calculateTimeRemaining = (expiryDate) => {
    const now = new Date();
    const expiry = new Date(expiryDate);
    const diff = expiry - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 1) {
      return `${days} days remaining`;
    } else if (days === 1) {
      return `1 day remaining`;
    } else if (hours > 1) {
      return `${hours} hours remaining`;
    } else if (hours === 1) {
      return `1 hour remaining`;
    } else if (minutes > 1) {
      return `${minutes} minutes remaining`;
    } else if (minutes === 1) {
      return `1 minute remaining`;
    } else {
      return "Expired";
    }
  };

  const timeRemaining = calculateTimeRemaining(listing.best_before);

  return (
    <TouchableHighlight
      underlayColor="#F5F5F5"
      style={styles.container}
      onPress={() =>
        navigation.navigate("PostDetails", { listing, fromSavedPosts: true })
      }
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <Animated.View
        style={{
          transform: [{ scale: scaleValue }],
          flexDirection: "row",
        }}
      >
        <Image source={{ uri: listing.images[0].image }} style={styles.image} />
        <View style={styles.infoContainer}>
          <CustomText
            style={styles.title}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {listing.title}
          </CustomText>
          <CustomText style={styles.expiryText}>{timeRemaining}</CustomText>
        </View>
        <TouchableHighlight
          underlayColor="#F5F5F5"
          style={styles.moreButtonCircle}
          onPress={onMorePress}
        >
          <MaterialIcons name="more-horiz" size={24} color="black" />
        </TouchableHighlight>
      </Animated.View>
    </TouchableHighlight>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "flex-start",
    marginRight: 10,
  },
  title: {
    fontSize: 16,
  },
  expiryText: {
    fontSize: 14,
    color: "grey",
  },
  moreButtonCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});

/*
 //needs to be exported to test
export const calculateTimeRemaining = (expiryDate) => {
    const now = new Date();
    const expiry = new Date(expiryDate);
    const diff = expiry - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 1) {
      return `${days} days remaining`;
    } else if (days === 1) {
      return `1 day remaining`;
    } else if (hours > 1) {
      return `${hours} hours remaining`;
    } else if (hours === 1) {
      return `1 hour remaining`;
    } else if (minutes > 1) {
      return `${minutes} minutes remaining`;
    } else if (minutes === 1) {
      return `1 minute remaining`;
    } else {
      return "Expired";
    }
  };
  */

