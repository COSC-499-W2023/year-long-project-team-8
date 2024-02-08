import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Rating } from '@kolking/react-native-rating';
import CustomText from '../CustomText';

const ProfileReview = ({ review }) => {

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <View style={styles.container}>
    <CustomText style={styles.content} numberOfLines={2} ellipsizeMode="tail">
        {review.content}
      </CustomText>      
      <Rating
        rating={review.rating}
        size={20}
        fillColor="orange"
        spacing={5}
        disabled={true}
        style={styles.rating}
      />
      <CustomText style={styles.timestamp}>{formatDate(review.timestamp)}</CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginTop:10,
    margin: 5,
  },
  content: {
    fontSize: 15,
    marginBottom: 5,
  },
  rating: {
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  timestamp: {
    fontSize: 14,
    color: '#666',
  },
});

export default ProfileReview;
