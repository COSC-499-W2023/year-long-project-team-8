import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Modal,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import Listing from "./Listing";
import { useScrollToTop } from "@react-navigation/native";
import FloatingButton from "./FloattingButton";
import SearchBar from "./SearchBar";
import FilterModal from "./FilterModal";
import styles from "./HomeStyle";
const map = require("../../assets/icons/map.png");
const filterIcon = require("../../assets/icons/filter.png");

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
    category: "Italian",
    distance: "1km",
    rating: 4.5,
  },
  {
    dish: "Veggie Pizza",
    name: "Daniel",
    date: "5 hours ago",
    image: require("../../assets/images/dummyImages/Pizza.webp"),
    category: "Italian",
    distance: "2km",
    rating: 3.5,
  },
  {
    dish: "Grilled Chicken",
    name: "Olga",
    date: "1 hours ago",
    image: require("../../assets/images/dummyImages/Chicken.jpg"),
    category: "Meat",
    distance: "4km",
    rating: 5,
  },
  {
    dish: "Vegan Burrito",
    name: "Giovanni",
    date: "8 hours ago",
    image: require("../../assets/images/dummyImages/Burrito.jpg"),
    category: ["Mexican", "Vegan"],
    distance: "6km",
    rating: 3,
  },
  {
    dish: "Cheeseburger",
    name: "Linh",
    date: "4 hours ago",
    image: require("../../assets/images/dummyImages/Cheeseburger.jpg"),
    category: "Meat",
    distance: "9km",
    rating: 1.5,
  },
  {
    dish: "Rice Noodles",
    name: "Esmeralda",
    date: "5 hours ago",
    image: require("../../assets/images/dummyImages/Ricenoodles.webp"),
    category: "Asian",
    distance: "9km",
    rating: 2.5,
  },
  {
    dish: "BBQ Ribs",
    name: "Haruki",
    date: "7 hours ago",
    image: require("../../assets/images/dummyImages/Bbqribs.jpg"),
    category: "Meat",
    distance: "11km",
    rating: 4.7,
  },
  {
    dish: "Salmon Salad",
    name: "Kwame",
    date: "1 day ago",
    image: require("../../assets/images/dummyImages/Salmonsalad.jpeg"),
    category: "Meat",
    distance: "8km",
    rating: 4.9,
  },
  {
    dish: "Vegan Sushi",
    name: "Francesca",
    image: require("../../assets/images/dummyImages/VeganSushi.jpg"),
    category: ["Asian", "Vegan"],
    distance: "10km",
    rating: 3.9,
  },
  {
    dish: "Spaghetti Bolognese",
    name: "Ananya",
    date: "1 day ago",
    image: require("../../assets/images/dummyImages/Spaghettibolognese.jpg"),
    category: ["Italian", "Meat"],
    distance: "12km",
    rating: 1.8,
  },
  {
    dish: "Lobster Bisque",
    name: "Michael",
    date: "1 day ago",
    image: require("../../assets/images/dummyImages/LobsterBisque.png"),
    category: "Seafood",
    distance: "1km",
    rating: 1.8,
  },
  {
    dish: "Mushroom Risotto",
    name: "Pierre",
    date: "1 day ago",
    image: require("../../assets/images/dummyImages/MushroomRisotto.jpg"),
    category: ["Italian"],
    distance: "8km",
    rating: 4.5,
  },
];

const handleMapPress = () => {
  //TODO
  console.log("Map icon pressed!");
};

