import React from "react";
import { View, StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";

const SearchBar = ({ searchQuery, onChangeSearch }) => {
  return (
    <View style={styles.searchContainer}>
      <Searchbar
        style={styles.customSearchBar}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={onChangeSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    elevation: 5,
    borderRadius: 50,
  },
  customSearchBar: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 50,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    flex: 1,
  },
});

export default SearchBar;
