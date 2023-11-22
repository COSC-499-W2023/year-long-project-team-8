import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { getUserData, updateUserData } from '../helperFunctions/apiHelpers';
import AuthContext from '../../context/AuthContext';
import StarRating from './ratingIcons';
import styles from './profilePageStyles';

/**
 * ProfilePage component represents the user's profile page.
 * It displays user information, rating, recent posts, and provides an option to edit details.
 */
const ProfilePage = () => {
  // Context and state
  const { authTokens, userId } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [phone, setPhone] = useState('');
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
          {userData?.firstname ? userData.firstname.charAt(0).toUpperCase() + userData.firstname.slice(1) : 'First'} {userData?.lastname ? userData.lastname.charAt(0).toUpperCase() + userData.lastname.slice(1) : 'Last'}
        </Text>

        {/* Displaying user's location */}
        <View style={styles.locationContainer}>
          <Text style={styles.location}>Kelowna, BC</Text>
        </View>
      </View>

      {/* Section for displaying recent posts */}
      <View style={styles.centeredPostsContainer}>
        <Text style={styles.recentPostsText}>Recent Posts</Text>
        {/* Container for displaying multiple post components */}
        <View style={styles.postsContainer}>
          {[1, 2, 3].map((index) => (
            <View key={index} style={styles.postContainer}>
              {/* Individual post component */}
              <View style={styles.post}></View>
            </View>
          ))}
        </View>

        {/* Button to view all posts */}
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllButtonText}>View All</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfilePage;
