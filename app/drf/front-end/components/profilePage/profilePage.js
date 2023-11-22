import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import styles from './profilePageStyles';
import { getUserData } from '../helperFunctions/apiHelpers';
import AuthContext from '../../context/AuthContext';
import StarRating from './ratingIcons';

const ProfilePage = () => {
  // Context and state
  const { authTokens, userId } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [rating] = useState(3.5);

  // Fetch user data on component mount
  useEffect(() => {
    getUserData(userId, authTokens)
      .then((data) => setUserData(data))
      .catch((error) => console.error('Error fetching user data:', error));
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
        <Text style={styles.name}>Brandon Mack</Text>

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
