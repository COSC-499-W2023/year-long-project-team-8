// GiverDetails.js
import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import styles from './styles'; 
import CustomText from "../CustomText"; 
import { Rating } from '@kolking/react-native-rating'; 

const DetailsComponent = ({ displayName, rating, reviews, userProfilePicture, navigation, userId, myPost,

}) => {
  const dummyPfp = require("../../assets/icons/profile.png"); 
  const profilePicSource = userProfilePicture ? { uri: userProfilePicture } : dummyPfp;
  console.log("myPost", myPost)

   // Handler function for when the reviews button is pressed
   const onReviewsPress = () => {
    if (myPost) {
      // Navigate to your own profile page
      navigation.navigate('Tabs', {
        screen: 'Profile',
        params: {
          selectedTab: 'reviews',
        },
      });
      
    } else {
      // Navigate to the profile of the user who posted the post
      navigation.navigate("OtherProfile", {
        userId: userId,
        selectedTab: "reviews",
      });
    }
  };
  

  const reviewText = reviews === 1 ? "review" : "reviews";


  return (
    <View style={styles.giverDetailsContainer}>
      <CustomText style={styles.giverTitle} fontType={"title"}>Giver</CustomText>
      <View style={styles.giverContent}>
        {/* Conditionally set the source of the Image */}
        <Image source={profilePicSource} style={styles.profilePic}/>
        <View style={styles.giverInfo}>
          <CustomText style={styles.giverName} fontType={"text"}>{displayName}</CustomText>
          <View style={styles.ratingDisplay}>
            <Rating
             size={18}
             rating={rating}
             fillColor="orange" 
             spacing={5}
             disabled={true}
             />
            <CustomText style={styles.rating} fontType={"text"}>{rating}</CustomText>
            <TouchableOpacity onPress={onReviewsPress}>
              <CustomText style={styles.reviews} fontType={"text"}>({reviews} {reviewText})</CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DetailsComponent;
