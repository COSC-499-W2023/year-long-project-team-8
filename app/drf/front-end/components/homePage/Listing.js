import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import CustomText from "../CustomText";
import { MaterialIcons } from "@expo/vector-icons";

const Listing = ({ listing, navigation }) => {
  return (
    <Card key={listing.title} style={styles.card}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('MainStack', { screen: 'PostDetails', params: { listing } });
        }}
      >
        {/* Check if there's at least one image and display the first one */}
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
            By {listing.owner}
          </CustomText>

          <MaterialIcons name="star" size={16} color="gold" style={styles.star} />
          <CustomText fontType={"subHeader"} style={styles.rating}>
            {1} {/*replace this with actual rating */}
          </CustomText>
        </View>

        <View>
          <CustomText fontType={"subHeader"} style={styles.datePosted}>
            {listing.date || "Just now"}
          </CustomText>
          <CustomText fontType={"subHeader"} style={styles.distanceText}>
            {"0" /*replace this with actual distance */}
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
