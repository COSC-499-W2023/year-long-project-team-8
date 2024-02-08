import { StyleSheet, Dimensions } from 'react-native';

// Get window dimensions for responsive styling
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Define color constants
export const colors = {
  lightOrange: '#F8B951',
  mediumOrange: '#FCA63C',
  darkOrange: '#DB6D2A',
  darkGray: '#222222',
};

const styles = StyleSheet.create({
  // Main container style
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  ratingAndReviewRow: {
    flexDirection: 'row', 
    alignItems: 'center', 
  },

  reviews:{
    fontSize:17,
  },

  reviewPressable: {
    marginLeft: 10, 
  },

  profileContainer: {
    flexDirection: 'row', 
    alignItems: 'flex-start', 
    marginTop: 5,
    paddingLeft: 10,
    marginBottom:10,
  },

  userInfo: {
    marginTop:5,
    justifyContent: 'center', 

  },

  locationAndReviews: {
    // Style to contain location and reviews below the name
  },

  profilePictureContainer:{
    alignContent:"center",
    justifyContent:"center"
  },

  profileAndRatingContainer: {
    alignItems: 'center', 
    paddingLeft: 10,
  },

  profilePicture: {
    width: 55,
    height: 55,
    borderRadius: 50,
  },

  rating: {
    marginTop: 5, 
  },

  reviewPressable: {
  },

  name: {
    fontSize: 17,
    color: 'black',
  },

  // Location and Reviews style
  location: {
    fontSize: 16,
    color: colors.mediumOrange,
  },

  reviews: {
    fontSize: 16,
    color:"#9ba5f1",   
  },

  // Location container style
  locationContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },

  // Centered posts container style
  centeredPostsContainer: {
    marginTop:10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // "Recent Posts" text style
  recentPostsText: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
    marginBottom: 20,
    alignSelf:"center"
  },

  recentPostsContainer: {
    paddingHorizontal: 10,
    marginTop:5,
  },
  postsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  postCardContainer: {
    width: '50%', 
    marginBottom: 10,
  },

  // "View All" button style
  viewAllButton: {
    backgroundColor: '#F8B951', // Assuming post cards have a white background
    borderRadius: 10, // Match the borderRadius of post cards
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    margin: 5,
    width: (windowWidth / 2) - 20, // Assuming post cards take half the width minus some margin
    height: 120, // Assuming a fixed height for post cards
    justifyContent: 'center',
    alignItems: 'center',
  },

  // "View All" button text style
  viewAllButtonText: {
    fontSize: 16,
    color: 'white',
  },

  // Settings button container style
  settingsButtonContainer: {
    position: 'absolute',
    top: 13,
    right: 20,
    zIndex: 1,
  },

  // Settings button style
  settingsButton: {
    height: 26,
    width: 26,
    resizeMode: 'contain',
  },

  seeReviewsButton: {
    marginTop: 10,
    marginBottom:20,
    backgroundColor: '#F8B951', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3, 
    alignSelf: 'center', 
  },
  
  seeReviewsText: {
    color: '#fff', 
    fontSize: 16,
  },
});

export default styles;
