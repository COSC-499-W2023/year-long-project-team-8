import React, { useContext, useEffect, useState, useRef } from 'react';
import { View, Image, TouchableOpacity, ScrollView, ImageBackground} from 'react-native';
import * as Location from 'expo-location';
import { Rating } from '@kolking/react-native-rating';
import PostCard from './PostCard';
import { getUserData, getUserProductList } from '../helperFunctions/apiHelpers';
import AuthContext from '../../context/AuthContext';
import styles from './profilePageStyles';
import { useIsFocused } from "@react-navigation/native";
import CustomText from "../CustomText";
import PostReview from './PostReview';

const ProfilePage = ({ navigation }) => {
  const isFocused = useIsFocused();
  const { userId, authTokens } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [selectedTab, setSelectedTab] = useState('posts'); 
  const scrollViewRef = useRef(null);

  useEffect(() => {
    if (!isFocused) {
      // Reset to 'posts' tab
      setSelectedTab('posts');
  
      // Scroll to the top
      scrollViewRef.current?.scrollTo({ y: 0, animated: false });
    }
  }, [isFocused]);


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

  return (
    <ScrollView style={styles.container}   ref={scrollViewRef}>
      {/*TODO: get the average rating for the user and implement here*/}
      <ImageBackground
        source={require('../../assets/waves_profile.png')} // Replace with your actual background image
        style={styles.coverImage}
        resizeMode="cover"
      />
  
      <TouchableOpacity onPress={goToSettings} style={styles.settingsButtonContainer} activeOpacity={1}>
        <View style={styles.circleBackground}>
          <Image
            source={require('../../assets/icons/document-editor.png')} // Ensure this is the correct path to your icon
            style={styles.settingsIcon}
          />
        </View>
      </TouchableOpacity>

      {/* Profile Information */}
      <View style={styles.profileInfoContainer}>
        <View style={styles.profilePictureContainer}>
          <Image
            source={userData?.profile_picture ? { uri: userData.profile_picture } : require('../../assets/icons/profile.png')}
            style={styles.profilePicture}
          />
        </View>

        <Rating
          size={18}
          rating={userData?.rating || 5}
          fillColor="orange"
          spacing={5}
          disabled={true}
          style={styles.rating}
        />

        <CustomText style={styles.name} fontType={'subHeader'}>
          {getUserDisplayName(userData)}
        </CustomText>
        <CustomText style={styles.location} fontType={"subHeader"}>{userData?.location || 'Kelowna, Canada'}</CustomText>
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

      {/* Posts Container */}
      <View style={[styles.postsContainer, selectedTab !== 'posts' && { display: 'none' }]}>
        {userPosts.map((post, index) => (
          <View key={index} style={styles.postCardContainer}>
            <PostCard post={post} onPress={() => navigation.navigate('PostDetails', { listing: post })} />
          </View>
        ))}
      </View>

      {/* Reviews Container */}
      <View style={[styles.reviewsContainer, selectedTab !== 'reviews' && { display: 'none' }]}>
        {userData && userData.received_reviews && userData.received_reviews.length > 0 ? (
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
  const firstName = userData?.firstname || '';
  const lastName = userData?.lastname || '';
  return `${firstName.charAt(0).toUpperCase() + firstName.slice(1)} ${lastName.charAt(0).toUpperCase() + lastName.slice(1)}`;
};


export default ProfilePage;
