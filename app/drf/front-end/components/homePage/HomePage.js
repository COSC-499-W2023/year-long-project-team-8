import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Navbar from "../navBar/NavBar";
import Icon from "react-native-vector-icons/Ionicons"; // Import the Icon component

const categoryIcons = {
  Vegetarian: "leaf-outline",
  Vegan: "planet-outline",
  Meat: "fast-food-outline",
  Desserts: "ice-cream-outline",
  Pasta: "restaurant-outline",
  Asian: "restaurant",
  Mexican: "pizza-outline",
};

const HomePage = () => {
  return (
    <View style={styles.container}>
      <Navbar />
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.content}>
          <TextInput
            placeholder="Search for leftovers..."
            style={styles.searchBar}
          />

          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.categoryScroll}
          >
            {Object.keys(categoryIcons).map((category) => (
              <TouchableOpacity style={styles.categoryButton} key={category}>
                <Icon name={categoryIcons[category]} size={24} color="#555" />
                <Text style={styles.categoryText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {[
            "Pasta Carbonara",
            "Veggie Pizza",
            "Grilled Chicken",
            "Vegan Burrito",
            "Cheeseburger",
            "Rice Noodles",
            "BBQ Ribs",
            "Salmon Salad",
            "Vegan Sushi",
            "Spaghetti Bolognese",
            "Lobster Bisque",
            "Mushroom Risotto",
          ].map((dish, idx) => (
            <View style={styles.listingItem} key={dish}>
              <Text style={styles.listingTitle}>{dish}</Text>
              <Text>{3 + idx} miles away</Text>
            </View>
          ))}
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
  content: {
    padding: 10,
  },
  searchBar: {
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: "#ffff",
    marginVertical: 10,
    fontSize: 16,
  },
  categoryScroll: {
    flexDirection: "row",
    marginVertical: 5,
  },
  categoryButton: {
    backgroundColor: "#e9e9e9",
    padding: 10,
    borderRadius: 50,
    marginHorizontal: 3,
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryText: {
    marginTop: 5,
    fontWeight: "600",
    color: "#555",
    fontSize: 12,
  },
  listings: {
    marginTop: 10,
  },
  listingItem: {
    padding: 12,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    backgroundColor: "#fafafa",
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: "#aaa",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  listingTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default HomePage;
