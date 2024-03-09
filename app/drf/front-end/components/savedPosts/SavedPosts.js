import React, { useState, useEffect, useContext } from "react";
import { View, ScrollView, ActivityIndicator, StyleSheet } from "react-native";
import PostModal from "./PostModal";
import Item from "./Item";
import {
  filterCategory,
  getUserData,
  getUserProductList,
  getProductList,
} from "../helperFunctions/apiHelpers";
import AuthContext from "../../context/AuthContext";

const SavedPosts = ({ navigation }) => {
  const [savedListings, setSavedListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { authTokens } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);

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
      <ScrollView showsVerticalScrollIndicator={false}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
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
    padding: 10,
    backgroundColor: "white",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "center",
  },
});
