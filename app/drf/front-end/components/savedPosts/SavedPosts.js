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
import {
  getUserData,
  getProductList,
  sendChatMessage,
  toggleSavePost
} from "../helperFunctions/apiHelpers";
import AuthContext from "../../context/AuthContext";

const SavedPosts = ({ navigation }) => {
  const [savedListings, setSavedListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { authTokens, userId } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [chatId, setChatId] = useState("");
  const [receiver, setReceiver] = useState("");
  const [product, setProduct] = useState("");

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchAllListings();
    setRefreshing(false);
  };

  const openModal = (listing) => {
    setSelectedListing(listing);
    setModalVisible(true);
    setReceiver(listing.owner);
    setProduct(listing.id);
  };

  const fetchAllListings = async () => {
    setLoading(true);
    try {
      // Fetch the list of saved posts for the user
      const userData = await getUserData(userId, authTokens);
      const savedPosts = userData.saved_posts || [];
  
      // Fetch products only for the saved posts
      const productList = await getProductList(authTokens);
      const savedListings = await Promise.all(
        productList.results
          .filter(listing => savedPosts.includes(listing.id))
          .map(async (listing) => {
            try {
              const ownerDetails = await getUserData(listing.owner, authTokens);
              return { ...listing, ownerDetails };
            } catch (error) {
              console.error("Error fetching additional data for listing:", listing.id, error);
              return listing;
            }
          })
      );
      setSavedListings(savedListings);
    } catch (error) {
      console.error("Error fetching saved listings:", error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchAllListings();
  }, []);

  const handleUnsave = async () => {
    try {
      const data = await toggleSavePost(authTokens, userId, product);
      onRefresh();
    } catch (error) {
      console.error("Error toggling saved in product screen")
    }
    setModalVisible(false);
  };

  const handleViewPost = (listing) => {
    navigation.navigate("PostDetails", { listing, fromSavedPosts: true });
    setModalVisible(false);
  };

  const handleViewUser = (listing) => {
    navigation.navigate("OtherProfile", {
      userId: listing.owner,
      fromSavedPosts: true,
    });
    setModalVisible(false);
  };

  const handleOpenChat = async (listing) => {
    try {
      if (chatId !== "") {
        navigation.navigate("UserMessages", {
          chatId: chatId,
          sender: userId,
          receiver: listing.owner,
          product: listing.id,
        });
      } else {
        const initialMessage = "Hi! Can I get this plate?";
        const data = await sendChatMessage(
          userId,
          authTokens,
          initialMessage,
          listing.owner,
          listing.id
        );
        setChatId(data.id);
        navigation.navigate("UserMessages", {
          chatId: data.id,
          sender: userId,
          receiver: listing.owner,
          product: listing.id,
        });
      }
    } catch (error) {
      console.error("Error opening chat:", error);
    }
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
        onViewPost={handleViewPost}
        onViewUser={handleViewUser}
        onRequest={handleOpenChat}
        listing={selectedListing}
        navigation={navigation}
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
