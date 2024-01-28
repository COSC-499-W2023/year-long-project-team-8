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
          <ChatComponent/>

          {/*Category Section*/}
          <CategoriesComponent categories={listing.categories} />

          {/*Description Section*/}
          <DescriptionComponent
            content={listing.content}
            showFullDescription = {showFullDescription} 
            setShowFullDescription={setShowFullDescription}         
          />

          <DetailsComponent
            displayName={displayName}
            rating={4.5} // Replace with actual rating variable if available
            reviews={8}  // Replace with actual reviews count variable if available
          />
        
          {/* Conditionally display allergens */}
          {listing.allergens && listing.allergens.length > 0 && (
            <>
              <AllergensComponent allergens={listing.allergens}/>
            </>
          )}

          <View style={styles.allergenContainer}>
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