const HomePage = () => {
  // State for holding and managing search queries
  const [searchQuery, setSearchQuery] = React.useState("");

  const [selectedDropdownValue, setSelectedDropdownValue] = useState("");

  // State to hold selected food categories
  const [selectedCategories, setSelectedCategories] = React.useState([]);

  //State to hold if modal is opened

  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  // Function to open the filter modal
  const openFilterModal = () => {
    setIsFilterModalVisible(true);
  };

  // Function to close the filter modal
  const closeFilterModal = () => {
    setIsFilterModalVisible(false);
  };

  // Ref to the ScrollView for managing scroll actions
  const scrollRef = useRef(null);

  // Function to update search query
  const onChangeSearch = (query) => setSearchQuery(query);

  // React Navigation's method to scroll the ScrollView to top
  useScrollToTop(scrollRef);

  // Function to manually scroll the ScrollView to top
  const handleScrollToTop = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  // Function to handle the selection of food categories
  const handleCategoryPress = (category) => {
    // If the category is already selected, remove it; else add it
    if (selectedCategories.includes(category)) {
      setSelectedCategories((prev) => prev.filter((cat) => cat !== category));
    } else {
      setSelectedCategories((prev) => [...prev, category]);
    }
  };

  // Function to check if a category is selected
  const isCategorySelected = (category) =>
    selectedCategories.includes(category);

  // Function to check if a category matches the search query
  const isCategoryMatching = (categories, query) => {
    // Check if the categories variable is an array or not
    if (!Array.isArray(categories)) {
      return categories.toLowerCase().includes(query.toLowerCase());
    }
    return categories.some((category) =>
      category.toLowerCase().includes(query.toLowerCase())
    );
  };

  // Filtering the food listings based on search query, selected categories, distance, rating, and time frame
  const filteredListings = foodListings.filter((listing) => {
    const isDishMatching = listing.dish
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const isCategoryMatchingSearch = isCategoryMatching(
      listing.category,
      searchQuery
    );
    const isListingCategorySelected = selectedCategories.some((cat) =>
      isCategoryMatching(listing.category, cat)
    );

    return (
      (isDishMatching || isCategoryMatchingSearch) &&
      (!selectedCategories.length || isListingCategorySelected)
    );
  });

  // Sorting the filtered listings based on the selectedDropdownValue
  if (selectedDropdownValue === "Date") {
    filteredListings.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
  } else if (selectedDropdownValue === "Distance") {
    filteredListings.sort(
      (a, b) => parseFloat(a.distance) - parseFloat(b.distance)
    );
  } else if (selectedDropdownValue === "Rating") {
    filteredListings.sort((a, b) => b.rating - a.rating);
  }

  return (
    // Container to ensure content is displayed within safe areas of the device
    <SafeAreaView style={styles.container}>
      {/* Custom Navigation bar with sort options */}

      {/* Main content container */}
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        ref={scrollRef}
      >
        {/* Container for search bar and map icon */}
        <View style={styles.content}>
          <View style={styles.searchRowContainer}>
            {/* Search input for user queries */}
            <SearchBar
              searchQuery={searchQuery}
              onChangeSearch={onChangeSearch}
            />

            {/* Button to invoke map actions */}
            <TouchableOpacity
              onPress={handleMapPress}
              style={styles.mapIconContainer}
            >
              <Image source={map} style={styles.mapIconImage} />
            </TouchableOpacity>
          </View>

          {/* Horizontal scroller for selecting food categories */}
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.categoryScroll}
          >
            {/* Iterating through categories and showing icons for each */}
            {Object.keys(categoryIcons).map((category) => (
              <View style={styles.categoryContainer} key={category}>
                <TouchableOpacity
                  style={[
                    styles.categoryButton,
                    isCategorySelected(category)
                      ? styles.categorySelected
                      : null,
                  ]}
                  onPress={() => handleCategoryPress(category)}
                >
                  <Image
                    source={categoryIcons[category]}
                    style={styles.iconImage}
                  />
                </TouchableOpacity>

                {/* Label for the category icon */}
                <Text
                  style={[
                    styles.categoryText,
                    isCategorySelected(category)
                      ? styles.categoryTextSelected
                      : null,
                  ]}
                >
                  {category}
                </Text>
              </View>
            ))}
          </ScrollView>

          <View style={styles.filterAllContainer}>
            <TouchableOpacity
              style={styles.mainFilter}
              onPress={openFilterModal}
            >
              <Image source={filterIcon} style={styles.filterIcon} />
              <Text style={styles.filterText}>Filter</Text>
            </TouchableOpacity>
            <ScrollView
              horizontal
              style={styles.filterContainer}
              showsHorizontalScrollIndicator={false}
            >
              {/* Wrap each View in a TouchableOpacity to make it a button */}
              <TouchableOpacity
                style={styles.filter}
                onPress={() => {
                  /* Handle Distance filter press */
                }}
              >
                <Text style={styles.filterText}>Distance</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.filter}
                onPress={() => {
                  /* Handle Rating filter press */
                }}
              >
                <Text style={styles.filterText}>Rating</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.filter}
                onPress={() => {
                  /* Handle Date filter press */
                }}
              >
                <Text style={styles.filterText}>Date</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.filter}
                onPress={() => {
                  /* Handle Allergies filter press */
                }}
              >
                <Text style={styles.filterText}>Allergies</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>

          {/* Container for displaying food listings */}
          <View style={styles.listingsContainer}>
            {/* Checking if there are listings to display */}
            {filteredListings.length ? (
              filteredListings.map((listing, idx) => (
                <Listing key={listing.dish} listing={listing} idx={idx} />
              ))
            ) : (
              // Displaying message if no matching listings are found
              <Text style={styles.noMatchesText}>
                Nothing like that for now...
              </Text>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Floating button to scroll the content to the top */}
      <FloatingButton onButtonPress={handleScrollToTop} />
      <FilterModal
        isVisible={isFilterModalVisible}
        onClose={closeFilterModal}
        // pass any other props needed for filtering
      />
    </SafeAreaView>
  );
};

export default HomePage;
