import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import CustomText from "../CustomText";

const Item = ({ listing, navigation, onMorePress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("PostDetails", { listing })}
      activeOpacity={1}
    >
      <Image source={{ uri: listing.images[0].image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <CustomText fontType={"title"} style={styles.title}>
          {listing.title}
        </CustomText>
      </View>
      <TouchableOpacity
        style={styles.moreButton}
        onPress={onMorePress}
        activeOpacity={1}
      >
        <CustomText style={styles.dots}>...</CustomText>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  availability: {
    fontSize: 14,
    color: "green",
  },
  moreButton: {
    padding: 10,
  },
  dots: {
    fontSize: 18,
  },
});
