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
      <View style={styles.ratingContainer}>
        <StarRating rating={rating} />
      </View>

      <View style={styles.profileContainer}>
        <Image
          source={require('../../assets/images/profilePage/pfp.png')}
          style={styles.profilePicture}
        />

        {/* users first and last name {userData && <Text style={styles.name}>{userData.email}</Text>} */}
        <Text style={styles.name}>Brandon Mack</Text>

        <View style={styles.locationContainer}>
          <Text style={styles.location}>Kelowna, BC</Text>
        </View>
      </View>

      <View style={styles.centeredPostsContainer}>
        <Text style={styles.recentPostsText}>Recent Posts</Text>
          <View style={styles.postsContainer}>
          {[1, 2, 3].map((index) => (
            <View key={index} style={styles.postContainer}>
              <View style={styles.post}></View>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllButtonText}>View All</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfilePage;
