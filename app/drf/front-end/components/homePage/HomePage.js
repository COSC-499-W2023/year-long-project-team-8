import React, { useRef, useState, useMemo, useContext, useEffect } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ActivityIndicator
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
} from "../helperFunctions/apiHelpers"; // Import functions
import AuthContext from "../../context/AuthContext"; // Import AuthContext
import { useAppState } from "../../context/AppStateContext";

const map = require("../../assets/icons/map.png");
const filterIcon = require("../../assets/icons/filter.png");

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

  console.log("postCreated in HomePage:", postCreated);

  // Function to handle map press !!currently using an imported function for testing!!! REMOVE

  const fetchFoodListings = async () => {
    try {
      setLoading(true); // Start the loader
      const productList = await getProductList(authTokens); // Fetch listings
      const listingsWithAdditionalData = await Promise.all(productList.results.map(async (listing) => {
        try {
          // Fetch additional data for each listing here (e.g., owner details)
          const ownerDetails = await getUserData(listing.owner, authTokens);
          // Combine the listing with its additional data
          return { ...listing, ownerDetails };
        } catch (error) {
          console.error('Error fetching additional data for listing:', listing.id, error);
          // Return the listing without additional data if there's an error
          return listing;
        }
      }));
      setFoodListing(listingsWithAdditionalData); // Update state with enriched listings
      console.log(listingsWithAdditionalData)
    } catch (error) {
      console.error("Error fetching food listings:", error);
    } finally {
      setLoading(false); // Stop the loader once all listings and their additional data have been fetched
    }
  };
  

  const handleMapPress = async () => {
    navigation.navigate('mapView');
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
    setSelectedCategories(prevCategories => 
      prevCategories.includes(category)
        ? prevCategories.filter(cat => cat !== category)
        : [...prevCategories, category]
    );
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
    return listingCategories.some(category =>
      selectedCategories.includes(category)
    );
  };
  
  
  // TODO: Use fetched data
  // In order to revert to old data, add return foodListings
  const filteredAndSortedListings = useMemo(() => {
    if (loading) {
      return <CustomText>Loading...</CustomText>;
    }
  
    return foodListing.filter((listing) => {
     
      // Apply filters 
      const listingCategoriesArray = listing.categories.split(',');
      const isDishMatching = listing.title.toLowerCase().includes(searchQuery.toLowerCase());
      const isCategoryMatchingSearch = isCategoryMatching(listingCategoriesArray, searchQuery); 
      const isCategoryMatch = isCategoryMatching(listingCategoriesArray, selectedCategories);

      //TODO: DISTANCE FILTERING
      const withinDistance = true; // Assuming all listings are within distance for now

      const meetsRating = listing.ownerDetails && listing.ownerDetails.rating >= ratingFilter;
      const doesNotContainAllergens = !allergensFilter.some(allergen => listing.allergens?.includes(allergen));

      console.log("Listing Title:", listing.title);
      console.log("Search Query:", searchQuery);
      console.log("isDishMatching:", isDishMatching);
      console.log("isCategoryMatchingSearch:", isCategoryMatchingSearch);
      console.log("Selected Categories:", selectedCategories);
      console.log("isCategoryMatch:", isCategoryMatch);
      console.log("categories to match:", listing.categories.split(','));

  
      return (isDishMatching || isCategoryMatchingSearch) && isCategoryMatch && withinDistance && meetsRating && doesNotContainAllergens;
    }).sort((a, b) => {
      if (selectedSortOption === "Distance") {
        // Implement sorting logic based on distance
      } else if (selectedSortOption === "Rating") {
        return b.ownerDetails.rating - a.ownerDetails.rating;
      } else if (selectedSortOption === "Date") {
        return new Date(b.created_at) - new Date(a.created_at); // Sort by date from newest to oldest
      }
      return 0;
    });
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
  ]);
  

  return (
    <SafeAreaView style={styles.container}>
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

          <View style={styles.filterAllContainer}>
            <TouchableOpacity
              style={styles.mainFilter}
              onPress={openFilterModal}
            >
              <Image source={filterIcon} style={styles.filterIcon} />
              <CustomText fontType={"title"} style={styles.filterText}>
                Filter
              </CustomText>
            </TouchableOpacity>
            <View style={styles.sortDropdownContainer}>
            <SortModal
              data={sortOptions}
              onSelect={setSelectedSortOption}
              placeholder="Date" // Updated this line
            />
            </View>
          </View>

          {/* Container for displaying food listings */}
          <View style={styles.listingsContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="orange" style={styles.loader}/>
          ) : filteredAndSortedListings.length > 0 ? (
            filteredAndSortedListings.map((listing, idx) => (
              <Listing key={idx} listing={listing} navigation={navigation} />
            ))
          ) : (
            <CustomText style={styles.noMatchesText}>No matches found.</CustomText>
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
      />
    </SafeAreaView>
  );
};

export default HomePage;