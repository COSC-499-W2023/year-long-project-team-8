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
import Ionicons from "react-native-vector-icons/Ionicons";

const map = require("../../assets/icons/map.png");

const categoryIcons = {
  Italian: require("../../assets/icons/italian.png"),
  Vegan: require("../../assets/icons/vegetarian.png"),
  Meat: require("../../assets/icons/meat.png"),
  Asian: require("../../assets/icons/asian.png"),
  Mexican: require("../../assets/icons/mexican.png"),
  Produce: require("../../assets/icons/produce.png"),
  Desserts: require("../../assets/icons/dessert.png"),
  Canned: require("../../assets/icons/canned.png"),
};

const foodListings = [
  {
    dish: "Pasta Carbonara",
    name: "Aisha",
    date: "3 hours ago",
    image: require("../../assets/images/dummyImages/Pasta.jpg"),
  },
  {
    dish: "Veggie Pizza",
    name: "Daniel",
    date: "5 hours ago",
    image: require("../../assets/images/dummyImages/Pizza.webp"),
  },
  {
    dish: "Grilled Chicken",
    name: "Olga",
    date: "1 hours ago",
    image: require("../../assets/images/dummyImages/Chicken.jpg"),
  },
  {
    dish: "Vegan Burrito",
    name: "Giovanni",
    date: "8 hours ago",
    image: require("../../assets/images/dummyImages/Burrito.jpg"),
  },
  {
    dish: "Cheeseburger",
    name: "Linh",
    date: "4 hours ago",
    image: require("../../assets/images/dummyImages/Cheeseburger.jpg"),
  },
  {
    dish: "Rice Noodles",
    name: "Esmeralda",
    date: "5 hours ago",
    image: require("../../assets/images/dummyImages/Ricenoodles.webp"),
  },
  {
    dish: "BBQ Ribs",
    name: "Haruki",
    date: "7 hours ago",
    image: require("../../assets/images/dummyImages/Bbqribs.jpg"),
  },
  {
    dish: "Salmon Salad",
    name: "Kwame",
    date: "1 day ago",
    image: require("../../assets/images/dummyImages/Salmonsalad.jpeg"),
  },
  {
    dish: "Vegan Sushi",
    name: "Francesca",
    image: require("../../assets/images/dummyImages/VeganSushi.jpg"),
  },
  {
    dish: "Spaghetti Bolognese",
    name: "Ananya",
    date: "1 day ago",
    image: require("../../assets/images/dummyImages/Spaghettibolognese.jpg"),
  },
  {
    dish: "Lobster Bisque",
    name: "Michael",
    date: "1 day ago",
    image: require("../../assets/images/dummyImages/LobsterBisque.png"),
  },
  {
    dish: "Mushroom Risotto",
    name: "Pierre",
    date: "1 day ago",
    image: require("../../assets/images/dummyImages/MushroomRisotto.jpg"),
  },
];

const handleMapPress = () => {
  console.log("Map icon pressed!");
  // Add your logic for the map icon press here.
};

const HomePage = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query) => setSearchQuery(query);
  return (
    <View style={styles.container}>
      <Navbar />
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.searchRowContainer}>
            <View style={styles.customSearchBar}>
              <Ionicons
                name="ios-search"
                size={20}
                color="#aaa"
                style={styles.searchIcon}
              />
              <TextInput
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
                style={styles.customTextInput}
              />
            </View>
            <TouchableOpacity
              onPress={handleMapPress}
              style={styles.mapIconContainer}
            >
              <Image source={map} style={styles.iconImage} />
            </TouchableOpacity>
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
                    console.log("Card pressed:", listing.dish);
                  }}
                  key={listing.dish}
                >
                  <View style={styles.imageContainer}>
                    <Card.Cover
                      source={listing.image}
                      style={styles.cardImage}
                    />
                  </View>
                  <Text style={styles.cardTitle}>{listing.dish}</Text>
                  <View style={styles.nameAndRatingContainer}>
                    <Text style={styles.byName}>By {listing.name}</Text>
                  </View>
                  <View>
                    <Text style={styles.datePosted}>
                      {listing.date || "Just now"}
                    </Text>
                    <Text style={styles.distanceText}>{`${3 + idx} Km`}</Text>
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
    backgroundColor: "white",
  },
  scrollContainer: {
    flex: 1,
  },
  searchRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  customSearchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    height: 40,
    borderRadius: 50,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    paddingHorizontal: 10,
    flex: 1,
    marginRight: 5,
  },

  searchIcon: {
    marginRight: 10,
  },

  customTextInput: {
    flex: 1,
    fontSize: 16,
    lineHeight: 40,
  },
  MapIcon: {
    paddingRight: 10,
  },
  mapIconContainer: {
    marginLeft: 10,
  },
  categoryScroll: {
    flexDirection: "row",
    marginVertical: 5,
  },
  categoryContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  categoryButton: {
    backgroundColor: "transparent",
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  iconImage: {
    width: 40,
    height: 40,
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

  rating: {
    fontSize: 16,
    color: "grey",
  },
  star: {
    alignSelf: "center",
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

export default HomePage;
