import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import * as Location from "expo-location";
import { Rating } from "@kolking/react-native-rating";
import PostCard from "../profilePage/PostCard";
import { getUserData, getProductListById } from "../helperFunctions/apiHelpers";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import styles from "../profilePage/profilePageStyles";
import { useIsFocused } from "@react-navigation/native";
import CustomText from "../CustomText";
import { HeaderBackButton } from "@react-navigation/elements";
import PostReview from "../profilePage/PostReview";

//TODO: Location, fetch posts for specific user, dummy pfp icon resolution increase, loader

const OtherProfile = ({ route, navigation }) => {
  const { userId } = route.params;
  const isFocused = useIsFocused();
  const { authTokens } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [selectedTab, setSelectedTab] = useState("posts");
  const scrollViewRef = useRef(null);

  useEffect(() => {
    if (!isFocused) {
      // Reset to 'posts' tab
      setSelectedTab("posts");

      // Scroll to the top
      scrollViewRef.current?.scrollTo({ y: 0, animated: false });
    }
  }, [isFocused]);

  const backArrowIcon = require("../../assets/icons/back-arrow.png");

  useEffect(() => {
    if (isFocused && userId && authTokens) {
      getUserData(userId, authTokens)
        .then((data) => {
          setUserData(data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [isFocused, userId, authTokens]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentPosition(location);
    })();
  }, []);

  //TODO: Fetch posts for specific id not working.
  useEffect(() => {
    const fetchPosts = async () => {
      console.log("Fetching products for user ID:", userId); // LOG
      console.log(authTokens);
      try {
        const productData = await getProductListById(authTokens, userId);

        if (productData && Array.isArray(productData.results)) {
          setUserPosts(productData.results);
        } else {
          console.error("Unexpected format for product data:", productData);
          setUserPosts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (userId && authTokens) {
      fetchPosts();
    }
  }, [userId, authTokens, isFocused]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginLeft: 20 }}
        >
          <Image source={backArrowIcon} style={{ width: 25, height: 25 }} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <ScrollView style={styles.container} ref={scrollViewRef}>
      <ImageBackground
        source={require("../../assets/waves_profile.png")}
        style={styles.coverImage}
        resizeMode="cover"
      />

      {/* Profile Information */}
      <View style={styles.profileInfoContainer}>
        <View style={styles.profilePictureContainer}>
          <Image
            source={
              userData?.profile_picture
                ? { uri: userData.profile_picture }
                : require("../../assets/icons/profile.png")
            }
            style={styles.profilePicture}
          />
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
          {userData?.location || "Kelowna, Canada"}
        </CustomText>
      </View>

      {/*Tabs*/}
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

      {/* Posts Container */}
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

      {/* Reviews Container */}
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

const getUserDisplayName = (userData) => {
  const firstName = userData?.firstname || "";
  const lastName = userData?.lastname || "";
  const formattedFirstName =
    firstName.charAt(0).toUpperCase() + firstName.slice(1);
  const initialOfLastName = lastName.charAt(0).toUpperCase();

  return `${formattedFirstName} ${initialOfLastName}`;
};

export default OtherProfile;
