import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import Navbar from "../navBar/NavBar";
import { Card } from "react-native-paper";

const categoryIcons = {
  Vegetarian: require("../../assets/icons/vegetarian.png"),
  Meat: require("../../assets/icons/meat.png"),
  Desserts: require("../../assets/icons/dessert.png"),
  Italian: require("../../assets/icons/italian.png"),
  Asian: require("../../assets/icons/asian.png"),
  Mexican: require("../../assets/icons/mexican.png"),
};

const foodListings = [
  { dish: "Pasta Carbonara", name: "Aisha", date: "3 hours ago" },
  { dish: "Veggie Pizza", name: "Daniel", date: "5 hours ago" },
  { dish: "Grilled Chicken", name: "Olga", date: "1 hours ago" },
  { dish: "Vegan Burrito", name: "Giovanni", date: "8 hours ago" },
  { dish: "Cheeseburger", name: "Linh", date: "4 hours ago" },
  { dish: "Rice Noodles", name: "Esmeralda", date: "5 hours ago" },
  { dish: "BBQ Ribs", name: "Haruki", date: "7 hours ago" },
  { dish: "Salmon Salad", name: "Kwame", date: "1 day ago" },
  { dish: "Vegan Sushi", name: "Francesca" },
  { dish: "Spaghetti Bolognese", name: "Ananya", date: "1 day ago" },
  { dish: "Lobster Bisque", name: "Michael", date: "1 day ago" },
  { dish: "Mushroom Risotto", name: "Pierre", date: "1 day ago" },
];

const foodImage = require("../../assets/images/foodPlaceholder.webp");

const HomePage = () => {
  return (
    <View style={styles.container}>
      <Navbar />
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.content}>
          <View style={styles.searchBarContainer}>
            <TextInput
              placeholder="Search for leftovers..."
              style={styles.searchBar}
              placeholderTextColor="#aaa"
            />
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.categoryScroll}
          >
            {Object.keys(categoryIcons).map((category) => (
              <View style={styles.categoryContainer} key={category}>
                <TouchableOpacity style={styles.categoryButton}>
                  <Image
                    source={categoryIcons[category]}
                    style={styles.iconImage}
                  />
                </TouchableOpacity>
                <Text style={styles.categoryText}>{category}</Text>
              </View>
            ))}
          </ScrollView>
          <View style={styles.listingsContainer}>
            {foodListings.map((listing, idx) => (
              <Card key={listing.dish} style={styles.card}>
                <TouchableOpacity
                  onPress={() => {
                    // Handle card press here
                    console.log("Card pressed:", listing.dish);
                  }}
                  key={listing.dish}
                >
                  <View style={styles.imageContainer}>
                    <Card.Cover source={foodImage} style={styles.cardImage} />
                    <View style={styles.overlayTextContainer}>
                      <Text style={styles.dateTextOverlay}>
                        {listing.date || "Just now"}
                      </Text>
                      <Text style={styles.distanceTextOverlay}>
                        {`${3 + idx} Km`}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.cardTitle}>
                    <Card.Title
                      title={`${listing.dish} - By ${listing.name}`}
                      titleStyle={{ textAlign: "center" }}
                    />
                  </View>
                </TouchableOpacity>
              </Card>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  searchBarContainer: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  searchBar: {
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: "#ffff",
    marginVertical: 10,
    fontSize: 16,
    paddingLeft: 20,
  },
  categoryScroll: {
    flexDirection: "row",
    marginVertical: 5,
  },
  categoryContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 80,
  },
  categoryButton: {
    backgroundColor: "transparent",
    borderRadius: 50,
    width: 80,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  iconImage: {
    width: 35,
    height: 35,
  },
  categoryText: {
    fontWeight: "600",
    color: "black",
    fontSize: 12,
  },
  listingsContainer: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  card: {
    marginVertical: 5,
    borderRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardImage: {
    borderRadius: 0,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 5,
    textAlign: "center",
  },
  imageContainer: {
    position: "relative",
  },
  overlayTextContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  dateTextOverlay: {
    fontSize: 14,
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 5,
    paddingVertical: 2,
  },

  distanceTextOverlay: {
    fontSize: 14,
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
});

export default HomePage;
