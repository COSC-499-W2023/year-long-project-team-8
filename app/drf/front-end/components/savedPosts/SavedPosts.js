import React, { useState, useEffect, useContext } from "react";
import {
  View,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
} from "react-native";
import PostModal from "./PostModal";
import Item from "./Item";
import { getUserData, getProductList } from "../helperFunctions/apiHelpers";
import AuthContext from "../../context/AuthContext";

const SavedPosts = ({ navigation }) => {
  const [savedListings, setSavedListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { authTokens } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchAllListings();
    setRefreshing(false);
  };

  const openModal = (listing) => {
    setSelectedListing(listing);
    setModalVisible(true);
  };

  const fetchAllListings = async () => {
    setLoading(true);
    try {
      const productList = await getProductList(authTokens);
      const listingsWithAdditionalData = await Promise.all(
        productList.results.map(async (listing) => {
          try {
            const ownerDetails = await getUserData(listing.owner, authTokens);
            return { ...listing, ownerDetails };
          } catch (error) {
            console.error(
              "Error fetching additional data for listing:",
              listing.id,
              error
            );
            return listing;
          }
        })
      );
      setSavedListings(listingsWithAdditionalData);
    } catch (error) {
      console.error("Error fetching all listings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllListings();
  }, []);

  const handleUnsave = () => {
    console.log("Unsave post");
    setModalVisible(false);
  };

  const handleView = () => {
    console.log("View post");
    setModalVisible(false);
  };

  const handleRequest = () => {
    console.log("Open chat instance");
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scroll}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.itemContainer}>
          {loading && !refreshing ? (
            <ActivityIndicator size="large" color="orange" />
          ) : (
            savedListings.map((listing, index) => (
              <Item
                key={index}
                listing={listing}
                navigation={navigation}
                onMorePress={() => openModal(listing)}
              />
            ))
          )}
        </View>
      </ScrollView>
      <PostModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onUnsave={handleUnsave}
        onView={handleView}
        onRequest={handleRequest}
        listing={selectedListing}
      />
    </View>
  );
};

export default SavedPosts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scroll: {
    padding: 10,
  },
  itemContainer: {
    marginBottom: 10,
  },
});
