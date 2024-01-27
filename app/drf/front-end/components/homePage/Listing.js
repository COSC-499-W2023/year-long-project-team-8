import React, { useState, useEffect, useRef, useContext } from "react";
import { View, TouchableOpacity, StyleSheet, Animated} from "react-native";
import { Card } from "react-native-paper";
import CustomText from "../CustomText";
import { MaterialIcons } from "@expo/vector-icons";
import { getUserData } from '../helperFunctions/apiHelpers'; 
import AuthContext from '../../context/AuthContext'; 


const Listing = ({ listing, navigation }) => {
  const scaleValue = useRef(new Animated.Value(1)).current; // Initial scale is 1
  const [userDetails, setUserDetails] = useState(null);
  const { authTokens } = useContext(AuthContext); 

  // function to get username or first name for user that did the listing
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const data = await getUserData(listing.owner, authTokens);
        setUserDetails(data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [listing.owner]);

  const getDisplayName = () => {
    if (userDetails) {
      return userDetails.firstname || userDetails.email.split('@')[0];
    }
    return "Unknown";
  };

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
  return (
    <TouchableOpacity
        activeOpacity={1}
        onPressIn={zoomIn} // Trigger zoom-in on press in
        onPressOut={zoomOut} // Trigger zoom-out on press release
        onPress={() => {
          navigation.navigate('PostDetails', { listing: listing });
        }}
      >
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <Card key={listing.title} style={styles.card}>
            {/* Card content */}
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

            <MaterialIcons name="star" size={16} color="gold" style={styles.star} />
            <CustomText fontType={"subHeader"} style={styles.rating}>
              {1} {/* Replace this with the actual rating */}
            </CustomText>
          </View>

          <View>
            <CustomText fontType={"subHeader"} style={styles.datePosted}>
              {listing.date || "Just now"}
            </CustomText>
            <CustomText fontType={"subHeader"} style={styles.distanceText}>
              {"0" /* Replace this with the actual distance */}
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
