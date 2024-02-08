import React, {useRef} from 'react';
import { View, Image, StyleSheet, Dimensions, Animated, TouchableOpacity  } from 'react-native';
import CustomText from '../CustomText';

const windowWidth = Dimensions.get('window').width;


const PostCard = ({ post, onPress }) => {
  
  // Function to shorten the description text
  const shortenText = (text, maxLength = 25) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  const scaleValue = useRef(new Animated.Value(1)).current;

  const onCardPressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  const onCardPressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      onPressIn={onCardPressIn}
      onPressOut={onCardPressOut}
      onPress={onPress}
      activeOpacity={1}
    >
      <Animated.View style={[styles.card, { transform: [{ scale: scaleValue }] }]}>
        <Image source={{ uri: post?.images[0]?.image }} style={styles.image} />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    margin: 5,
    width: (windowWidth / 2) - 20, // Adjust the width to fit two columns
  },
  image: {
    width: '100%',
    height: 120, 
    borderRadius: 10,
  },
  content: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 12,
    color: '#666',
  },
});

export default PostCard;
