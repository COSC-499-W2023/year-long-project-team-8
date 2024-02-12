import React, { useContext, useEffect, useState, useRef } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import { Rating } from "@kolking/react-native-rating";
import PostCard from "./PostCard";
import {
  getUserData,
  getUserProductList,
  updateProfilePicture,
} from "../helperFunctions/apiHelpers";
import AuthContext from "../../context/AuthContext";
import styles from "./profilePageStyles";
import { useIsFocused } from "@react-navigation/native";
import CustomText from "../CustomText";
import PostReview from "./PostReview";
import * as ImagePicker from "expo-image-picker";
import { useAppState } from "../../context/AppStateContext";

//TODO: Location, dummy pfp icon resolution increase, change profile picture, loader

const ProfilePage = ({ navigation }) => {
  const isFocused = useIsFocused(); // Tracks if the screen is focused.
  const { userId, authTokens } = useContext(AuthContext); // Accesses auth context for user ID and tokens.
  const [userData, setUserData] = useState(null); // State to store user data.
  const [userPosts, setUserPosts] = useState([]); // State to store user's posts.
  const [selectedTab, setSelectedTab] = useState("posts"); // State to manage selected tab between posts and reviews.
  const [location, setLocation] = useState(null); //State to manage Location
  const [errorMsg, setErrorMsg] = useState(null); //state to manage Error messages
  const scrollViewRef = useRef(null); // Reference to the ScrollView for programmatically controlling scroll behavior.
  const { profilePicUpdated, updateProfilePic } = useAppState();

  useEffect(() => {
    if (profilePicUpdated) {
      // Perform re-fetch logic here
      // fetchFoodListings();
      getUserData(userId, authTokens)
        .then((data) => {
          setUserData(data); // Stores fetched user data in state.
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });

      // After re-fetching, reset the postCreated state
      updateProfilePic();
    }
  }, [profilePicUpdated, updateProfilePic]);

  // Resets selected tab to 'posts' and scrolls to the top when the screen is re-focused.
  useEffect(() => {
    if (!isFocused) {
      setSelectedTab("posts");
      scrollViewRef.current?.scrollTo({ y: 0, animated: false });
    }
  }, [isFocused]);

  // Request gallery permissions
  async function requestGalleryPermission() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need gallery permissions to make this work!");
      return false;
    }
    return true;
  }

  // Fetches user data from the backend using userId and authTokens when the screen is focused.
  useEffect(() => {
    if (isFocused && userId && authTokens) {
      getUserData(userId, authTokens)
        .then((data) => {
          setUserData(data); // Stores fetched user data in state.
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [isFocused, userId, authTokens]);

  // Navigates to the EditProfile screen.
  const goToSettings = () => {
    navigation.navigate("EditProfile");
    console.log("Settings button pressed");
  };

  // Handle change pfp
  const handleChangePfp = async () => {
    // Request gallery permissions
    const hasPermission = await requestGalleryPermission();
    if (!hasPermission) return;

    // Launch image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Ensures the cropped image is square
      quality: 1,
    });

    if (!result.canceled) {
      // Handle the selected image URI
      console.log(result.assets);
      // Display the selected image in UI and prepare for upload
      // TODO: Upload to server
      try {
        await updateProfilePicture(userId, authTokens, result);
        await updateProfilePic();
      } catch (error) {
        // Handle error if createProductImages fails
        console.error("Error updating profile picture images:", error);
      }
    }
  };

  // TODO: Requests permission to access the device's location and fetches the current location.

  // Fetches the user's posts from the backend using authTokens.
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const productData = await getUserProductList(authTokens);
        if (Array.isArray(productData)) {
          setUserPosts(productData.slice(0, 3)); // Stores the first 3 posts in state.
        } else {
          console.error("Product data is not an array:", productData);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (userId && authTokens) {
      fetchPosts();
    }
  }, [userId, authTokens, isFocused]);

  return (
    <ScrollView style={styles.container} ref={scrollViewRef}>
      {/* Background image and user's profile information */}
      <ImageBackground
        source={require("../../assets/waves_profile.png")}
        style={styles.coverImage}
        resizeMode="cover"
      />

      {/* Settings button to navigate to EditProfile */}
      <TouchableOpacity
        onPress={goToSettings}
        style={styles.settingsButtonContainer}
        activeOpacity={1}
      >
        <View style={styles.circleBackground}>
          <Image
            source={require("../../assets/icons/apple.png")}
            style={styles.settingsIcon}
          />
        </View>
      </TouchableOpacity>

      {/* Displays user's profile picture, name, location, and rating */}
      <View style={styles.profileInfoContainer}>
        <View style={styles.profilePictureContainer}>
          <TouchableOpacity onPress={handleChangePfp} activeOpacity={1}>
            <Image
              source={
                userData?.profile_picture
                  ? { uri: userData.profile_picture }
                  : require("../../assets/icons/profile.png")
              }
              style={styles.profilePicture}
            />

            {/* Edit Icon for updating profile picture */}
            <View style={styles.editIconContainer}>
              <Image
                source={require("../../assets/icons/plus.png")}
                style={styles.editIcon}
              />
            </View>
          </TouchableOpacity>
        </View>

        <Rating
          size={18}
          rating={Math.round(userData?.rating || 5)}
          fillColor="orange"
          spacing={5}
          disabled={true}
          style={styles.rating}
        />

        <CustomText style={styles.name} fontType={"subHeader"}>
          {getUserDisplayName(userData)}
        </CustomText>
        <CustomText style={styles.location} fontType={"subHeader"}>
          {"Location Not Available"}
        </CustomText>
      </View>

      {/* Tabs for switching between posts and reviews */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === "posts" ? styles.selectedTab : null,
          ]}
          onPress={() => setSelectedTab("posts")}
        >
          <CustomText style={styles.tabText} fontType={"subHeader"}>
            Posts
          </CustomText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === "reviews" ? styles.selectedTab : null,
          ]}
          onPress={() => setSelectedTab("reviews")}
        >
          <CustomText style={styles.tabText} fontType={"subHeader"}>
            Reviews
          </CustomText>
        </TouchableOpacity>
      </View>

      {/* Container for displaying user's posts, shown only when 'posts' tab is selected */}
      <View
        style={[
          styles.postsContainer,
          selectedTab !== "posts" && { display: "none" },
        ]}
      >
        {userPosts.map((post, index) => (
          <View key={index} style={styles.postCardContainer}>
            <PostCard
              post={post}
              onPress={() =>
                navigation.navigate("PostDetails", { listing: post })
              }
            />
          </View>
        ))}
      </View>

      {/* Container for displaying user's reviews, shown only when 'reviews' tab is selected */}
      <View
        style={[
          styles.reviewsContainer,
          selectedTab !== "reviews" && { display: "none" },
        ]}
      >
        {userData &&
        userData.received_reviews &&
        userData.received_reviews.length > 0 ? (
          userData.received_reviews.map((review, index) => (
            <PostReview key={index} review={review} />
          ))
        ) : (
          <CustomText style={styles.noReviewsText}>No reviews yet</CustomText>
        )}
      </View>
    </ScrollView>
  );
};

// Formats user's display name by capitalizing the first letter of the first name and appending the first letter of the last name in uppercase.
const getUserDisplayName = (userData) => {
  const firstName = userData?.firstname || "";
  const lastName = userData?.lastname || "";
  const formattedFirstName =
    firstName.charAt(0).toUpperCase() + firstName.slice(1);
  const initialOfLastName = lastName.charAt(0).toUpperCase();

  return `${formattedFirstName} ${initialOfLastName}`;
};

export default ProfilePage;
