import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";

const Listing = ({ listing, idx }) => {
  return (
    <Card key={listing.dish} style={styles.card}>
      <TouchableOpacity
        onPress={() => {
          console.log("Card pressed:", listing.dish);
        }}
        key={listing.dish}
      >
        <View style={styles.imageContainer}>
          <Card.Cover source={listing.image} style={styles.cardImage} />
        </View>
        <Text style={styles.cardTitle}>{listing.dish}</Text>
        <View style={styles.nameAndRatingContainer}>
          <Text style={styles.byName}>By {listing.name}</Text>
          {/* Displaying rating star and rating value */}
          <MaterialIcons
            name="star"
            size={16}
            color="gold"
            style={styles.star}
          />
          <Text style={styles.rating}>{listing.rating}</Text>
        </View>
        <View>
          <Text style={styles.datePosted}>{listing.date || "Just now"}</Text>
          <Text style={styles.distanceText}>{listing.distance}</Text>
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
