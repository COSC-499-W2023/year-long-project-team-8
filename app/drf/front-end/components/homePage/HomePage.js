import React, { useRef, useState, useMemo, useContext, useEffect } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import SortModal from "./SortModal";
import CustomText from "../CustomText";
import Listing from "./Listing";
import { useScrollToTop } from "@react-navigation/native";
import FloatingButton from "./FloattingButton";
import SearchBar from "./SearchBar";
import FilterModal from "./FilterModal";
import styles from "./HomeStyle";
import { sortOptions, foodListings } from "./Data";
import { categoryIcons } from "../Categories";
import { useNavigation } from "@react-navigation/native";
import {
  filterCategory,
  getUserData,
  getUserProductList,
  getProductList,
} from "../helperFunctions/apiHelpers";
import AuthContext from "../../context/AuthContext";
import { useAppState } from "../../context/AppStateContext";
import QuickFilterChip from "./QuickFilterChip";
import * as Location from "expo-location";
const ClearAllIcon = require("../../assets/icons/cancel.png");

const HomePage = ({ navigation }) => {
  //const navigation = useNavigation();

  // Use AuthContext to get tokens and userId
  const { authTokens, userId } = useContext(AuthContext);
  const { postCreated, updatePostCreated } = useAppState();

  // State for holding and managing search queries
  const [searchQuery, setSearchQuery] = React.useState("");

  // State to hold selected food categories
  const [selectedCategories, setSelectedCategories] = React.useState([]);

  //State to hold if modal is opened

  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  const [distanceFilter, setDistanceFilter] = useState(10); // in kilometers
  const [ratingFilter, setRatingFilter] = useState(0); // rating out of 5
  const [allergensFilter, setAllergensFilter] = useState([]); // list of allergens to filter out

  // Add state to manage the selected sort option
  const [selectedSortOption, setSelectedSortOption] = useState("Date");

  // State for holding the fetched food listings
  const [foodListing, setFoodListing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  //Quick filterieng options
  const quickFilters = [
    "Near Me",
    "About to Expire",
    "Rare",
    "Pantry",
    "Healthy",
  ];

  // State to hold the selected quick filters
  const [selectedQuickFilter, setSelectedQuickFilter] = useState(null);

  // Function to handle quick filter selection
  const handleQuickFilterSelect = (filter) => {
    // If the selected filter is already active, deactivate it. Otherwise, activate the selected filter.
    setSelectedQuickFilter((currentFilter) =>
      currentFilter === filter ? null : filter
    );
  };

  // Function to update the selected sort option from FilterModal
  const updateSortOption = (newSortOption) => {
    setSelectedSortOption(newSortOption);
  };

  useEffect(() => {
    // Function to get the user's location
    const getLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.error("Permission to access location was denied");
          return;
        }
        const location = await Location.getCurrentPositionAsync({});
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      } catch (error) {
        console.error("Error getting location:", error);
      }
    };

    getLocation();
  }, []);

  const fetchFoodListings = async () => {
    try {
      setLoading(true); // Start the loader
      const productList = await getProductList(authTokens); // Fetch listings
      const listingsWithAdditionalData = await Promise.all(
        productList.results.map(async (listing) => {
          try {
            // Fetch additional data for each listing here (e.g., owner details)
            const ownerDetails = await getUserData(listing.owner, authTokens);
            // Combine the listing with its additional data
            return { ...listing, ownerDetails };
          } catch (error) {
            console.error(
              "Error fetching additional data for listing:",
              listing.id,
              error
            );
            // Return the listing without additional data if there's an error
            return listing;
          }
        })
      );
      const filteredListings = listingsWithAdditionalData.filter((listing) => {
        const isOwner = listing.owner !== userId;
        const isNotExpired = new Date(listing.best_before) >= new Date();
        const isAvailable = !listing.pickedUp;
        return isOwner && isNotExpired && isAvailable;
      });
      setFoodListing(filteredListings); // Update state with enriched listings
    } catch (error) {
      console.error("Error fetching food listings:", error);
    } finally {
      setLoading(false); // Stop the loader once all listings and their additional data have been fetched
    }
  };

  useEffect(() => {
    fetchFoodListings();
  }, []);

  useEffect(() => {
    if (postCreated) {
      // Perform re-fetch logic here
      fetchFoodListings();

      // After re-fetching, reset the postCreated state
      updatePostCreated();
    }
  }, [postCreated, updatePostCreated]);

  const onRefresh = async () => {
    setRefreshing(true);
    fetchFoodListings();
    setRefreshing(false);
  };

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
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((cat) => cat !== category)
        : [...prevCategories, category]
    );
  };

  const handleClearPress = () => {
    setSelectedCategories([]);
  };

  const handleLucky = () => {
    if (foodListing.length > 0) {
      // Select a random post from the foodListing array
      const randomIndex = Math.floor(Math.random() * foodListing.length);
      const randomPost = foodListing[randomIndex];

      // Navigate to the PostDetails screen with the selected random post
      navigation.navigate("PostDetails", { listing: randomPost });
    } else {
      console.log("No listings available to select a random post from.");
    }
  };

  // Function to check if a category is selected
  const isCategorySelected = (category) =>
    selectedCategories.includes(category);

  // Function to check if a category matches the search query
  const isCategoryMatching = (listingCategories, selectedCategories) => {
    if (selectedCategories.length === 0) {
      return true; // If no categories are selected, all listings match
    }

    if (!Array.isArray(listingCategories)) {
      return false; // Return false if listingCategories is undefined or not an array
    }
    return listingCategories.some((category) =>
      selectedCategories.includes(category)
    );
  };

  // TODO: Location filtering and sorting
  const filteredAndSortedListings = useMemo(() => {
    if (loading) {
      return <CustomText>Loading...</CustomText>;
    }

    let filteredListings = foodListing.filter((listing) => {
      const isDishMatching = listing.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const isCategoryMatch = isCategoryMatching(
        listing.categories?.split(","),
        selectedCategories
      );
      const meetsRating =
        listing.ownerDetails && listing.ownerDetails.rating >= ratingFilter;
      const doesNotContainAllergens = !allergensFilter.some((allergen) =>
        listing.allergens?.includes(allergen)
      );
      return (
        isDishMatching &&
        isCategoryMatch &&
        meetsRating &&
        doesNotContainAllergens
      );
    });

    switch (selectedQuickFilter) {
      case "Near Me":
        console.log("Filtering listings near the user...");
        break;
      case "About to Expire":
        const today = new Date();
        const oneWeekLater = new Date(today);
        oneWeekLater.setDate(today.getDate() + 7); // Set the date to one week later

        filteredListings = filteredListings.filter((listing) => {
          const bestBeforeDate = new Date(listing.best_before);
          return bestBeforeDate >= today && bestBeforeDate <= oneWeekLater; // Check if the best before date is within the next week
        });
        filteredListings.sort(
          (a, b) => new Date(a.best_before) - new Date(b.best_before)
        );
        break;
      case "Rare":
        filteredListings = filteredListings.filter(
          (listing) => listing.categories?.split(",").length > 5
        );
        break;
      case "Pantry":
        // Filter listings to include only those with 'Canned' as their sole category
        filteredListings = filteredListings.filter((listing) => {
          const categoriesArray = listing.categories
            ?.split(",")
            .map((category) => category.trim());
          return (
            categoriesArray.length === 1 && categoriesArray.includes("Canned")
          ); // Check if the array has only one element and that element is 'Canned'
        });
        break;
      case "Healthy":
        filteredListings = filteredListings.filter((listing) => {
          const categoriesArray = listing.categories
            ?.split(",")
            .map((category) => category.trim()); // Split and trim categories
          return (
            categoriesArray.length > 0 &&
            categoriesArray.every((category) =>
              ["Vegan", "Produce"].includes(category)
            )
          ); // Ensure every category is either 'Vegan' or 'Produce'
        });
        break;
      default:
        break;
    }

    switch (selectedSortOption) {
      case "Distance":
        console.log("Missing distance sorting option");
        break;
      case "Rating":
        filteredListings.sort(
          (a, b) => b.ownerDetails.rating - a.ownerDetails.rating
        );
        break;
      case "Date":
        filteredListings.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        break;
    }

    return filteredListings;
  }, [
    searchQuery,
    selectedCategories,
    distanceFilter,
    ratingFilter,
    allergensFilter,
    selectedSortOption,
    foodListing,
    loading,
    postCreated,
    selectedQuickFilter,
  ]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Main content container */}
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        ref={scrollRef}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
              style={styles.luckyIconContainer}
              onPress={handleLucky}
            >
              <Image
                source={require("../../assets/icons/dice1.png")}
                style={styles.luckyIcon}
              />
            </TouchableOpacity>
          </View>

          {/* Horizontal scroller for selecting food categories */}
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.categoryScroll}
          >
            <View style={styles.categoryContainer}>
              <TouchableOpacity
                style={styles.categoryButton}
                onPress={handleClearPress}
              >
                <Image source={ClearAllIcon} style={styles.iconImageClear} />
              </TouchableOpacity>
              <CustomText fontType={"text"} style={styles.categoryText}>
                Clear All
              </CustomText>
            </View>

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
                <CustomText
                  fontType={"text"}
                  style={[
                    styles.categoryText,
                    isCategorySelected(category)
                      ? styles.categoryTextSelected
                      : null,
                  ]}
                >
                  {category}
                </CustomText>
              </View>
            ))}
          </ScrollView>

          <ScrollView
            style={styles.filterAllContainer}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <TouchableOpacity
              style={styles.mainFilter}
              onPress={openFilterModal}
            >
              <Image
                source={require("../../assets/icons/filter.png")}
                style={styles.filterIcon}
              />
            </TouchableOpacity>

            <View style={styles.quickFiltersContainer}>
              {quickFilters.map((filter) => (
                <QuickFilterChip
                  key={filter}
                  label={filter}
                  isSelected={selectedQuickFilter === filter}
                  onSelect={handleQuickFilterSelect}
                />
              ))}
            </View>
          </ScrollView>

          {/* Container for displaying food listings */}
          <View style={styles.listingsContainer}>
            {loading ? (
              <ActivityIndicator
                size="large"
                color="orange"
                style={styles.loader}
              />
            ) : filteredAndSortedListings.length > 0 ? (
              filteredAndSortedListings.map((listing, idx) => (
                <Listing
                  key={idx}
                  listing={listing}
                  navigation={navigation}
                  userLocation={userLocation}
                />
              ))
            ) : (
              <CustomText style={styles.noMatchesText}>
                Nothing like that for now...
              </CustomText>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Floating button to scroll the content to the top */}
      <FloatingButton onButtonPress={handleScrollToTop} />
      <FilterModal
        isVisible={isFilterModalVisible}
        onClose={closeFilterModal}
        setDistanceFilter={setDistanceFilter}
        setRatingFilter={setRatingFilter}
        setAllergensFilter={setAllergensFilter}
        updateSortOption={updateSortOption}
      />
    </SafeAreaView>
  );
};

export default HomePage;
