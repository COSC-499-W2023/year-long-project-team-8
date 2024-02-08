import React, { useContext, useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, ScrollView} from 'react-native';
import * as Location from 'expo-location';
import { Rating } from '@kolking/react-native-rating';
import PostCard from './PostCard';
import { getUserData, getUserProductList } from '../helperFunctions/apiHelpers';
import AuthContext from '../../context/AuthContext';
import styles from './profilePageStyles';
import { useIsFocused } from "@react-navigation/native";
import CustomText from "../CustomText";
import ProfileReview from './PostReview';

const ProfilePage = ({ navigation }) => {
  const isFocused = useIsFocused();
  const { userId, authTokens } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [userPosts, setUserPosts] = useState([]);


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

  const onReviewsPress = () => {
    console.log('Navigate to review!');
  };

  const goToSettings = () => {
    navigation.navigate('EditProfile');
    console.log('settings button pressed');
  }

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

  const getReviewMessage = (reviews) => {
    const count = reviews?.length || 0; // Handle null or undefined
    if (count === 0) return "New User!";
    if (count === 1) return "1 review";
    return `${count} reviews`;
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Use getUserProductList instead of fetchUserPosts
        const productData = await getUserProductList(authTokens);
        if (Array.isArray(productData)) {
          setUserPosts(productData.slice(0, 3)); // limit to top 4 posts
        } else {
          console.error('Product data is not an array:', productData);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    if (userId && authTokens) {
      fetchPosts();
    }
  }, [userId, authTokens, isFocused]); 

  console.log(userData);
  return (
    <ScrollView style={styles.container}>
      {/*TODO: get the average rating for the user and implement here*/}

      {/* User Profile Information */}
      <View style={styles.profileContainer}>
        <View style={styles.profileAndRatingContainer}>
          <Image
            source={userData?.profile_picture ? { uri: userData.profile_picture } : require('../../assets/icons/profile.png')}
            style={styles.profilePicture}
          />
          <Rating
            size={15} // Adjust size as needed
            rating={userData?.rating || 5}
            fillColor="orange"
            spacing={5}
            disabled={true}
            style={styles.rating}
          />
          
        </View>
        <View style={styles.userInfo}>
          <CustomText style={styles.name} fontType={'subHeader'}>
            {getUserDisplayName(userData)}
          </CustomText>
          <CustomText style={styles.location}>{userData?.location || 'Kelowna, Canada'}</CustomText>
        </View>
        <TouchableOpacity onPress={goToSettings} style={styles.settingsButtonContainer}>
          <Image
            source={require('../../assets/icons/edit.png')}
            style={styles.settingsButton}
          />
        </TouchableOpacity>
      </View>

      {/* Recent Posts */}
      <View style={styles.recentPostsContainer}>
        <View style={styles.postsGrid}>
          {userPosts.map((post, index) => (
            <PostCard key={index} post={post} onPress={() => navigation.navigate('PostDetails', { listing: post })} />
          ))}
          {userPosts.length > 0 && (
            <TouchableOpacity style={styles.viewAllButton} onPress={() => {/* Navigate to the page with all posts */}}>
              <CustomText style={styles.viewAllButtonText} fontType={'title'}>See More</CustomText>
            </TouchableOpacity>
          )}
        </View>
     

        {/* Profile Reviews Section */}
      {userData && userData.received_reviews && (
        <View style={styles.reviewsContainer}>
          {userData.received_reviews.slice(0, 3).map((review, index) => (
            <ProfileReview key={index} review={review} />
          ))}
          {userData.received_reviews.length > 3 && (
            <TouchableOpacity style={styles.seeReviewsButton} onPress={onReviewsPress}>
              <CustomText style={styles.seeReviewsText}>See More Reviews</CustomText>
            </TouchableOpacity>
          )}
        </View>
      )}
      </View>
    </ScrollView>
  );
};


const getUserDisplayName = (userData) => {
  const firstName = userData?.firstname || '';
  const lastName = userData?.lastname || '';
  return `${firstName.charAt(0).toUpperCase() + firstName.slice(1)} ${lastName.charAt(0).toUpperCase() + lastName.slice(1)}`;
};


export default ProfilePage;
