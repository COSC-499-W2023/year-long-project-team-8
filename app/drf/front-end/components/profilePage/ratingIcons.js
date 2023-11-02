import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

const StarRating = ({ rating }) => {
  const maxRating = 5;
  const starElements = [];

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

  for (let i = 1; i <= maxRating; i++) {
    const isHalfStar = i - 0.5 <= rating && rating < i;
    const isFilledStar = i <= rating;

    starElements.push(
      <Icon
        name={isHalfStar ? 'star-half-full' : isFilledStar ? 'star' : 'star-o'}
        key={i}
        style={StarStyle.starIcon}
      />
    );
  }

  return (
    <View style={{ flexDirection: 'row' }}>
      {starElements}
    </View>
  );
};

export default StarRating;
