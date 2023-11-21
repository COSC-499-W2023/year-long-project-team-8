import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

{/* set the max rating and create an array of stars */}
const StarRating = ({ rating }) => {
  const maxRating = 5;
  const starElements = [];

{/* styling for the star rating system */}
  const StarStyle = StyleSheet.create({
    starIcon: {
      color: '#F8B951',
      fontSize: 30,
      marginRight: 3,
      marginLeft: 3,
      shadowColor: 'black',
      shadowOffset: { width: 8, height: 5 },
      shadowOpacity: 0.5,
      shadowRadius: 4,
    },
  });

  {/* calculations for finding the score */}
  //TODO: will need to be changed to get the actual score from the database
  for (let i = 1; i <= maxRating; i++) {
    const isHalfStar = i - 0.5 <= rating && rating < i;
    const isFilledStar = i <= rating;

    {/* set the stars visibility */}
    starElements.push(
      <Icon
        name={isHalfStar ? 'star-half-full' : isFilledStar ? 'star' : 'star-o'}
        key={i}
        style={StarStyle.starIcon}
      />
    );
  }

  {/* returning the rating in star form to the profilePage */}
  return (
    <View style={{ flexDirection: 'row' }}>
      {starElements}
    </View>
  );
};

export default StarRating;
