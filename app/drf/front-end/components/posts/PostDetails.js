import React, { useState } from "react";
import { View, Image, ScrollView, Dimensions, TouchableOpacity } from "react-native";
import { Divider } from "react-native-paper";
import CustomText from "../CustomText";
import Carousel from 'react-native-reanimated-carousel';
import styles from "./styles";
import ChatButton from "../loginSignup/ButtonLanding";

const { width: windowWidth } = Dimensions.get('window');

const PostDetails = ({ route, navigation }) => {
  const { listing } = route.params;
  const [activeIndex, setActiveIndex] = useState(0);

  const renderItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
    </View>
  );  

  const renderPagination = () => {
    return (
      <View style={styles.paginationOverlay}>
        <View style={styles.paginationContainer}>
          {listing.images.map((_, index) => (
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
    );
  };
  

  const formatWithSpacesAfterCommas = (text) => {
    if (!text) return '';
    return Array.isArray(text) ? text.join(', ') : text.split(',').join(', ');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(date);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollview}>
        <View style={styles.carouselContainer}>
          {/* Check if there are multiple images */}
          {listing.images && listing.images.length > 1 ? (
            <>
              <Carousel
                loop={false}
                width={windowWidth}
                height={250}
                data={listing.images}
                renderItem={renderItem}
                autoPlay={false}
                parallaxScrollingOffset={50}
                parallaxScrollingScale={0.9}
                scrollEnabled
                onSnapToItem={index => setActiveIndex(index)}
              />
              {/* Render pagination only if there are multiple images */}
              <View style={styles.paginationOverlay}>
                <View style={styles.paginationContainer}>
                {listing.images.map((_, index) => (
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
          ) : listing.images && listing.images.length === 1 ? (
            // Directly render the single image without the carousel
            <Image source={{ uri: listing.images[0].image }} style={styles.image} />
          ) : null}
        </View>

        <View style={styles.card}>
          <CustomText fontType={"title"} style={styles.title}>
            {listing.title}
          </CustomText>

          <View style={styles.detailRow}>
            <CustomText fontType={"text"} style={styles.detail}>
              Categories: {formatWithSpacesAfterCommas(listing.categories)}
            </CustomText>
          </View>

          <CustomText fontType={"subHeader"} style={styles.detail}>
            Best Before: {formatDate(listing.best_before)}
          </CustomText>

          {/* Conditionally display allergens */}
          {listing.allergens && listing.allergens.length > 0 && (
            <>
              <Divider style={styles.divider} />
              <CustomText fontType={"subHeader"} style={styles.distanceText}>
                Allergens: {formatWithSpacesAfterCommas(listing.allergens)}
              </CustomText>
            </>
          )}
          <CustomText fontType={"text"} style={styles.description}>
            {listing.content}
          </CustomText>
        </View>
        <View style={styles.buttonContainer}>
          {/* Go Back Button */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.goBackButton}
          >
            <CustomText style={styles.goBackButtonText} fontType={"title"}>{'GO BACK'}</CustomText>
          </TouchableOpacity>

          {/* Chat Button */}
          <View style={styles.chatButtonContainer}>
            <ChatButton
              title="CHAT"
              onPress={() => console.log("chat")}
            />     
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default PostDetails;
