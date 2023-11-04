import React, { useRef, useState, useMemo } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import CustomText from "../CustomText";
import Listing from "./Listing";
import { useScrollToTop } from "@react-navigation/native";
import FloatingButton from "./FloattingButton";
import SearchBar from "./SearchBar";
import FilterModal from "./FilterModal";
import styles from "./HomeStyle";
import { categoryIcons, foodListings, sortOptions } from "./Data"; // Adjust the path as necessary

const map = require("../../assets/icons/map.png");
const filterIcon = require("../../assets/icons/filter.png");

const handleMapPress = () => {
  //TODO
  console.log("Map icon pressed!");
};

const HomePage = () => {
  // State for holding and managing search queries
  const [searchQuery, setSearchQuery] = React.useState("");

  // State to hold selected food categories
  const [selectedCategories, setSelectedCategories] = React.useState([]);

  //State to hold if modal is opened

  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  const [distanceFilter, setDistanceFilter] = useState(10); // in kilometers
  const [ratingFilter, setRatingFilter] = useState(3.5); // rating out of 5
  const [hoursFilter, setHoursFilter] = useState(24); // hours since published
  const [allergensFilter, setAllergensFilter] = useState([]); // list of allergens to filter out

  // Add state to manage the selected sort option
  const [selectedSortOption, setSelectedSortOption] = useState("Distance");

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

  const convertRelativeTimeToHours = (relativeTime) => {
    if (!relativeTime) return 0; // If the date is not provided, return 0 hours

    const match = relativeTime.match(
      /(\d+)\s*(hours?|days?|minutes?|seconds?)\s*ago/
    );

    if (!match) return 0; // If the format is unknown, return 0 hours

    const value = parseInt(match[1], 10);
    const unit = match[2];

    if (unit.startsWith("day")) {
      return value * 24;
    } else if (unit.startsWith("hour")) {
      return value;
    } else if (unit.startsWith("minute")) {
      return value / 60;
    } else if (unit.startsWith("second")) {
      return value / 3600;
    }

    return 0; // Default return if none of the conditions match
  };

  const filteredAndSortedListings = useMemo(() => {
    return foodListings
      .filter((listing) => {
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
        // Apply distance filter
        const listingDistance = parseFloat(listing.distance.replace("km", ""));
        const withinDistance = listingDistance <= distanceFilter;

        // Apply rating filter
        const meetsRating = listing.rating >= ratingFilter;

        // Apply hours filter
        const hoursSincePublished = convertRelativeTimeToHours(listing.date);
        const withinTimeFrame = hoursSincePublished <= hoursFilter;

        // Apply allergens filter
        const doesNotContainAllergens = !allergensFilter.some((allergen) =>
          listing.allergen?.includes(allergen)
        );

        return (
          (isDishMatching || isCategoryMatchingSearch) &&
          (!selectedCategories.length || isListingCategorySelected) &&
          withinDistance &&
          meetsRating &&
          withinTimeFrame &&
          doesNotContainAllergens
        );
      })
      .sort((a, b) => {
        if (selectedSortOption === "Distance") {
          return parseFloat(a.distance) - parseFloat(b.distance);
        } else if (selectedSortOption === "Rating") {
          return b.rating - a.rating;
        } else if (selectedSortOption === "Date") {
          const hoursA = convertRelativeTimeToHours(a.date);
          const hoursB = convertRelativeTimeToHours(b.date);
          return hoursA - hoursB;
        }
        return 0;
      });
  }, [
    searchQuery,
    selectedCategories,
    distanceFilter,
    ratingFilter,
    hoursFilter,
    allergensFilter,
    selectedSortOption,
  ]);

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
              <SelectList
                data={sortOptions}
                setSelected={setSelectedSortOption}
                placeholder="Sort by"
                boxStyles={styles.sortDropdown}
                placeholderStyles={styles.sortDropdownText}
              />
            </View>
          </View>

          {/* Container for displaying food listings */}
          <View style={styles.listingsContainer}>
            {/* Here, we replace filteredListings with filteredAndSortedListings */}
            {filteredAndSortedListings.length ? (
              filteredAndSortedListings.map((listing, idx) => (
                <Listing key={listing.dish} listing={listing} idx={idx} />
              ))
            ) : (
              <CustomText fontType={"text"} style={styles.noMatchesText}>
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
        setHoursFilter={setHoursFilter}
        setAllergensFilter={setAllergensFilter}
        // other props if needed
      />
    </SafeAreaView>
  );
};

export default HomePage;
