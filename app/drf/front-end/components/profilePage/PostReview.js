import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Rating } from '@kolking/react-native-rating'; // Import Rating component from kolking/react-native-rating
import CustomText from '../CustomText'; // CustomText component for consistent text styling

// ProfileReview component displays an individual review with content, rating, and timestamp
const ProfileReview = ({ review }) => {
  // Function to format date strings into a more readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString); // Convert string to Date object
    // Format date to 'Month Day, Year' (e.g., 'January 1, 2024')
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <View style={styles.container}>
      {/* Review content with text truncation after 2 lines */}
      <CustomText style={styles.content} numberOfLines={2} ellipsizeMode="tail">
        {review.content}
      </CustomText>
      {/* Rating component displaying the review's rating */}
      <Rating
        rating={review.rating}
        size={20}
        fillColor="orange"
        spacing={5}
        disabled={true} // Make the rating read-only
        style={styles.rating}
      />
      {/* Formatted timestamp of the review */}
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
    margin: 10,
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
