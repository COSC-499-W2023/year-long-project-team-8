import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import styles from './profilePageStyles';
import { getUserData } from '../helperFunctions/apiHelpers';
import AuthContext from '../../context/AuthContext';
import StarRating from './ratingIcons';

const ProfilePage = () => {
  const { authTokens, userId } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [rating, setRating] = useState(3.5);

  const handleStarPress = (newRating) => {
    setRating(newRating);
  };

  useEffect(() => {
    getUserData(userId, authTokens)
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, [userId, authTokens]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/profilePage/background.png')}
        style={styles.headerImage}
      />
      <TouchableOpacity style={styles.settingsButton}>
        <Image
          source={require('../../assets/images/profilePage/settings.png')}
          style={styles.settingsIcon}
        />
      </TouchableOpacity>
      <View style={styles.ratingContainer}>
        <StarRating rating={rating}/>
      </View>

      <View style={styles.profileContainer}>
        <Image
          source={require('../../assets/images/profilePage/pfp.png')}
          style={styles.profilePicture}
        />
        {userData && <Text style={styles.name}>{userData.email}</Text>}
        <View style={styles.locationContainer}>
          <Image
            source={require('../../assets/images/profilePage/location.png')}
            style={styles.locationIcon}
          />
          <Text style={styles.location}>Kelowna, BC</Text>
        </View>
      </View>

      <View style={styles.centeredPostsContainer}>
        <Text style={styles.recentPostsText}>Recent Posts</Text>
        <ScrollView
          horizontal
          style={styles.postsContainer}
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.postContainer}>
            <View style={styles.post}></View>
          </View>
          {/* Add more post containers as needed */}
        </ScrollView>
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllButtonText}>View All</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfilePage;
