import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import CustomText from "../CustomText";
import { Image } from "react-native";
import React, { useState, useEffect } from "react";
// import RNFS from "react-native-fs";

// Component to represent a single food listing
const Listing = ({ listing, idx }) => {
  const [images, setImages] = useState([]);

  //TO DO: Refactor this block to load and render images - maybe use uri? adjust path as needed
  //
  useEffect(() => {
    const loadImages = async () => {
      if (!listing.images || listing.images.length === 0) {
        console.warn("No images loaded");
        return;
      }
      console.warn("Maybe images");

      const loadedImages = await Promise.all(
        listing.images.map(async (image, index) => {
          const imagePath = `C:/Users/mkudr/github-classroom/COSC-499-W2023/year-long-project-team-8/app/drf/front-end/assets/images/postImages/image_0.jpg`;
          //const imagePath = `C:/Users/mkudr/github-classroom/COSC-499-W2023/year-long-project-team-8/app/drf/front-end/assets/images/postImages/${image.name}image_0.jpg`;
          if (imagePath) {
            return (
              <Card.Cover
                key={index}
                //source={{ uri: `file://${imagePath}` }}
                source={require(imagePath)}
                style={styles.cardImage}
              />
            );
          } else {
            console.warn(`Image not found: ${imagePath}`);
            return null;
          }
        })
      );

      setImages(loadedImages.filter((image) => image !== null));
    };

    loadImages();
  }, [listing.images]);

  return (
    // Card component from 'react-native-paper' to visually represent the listing
    <Card key={listing.title} style={styles.card}>
      {/* Touchable area to interact with the listing */}
      <TouchableOpacity
        onPress={() => {
          console.log("Card pressed:", listing.title);
        }}
        key={listing.title}
      >
        {/* Container for the food image listing.image */}
        <View style={styles.imageContainer}>{images}</View>

        {/* Name of the dish */}
        <CustomText fontType={"title"} style={styles.cardTitle}>
          {listing.title}
        </CustomText>
        {/* Container for the dish creator's name and rating */}
        <View style={styles.nameAndRatingContainer}>
          <CustomText fontType={"text"} style={styles.byName}>
            By {listing.owner}
          </CustomText>

          {/* Icon from 'MaterialIcons' to represent star rating */}
          <MaterialIcons
            name="star"
            size={16}
            color="gold"
            style={styles.star}
          />
          <CustomText fontType={"subHeader"} style={styles.rating}>
            {/* {listing.rating} */}
            {1}
          </CustomText>
        </View>
        {/* Container for the date when the listing was posted and distance info */}
        <View>
          <CustomText fontType={"subHeader"} style={styles.datePosted}>
            {listing.date || "Just now"}
          </CustomText>
          <CustomText fontType={"subHeader"} style={styles.distanceText}>
            {"0" /* {listing.distance} */}
          </CustomText>
        </View>
      </TouchableOpacity>
    </Card>
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
