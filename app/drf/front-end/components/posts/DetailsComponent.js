// GiverDetails.js
import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import styles from './styles'; 
import CustomText from "../CustomText"; 
import { Rating } from '@kolking/react-native-rating'; 

const DetailsComponent = ({ displayName, rating, reviews, userProfilePicture }) => {
  const dummyPfp = require("../../assets/icons/profile.png"); 
  const profilePicSource = userProfilePicture ? { uri: userProfilePicture } : dummyPfp;

  // Handler function for when the reviews button is pressed
  const onReviewsPress = () => {
    console.log('Navigate to review!');
  };

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
              <CustomText style={styles.reviews} fontType={"text"}>({reviews} reviews)</CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DetailsComponent;
