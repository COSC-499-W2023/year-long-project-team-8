import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, ScrollView, ImageBackground  } from 'react-native';
import * as Location from 'expo-location';
import { Rating } from '@kolking/react-native-rating';
import PostCard from '../profilePage/PostCard';
import { getUserData, getProductListById } from '../helperFunctions/apiHelpers';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import styles from '../profilePage/profilePageStyles';
import { useIsFocused } from "@react-navigation/native";
import CustomText from "../CustomText";
import { HeaderBackButton } from '@react-navigation/elements';
import ProfileReview from '../profilePage/PostReview';

const OtherProfile = ({ route, navigation }) => { // Now accepting userId as a pro
    const { listing, userId } = route.params;
  const isFocused = useIsFocused();
  const { authTokens } = useContext(AuthContext); // Only authTokens is needed from AuthContext
  const [userData, setUserData] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [selectedTab, setSelectedTab] = useState('posts');

  const backArrowIcon = require('../../assets/icons/back-arrow.png');

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

  const getReviewMessage = (reviews) => {
    const count = reviews?.length || 0; 
    if (count === 0) return "New User!";
    if (count === 1) return "1 review";
    return `${count} reviews`;
  };

  //TODO: Fetch posts for specific id not working.
  useEffect(() => {
    const fetchPosts = async () => {
      console.log("Fetching products for user ID:", userId); // Debugging log
      try {
        const productData = await getProductListById(authTokens, userId);
  
        if (productData && Array.isArray(productData.results)) {
          setUserPosts(productData.results);
        } else {
          console.error('Unexpected format for product data:', productData);
          setUserPosts([]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    if (userId && authTokens) {
      fetchPosts();
    }
  }, [userId, authTokens, isFocused]);
  
  

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 20 }}>
          <Image source={backArrowIcon} style={{ width: 25, height: 25 }} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={require('../../assets/waves_profile.png')} 
        style={styles.coverImage}
        resizeMode="cover"
      />
      {/* User Profile Information */}
      <View style={styles.profileContainer}>
        <View style={styles.profileAndRatingContainer}>
          <Image
            source={userData?.profile_picture ? { uri: userData.profile_picture } : require('../../assets/icons/profile.png')}
            style={styles.profilePicture}
          />
          <Rating
            size={15} 
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
      </View>

      {/*Tabs*/}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'posts' ? styles.selectedTab : null]}
          onPress={() => setSelectedTab('posts')}
        >
          <CustomText style={styles.tabText} fontType={'subHeader'}>Posts</CustomText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'reviews' ? styles.selectedTab : null]}
          onPress={() => setSelectedTab('reviews')}
        >
          <CustomText style={styles.tabText} fontType={'subHeader'}>Reviews</CustomText>
        </TouchableOpacity>
      </View>

      {/* Conditional Rendering for Posts */}
      {selectedTab === 'posts' && userPosts.map((post, index) => (
          <View key={index} style={styles.postCardContainer}>
            <PostCard post={post} onPress={() => navigation.navigate('PostDetails', { listing: post })} />
          </View>
        ))}

        {/* Conditional Rendering for Reviews */}
        {selectedTab === 'reviews' && (
          userData && userData.received_reviews && userData.received_reviews.length > 0 ? (
            userData.received_reviews.map((review, index) => (
              <ProfileReview key={index} review={review} />
            ))
          ) : (
            <CustomText style={styles.noReviewsText}>No reviews yet...</CustomText>
          )
        )}
    </ScrollView>
  );
};


const getUserDisplayName = (userData) => {
  const firstName = userData?.firstname || '';
  const lastName = userData?.lastname || '';
  return `${firstName.charAt(0).toUpperCase() + firstName.slice(1)} ${lastName.charAt(0).toUpperCase() + lastName.slice(1)}`;
};


export default OtherProfile;
