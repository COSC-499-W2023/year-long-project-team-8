import React, { useState,  useContext, useEffect } from "react";
import { View, Image, ScrollView, Dimensions, TextInput} from "react-native";
import { Divider } from "react-native-paper";
import CustomText from "../CustomText";
import Carousel from 'react-native-reanimated-carousel';
import styles from "./styles";
import ChatButton from "./ChatButton";
import { categoryIcons } from '../Categories';
import { Rating } from '@kolking/react-native-rating';
import { getUserData } from '../helperFunctions/apiHelpers';
import AuthContext from '../../context/AuthContext';


const { width: windowWidth } = Dimensions.get('window');


const PostDetails = ({ route, navigation }) => {
  const { listing } = route.params;
  const [activeIndex, setActiveIndex] = useState(0);
  const [message, onChangeMesage] = React.useState("Hi! Can I get this plate?");
  const [showFullDescription, setShowFullDescription] = useState(false);
  const chatBubble = require("../../assets/icons/chat-bubbles.png");
  const dummyPfp = require("../../assets/images/profilePage/pfp.png");
  const [userDetails, setUserDetails] = useState(null);
  const { authTokens } = useContext(AuthContext);

  const renderItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
    </View>
  );  
  
  const formatWithSpacesAfterCommas = (text) => {
    if (!text) return '';
    return Array.isArray(text) ? text.join(', ') : text.split(',').join(', ');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(date);
  }; 

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userData = await getUserData(listing.owner, authTokens);
        setUserDetails(userData);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    if (listing.owner && authTokens) {
      fetchUserDetails();
    }
  }, [listing.owner, authTokens]);

  console.log(userDetails); // Can't access user's rating. Need to add field profile picture too.

  
  // Helper function to display name or email
  const displayName = userDetails ? (userDetails.firstname || userDetails.email.split('@')[0]) : 'Unknown...';
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollview}>
        <View style={styles.carouselContainer}>
          {/* Check if there are multiple images */}
          {listing.images && listing.images.length > 1 ? (
            <>
               <Carousel
                  loop={true}
                  width={windowWidth}
                  height={250}
                  data={listing.images}
                  renderItem={renderItem}
                  autoPlay={false}
                  parallaxScrollingOffset={50}
                  parallaxScrollingScale={0.9}
                  scrollEnabled
                  onSnapToItem={(index) => setActiveIndex(index)} 
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
            <View style={styles.imageContainer}>
              <Image source={{ uri: listing.images[0].image }} style={styles.image} />
            </View>
          ) : null}
        </View>

        <View style={styles.card}>
          <CustomText fontType={"title"} style={styles.title}>
            {listing.title}
          </CustomText>

          <CustomText fontType={"subHeader"} style={styles.bestBefore}>
            Best Before: {formatDate(listing.best_before)}
          </CustomText>

          {/*Chat Section*/}
          <View style={styles.chatCard}>
            <View style={styles.chatHeader}>
              <Image source={chatBubble} style={styles.chatIcon}/>
              <CustomText fontType={"title"} style={styles.chatTitle}>Request Plate</CustomText>
            </View>
            <View style={styles.messageBox}>
              <TextInput
                style={styles.messageInput}
                onChangeText={onChangeMesage}
                value={message}
                maxLength= {50}
              />
              <ChatButton
              title="SEND"
              onPress={() => console.log("chat")}
              />               
            </View>
          </View>

          {/*Category Section*/}
          <View style={styles.categoryContainer}>
            <CustomText fontType={"title"} style={styles.categoryTitle}>Categories</CustomText>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginHorizontal: -10}}>
              <View style={styles.detailRow}>
                {listing.categories && typeof listing.categories === 'string' && listing.categories.split(',').map((category, index) => (
                  <View key={index} style={styles.categoryItem}>
                    <Image
                      source={categoryIcons[category.trim()]}
                      style={styles.categoryIcon}
                    />
                    <CustomText fontType={"text"} style={styles.categoryText}>
                      {category.trim()} 
                    </CustomText>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>

          {/*Divider*/}
          <View style={styles.dividerContainer}>
            <Divider style={styles.divider} />
          </View>

          {/*Description Section*/}
          <View style={styles.descriptionContainer}>
            <CustomText fontType={"title"} style={styles.descriptionTitle}>
              Description
            </CustomText>
            <CustomText fontType={"text"} style={styles.descriptionText}>
              {showFullDescription || listing.content.length <= 100
                ? listing.content
                : `${listing.content.substring(0, 100)}... `}
              {listing.content.length > 100 && (
                <CustomText
                  onPress={() => setShowFullDescription(!showFullDescription)}
                  style={styles.viewMoreText}>
                  {showFullDescription ? ' See Less' : ' See More'}
                </CustomText>
              )}
            </CustomText>
          </View>

          {/*Divider*/}
          <View style={styles.dividerContainer}>
            <Divider style={styles.divider} />
          </View>

          {/* Giver Details Section */}
          <View style={styles.giverDetailsContainer}>
            <CustomText style={styles.giverTitle} fontType={"title"}>Giver</CustomText>
            <View style={styles.giverContent}>
              <Image source={dummyPfp} style={styles.profilePic}/>
              <View style={styles.giverInfo}>
                <CustomText style={styles.giverName} fontType={"text"}>By {displayName}</CustomText>
                <View style={styles.ratingDisplay}>
                  <Rating
                   size={18}
                   rating={4.5}
                   fillColor="orange" 
                   spacing={5}
                   disabled={true}
                   />
                  <CustomText style={styles.rating} fontType={"text"}>4.5</CustomText>
                  <CustomText style={styles.reviews} fontType={"subHeader"}>(8 reviews)</CustomText>
                </View>
              </View>
            </View>
          </View>
        
          {/* Conditionally display allergens */}
          {listing.allergens && listing.allergens.length > 0 && (
            <>
            {/*Divider*/}
              <View style={styles.dividerContainer}>
                <Divider style={styles.divider} />
              </View>
              <CustomText fontType={"title"} style={styles.allergenTitle}>Allergens</CustomText>
              <CustomText fontType={"text"} style={styles.allergenText}>
                {formatWithSpacesAfterCommas(listing.allergens)}
              </CustomText>
            </>
          )}

          <View style={styles.dividerContainer}>
            <CustomText fontType={"subHeader"} style={styles.bestBefore}>
              Posted {formatDate(listing.created_at)}
            </CustomText>
          </View>

        </View>
      </ScrollView>
    </View>
  );
};

export default PostDetails;
