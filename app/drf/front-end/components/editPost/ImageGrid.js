import React from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const imageMargin = 10; // Margin applied to the right and bottom of each image

const ImageGrid = ({ images, onImagePress }) => {
  return (
    <View style={styles.imageContainer}>
      {images.map((img, index) => {
        const isLastImage = index === images.length - 1; // Check if this is the last image
        const isOddNumberOfImages = images.length % 2 !== 0; // Check if the total number of images is odd

        // Apply full width style if this is the last image and there's an odd number of images
        const imageStyle = isLastImage && isOddNumberOfImages ? [styles.postImage, styles.fullWidthImage] : styles.postImage;
        return (
          <TouchableOpacity key={index} onPress={() => onImagePress(img, index)}>
            <Image source={{ uri: img.image }} style={imageStyle} />
          </TouchableOpacity>

        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between', 
    marginBottom: 5, 
    marginTop: 10
  },
  postImage: {
    width: (screenWidth / 2) - (3 * imageMargin), // Calculate width to fit two images per row with margins
    height: 160, 
    marginRight: imageMargin,
    marginBottom: imageMargin, 
    borderRadius: 10, 
  },
  fullWidthImage: {
    width: screenWidth - (5 * imageMargin), 
    marginRight: 0, 
  },
});

export default ImageGrid;
