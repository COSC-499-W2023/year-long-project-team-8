import React, { useState,  useContext, useEffect } from "react";
import { View, ScrollView} from "react-native";
import { Divider } from "react-native-paper";
import CustomText from "../CustomText";
import styles from "./styles";
import { getUserData } from '../helperFunctions/apiHelpers';
import AuthContext from '../../context/AuthContext';
import { useFocusEffect } from '@react-navigation/native';
import DetailsComponent from "./DetailsComponent";
import ChatComponent from "./ChatComponent";
import CarouselComponent from "./CarouselComponent";
import CategoriesComponent from "./CategoriesComponent"
import DescriptionComponent from "./DescriptionComponent";
import AllergensComponent from "./AllergensComponent";

const PostDetails = ({ route, navigation }) => {
  const { listing } = route.params;
  const [message, onChangeMesage] = React.useState("Hi! Can I get this plate?");
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const { authTokens } = useContext(AuthContext); 
  

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(date);
  }; 

  // function to get username or first name for user that did the listing
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const data = await getUserData(listing.owner, authTokens);
        setUserDetails(data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [listing.owner]);


  const getDisplayName = () => {
    if (userDetails) {
      return userDetails.firstname || userDetails.email.split('@')[0];
    }
    return "Unknown";
  }; // Can't access user's rating. Need to add field profile picture too.

  // Helper function to display name or email
  const displayName = getDisplayName();

  //get user rating from userDetails or set to 5 if null
  const userRating = userDetails && userDetails.rating ? parseFloat(userDetails.rating).toFixed(1) : '5.0';
  

  // function to reset fields when user navigates out of listing
  useFocusEffect(
    React.useCallback(() => {
      // No operation when the screen comes into focus
      return () => {
        // Reset the message and the view more/less toggle when the screen goes out of focus
        onChangeMesage("Hi! Can I get this plate?");
        setShowFullDescription(false);
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollview}>

        {/*Carousel*/}
        <CarouselComponent images={listing.images}/>

        <View style={styles.card}>
          <CustomText fontType={"title"} style={styles.title}>
            {listing.title}
          </CustomText>

          <CustomText fontType={"subHeader"} style={styles.bestBefore}>
            Best Before: {formatDate(listing.best_before)}
          </CustomText>

          {/*Chat Section*/}
          <ChatComponent 
            navigation={navigation} 
            initialMessage="Hi! Can I get this plate?" 
            listing={listing} 
          />


          {/*Category Section*/}
          <CategoriesComponent categories={listing.categories} />

          {/*Description Section*/}
          <DescriptionComponent
            content={listing.content}
            showFullDescription = {showFullDescription} 
            setShowFullDescription={setShowFullDescription}         
          />


          {/*Giver details Section*/}
          <DetailsComponent
            displayName={displayName}
            rating={userRating} 
            reviews={userDetails && userDetails.received_reviews ? userDetails.received_reviews.length : 0}
            userProfilePicture={userDetails && userDetails.profile_picture ? userDetails.profile_picture : null}
          />
        
          {/* Conditionally display allergens */}
          {listing.allergens && listing.allergens.length > 0 && (
            <>
              <AllergensComponent allergens={listing.allergens}/>
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