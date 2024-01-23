import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';

import { getUserData } from '../helperFunctions/apiHelpers';
import AuthContext from '../../context/AuthContext';
import StarRating from './ratingIcons';
import styles from './profilePageStyles';
import {useIsFocused} from "@react-navigation/native";

/**
 * ProfilePage component represents the user's profile page.
 * It displays user information, rating, recent posts, and provides an option to view all posts.
 */
const ProfilePage = () => {

    const isFocused = useIsFocused();
    const { userId, authTokens} = useContext(AuthContext);
  const [userData, setUserData] = useState("");
  const [rating] = useState(5);
  const [currentPosition, setCurrentPosition] = useState(null);

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
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentPosition(location);
    })()
  }, []);
  return (
    <View style={styles.container}>
        {/*TODO: get the average rating for the user and implement here*/}
      {/* Section for displaying user rating */}
      <View style={styles.ratingContainer}>
        <StarRating rating={rating} />
      </View>

      {/* Section for displaying user profile information */}
      <View style={styles.profileContainer}>
        <Image
          source={require('../../assets/images/profilePage/pfp.png')}
          style={styles.profilePicture}
        />

        {/* Displaying user's name */}
        <Text style={styles.name}>
          {getUserDisplayName(userData)}
        </Text>

        {/* Displaying user's location */}
        <View style={styles.locationContainer}>
            {/*TODO: get users location and input it here*/}
          <Text style={styles.location}>Kelowna, BC</Text>
        </View>
      </View>

      {/* Section for displaying recent posts */}
      <View style={styles.centeredPostsContainer}>
        <Text style={styles.recentPostsText}>Recent Posts</Text>
        {/* Container for displaying multiple post components */}
        <View style={styles.postsContainer}>
          {renderRecentPosts()}
        </View>

        {/* Button to view all posts */}
          {/*TODO: once page with all posts is built link this button with it*/}
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllButtonText}>View All</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const getUserDisplayName = (userData) => {
  const firstName = userData?.firstname || '';
  const lastName = userData?.lastname || '';
  return `${firstName.charAt(0).toUpperCase() + firstName.slice(1)} ${lastName.charAt(0).toUpperCase() + lastName.slice(1)}`;
};

const renderRecentPosts = () => {
  return [1, 2, 3].map((index) => (
    <View key={index} style={styles.postContainer}>
      {/* Individual post component */}
        {/*TODO: once posts page is complete add the three most recent posts here*/}
      <View style={styles.post}></View>
    </View>
  ));
};

export default ProfilePage;
