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

  // Rating container style
  ratingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    top: 30,
  },
  ratingTextContainer: {
    flexDirection: 'row',
    margin: 5,
  },

  // Profile container style
  profileContainer: {
    top: 40,
    alignItems: 'center',
  },

  // Profile picture style
  profilePicture: {
    width: 130,
    height: 130,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: 'black',
  },

  // User's name style
  name: {
    fontSize: 24,
    color: 'black',
    fontWeight: '500',
    marginTop: 15,
  },

  // Location container style
  locationContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },

  // Location text style
  location: {
    fontSize: 16,
    color: colors.mediumOrange,
    marginLeft: 2,
  },

  // Centered posts container style
  centeredPostsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top: 20,
  },

  // Container for multiple posts style
  postsContainer: {
    flexDirection: 'row',
  },

  // "Recent Posts" text style
  recentPostsText: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
    marginBottom: 20,
  },

  // Individual post container style
  postContainer: {
    width: windowWidth * 0.3,
    height: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8e8e8',
    borderWidth: 2,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 10,
    shadowOpacity: 0.5,
    shadowColor: 'black',
    shadowRadius: 3,
    shadowOffset: { width: 2, height: 2 },
  },

  // "View All" button style
  viewAllButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightOrange,
    borderRadius: 10,
    marginTop: 25,
    height: 45,
    width: 140,
  },

  // "View All" button text style
  viewAllButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: 'white',
  },

  // Settings button container style
  settingsButtonContainer: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 1,
  },

  // Settings button style
  settingsButton: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
});

export default styles;
