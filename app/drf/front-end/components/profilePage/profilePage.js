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
  const [rating, setRating] = useState(4);

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
      // main container
    <View style={styles.container}>
        {/* holds the header image */}
      <Image
        source={require('../../assets/images/profilePage/background.png')}
        style={styles.headerImage}
      />
        {/* settings button*/}
      <TouchableOpacity style={styles.settingsButton}>
          {/* image for the settings button */}
        <Image
          source={require('../../assets/images/profilePage/settings.png')}
          style={styles.settingsIcon}
        />
      </TouchableOpacity>
        {/* rating container */}
      <View style={styles.ratingContainer}>
          {/* shows the rating*/}
        <StarRating rating={rating} />
      </View>
        {/* container for profile information */}
      <View style={styles.profileContainer}>
          {/* profile picture */}
        <Image
          source={require('../../assets/images/profilePage/pfp.png')}
          style={styles.profilePicture}
        />
          {/* users first and last name */}
        {userData && <Text style={styles.name}>{userData.email}</Text>}
          {/* container to hold the location information */}
        <View style={styles.locationContainer}>
            {/* location icon */}
          <Image
            source={require('../../assets/images/profilePage/location.png')}
            style={styles.locationIcon}
          />
            {/* location text */}
          <Text style={styles.location}>Kelowna, BC</Text>
        </View>
      </View>

        {/* recent post container */}
      <View style={styles.centeredPostsContainer}>
        <Text style={styles.recentPostsText}>Recent Posts</Text>
          {/* allows the posts to be scrolled horizontally */}
        <ScrollView
          horizontal
          style={styles.postsContainer}
          showsHorizontalScrollIndicator={false}
        >
            {/* recent posts are put here */}
          <View style={styles.postContainer}>
            <View style={styles.post}></View>
          </View>
            <View style={styles.postContainer}>
            <View style={styles.post}></View>
          </View>
            <View style={styles.postContainer}>
            <View style={styles.post}></View>
          </View>
          {/* Add more post containers as needed */}
        </ScrollView>
          {/* button that takes user to the page with all of their posts */}
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllButtonText}>View All</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfilePage;
