import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const StarRating = ({ rating }) => {
  const maxRating = 5;
  const starElements = [];

  const StarStyle = StyleSheet.create({
    starIcon: {
      color: '#222222',
      fontSize: 30,
      marginRight: 3,
      marginLeft: 3,
    },
    filledStar: {
      textShadowColor: 'grey',
      textShadowOffset: { width: 2.5, height: 2.5 },
      textShadowOpacity: 0.5,
      textShadowRadius: 1,
    },
    halfFilledStar: {
      textShadowColor: 'grey',
      textShadowOffset: { width: 2.5, height: 2.5 },
      textShadowOpacity: 0.5,
      textShadowRadius: 1,
    },
    emptyStar: {
      textShadowColor: 'grey',
      textShadowOffset: { width: 1.75, height: 1.75 },
      textShadowOpacity: 0.5,
      textShadowRadius: 1,
    }
  });

  for (let i = 1; i <= maxRating; i++) {
    const isHalfStar = i - 0.5 <= rating && rating < i;
    const isFilledStar = i <= rating;

    let starStyle;

    if (isHalfStar) {
      starStyle = [StarStyle.starIcon, StarStyle.halfFilledStar];
    } else if (isFilledStar) {
      starStyle = isFilledStar ? [StarStyle.starIcon, StarStyle.filledStar] : StarStyle.starIcon;
    } else {
        starStyle = [StarStyle.starIcon, StarStyle.emptyStar];
    }

    starElements.push(
      <Icon
        name={isHalfStar ? 'star-half-full' : isFilledStar ? 'star' : 'star-o'}
        key={i}
        style={starStyle}
      />
    );
  }

  return <View style={{ flexDirection: 'row' }}>{starElements}</View>;
};

export default StarRating;
