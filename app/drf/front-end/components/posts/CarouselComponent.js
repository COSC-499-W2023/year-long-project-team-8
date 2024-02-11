import React, { useState } from 'react';
import { View, Image, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import styles from './styles'; 

const { width: windowWidth } = Dimensions.get('window');

const CarouselComponent = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const renderItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
    </View>
  );

  return (
    <View style={styles.carouselContainer}>
      {images && images.length > 1 ? (
        <>
          <Carousel
            loop={true}
            width={windowWidth}
            height={250}
            data={images}
            renderItem={renderItem}
            autoPlay={false}
            parallaxScrollingOffset={50}
            parallaxScrollingScale={0.9}
            scrollEnabled
            onSnapToItem={(index) => setActiveIndex(index)}
          />
          <View style={styles.paginationOverlay}>
            <View style={styles.paginationContainer}>
              {images.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.paginationDot,
                    activeIndex === index ? styles.paginationDotActive : styles.paginationDotInactive,
                  ]}
                />
              ))}
            </View>
          </View>
        </>
      ) : images && images.length === 1 ? (
        <View style={styles.imageContainer}>
          <Image source={{ uri: images[0].image }} style={styles.image} />
        </View>
      ) : null}
    </View>
  );
};

export default CarouselComponent;
