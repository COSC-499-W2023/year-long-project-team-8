import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { getUserData } from '../helperFunctions/apiHelpers';
import AuthContext from '../../context/AuthContext';
import StarRating from './ratingIcons';
import styles from './profilePageStyles';

/**
 * ProfilePage component represents the user's profile page.
 * It displays user information, rating, recent posts, and provides an option to view all posts.
 */
const ProfilePage = () => {
  // Context and state
  const { authTokens, userId } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [rating] = useState(3.5);

  // Fetch user data on component mount
  useEffect(() => {
    // Fetch user data using API
    getUserData(userId, authTokens)
      .then((data) => {
        // Set the user data in the state
        setUserData(data);
        console.log("User Data:", data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [userId, authTokens]);

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
  const firstName = userData?.firstname || 'First';
  const lastName = userData?.lastname || 'Last';
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
