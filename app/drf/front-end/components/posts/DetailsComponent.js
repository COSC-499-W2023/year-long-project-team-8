// GiverDetails.js
import React from 'react';
import { View, Image } from 'react-native';
import styles from './styles'; 
import CustomText from "../CustomText"; 
import { Rating } from '@kolking/react-native-rating'; 

const DetailsComponent = ({ displayName, rating, reviews }) => {
  const dummyPfp = require("../../assets/images/profilePage/pfp.png"); 

  return (
    <View style={styles.giverDetailsContainer}>
      <CustomText style={styles.giverTitle} fontType={"title"}>Giver</CustomText>
      <View style={styles.giverContent}>
        <Image source={dummyPfp} style={styles.profilePic}/>
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
            <CustomText style={styles.reviews} fontType={"subHeader"}>({reviews} reviews)</CustomText>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DetailsComponent;
