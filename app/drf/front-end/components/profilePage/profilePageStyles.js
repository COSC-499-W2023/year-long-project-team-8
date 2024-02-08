import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

// Define color constants
export const colors = {
  lightOrange: '#F8B951',
  mediumOrange: '#FCA63C',
  darkOrange: '#DB6D2A',
  darkGray: '#222222',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  coverImage: {
    width: '100%',
    height: 200, 
  },

  profileInfoContainer: {
    alignItems: 'center',
    marginTop: -52, 
    marginBottom:10,
  },

  settingsButtonContainer: {
    position: 'absolute',
    top: 40,
    right: 15,
    zIndex: 100,
  },

  circleBackground: {
    backgroundColor: 'white', 
    borderRadius: 20, 
    width: 40, 
    height: 40, 
    justifyContent: 'center',
    alignItems: 'center', 
    elevation: 5,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.25, 
    shadowRadius: 3.84, 
  },

  settingsIcon:{
    width:25,
    height:25,
  },

  postCardContainer: {
    width: windowWidth * 0.95, 
    alignSelf: 'center', 
    marginBottom: 10, 
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
    flexDirection: 'column', 
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  
  userInfo: {
    alignItems: 'center', 
  },

  profilePictureContainer:{
    alignContent:"center",
    justifyContent:"center",
    borderRadius: 50,
    borderWidth: 12,  
    borderColor: 'white',  
    
  },

  profileAndRatingContainer: {
    alignItems: 'center', 
    marginBottom: 10, 
  },

  profilePicture: {
    width: 75,
    height: 75,
    borderRadius: 50,
  },

  name: {
    fontSize: 20,
    color: 'black',
    marginTop:5,
  },

  location: {
    fontSize: 15,
    color: "grey",
  },

  reviews: {
    fontSize: 16,
    color:"#9ba5f1",   
  },

  locationContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },

  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  tab: {
    marginHorizontal: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },

  selectedTab: {
    borderBottomColor: '#F8B951', 
    borderBottomWidth: 2
  },

  tabText: {
    fontSize: 16,
  },

  centeredPostsContainer: {
    marginTop:10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  recentPostsText: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
    marginBottom: 20,
    alignSelf:"center"
  },

  rrecentPostsContainer: {
    width: '100%', 
    alignItems: 'center', 
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

  settingsButtonContainer: {
    position: 'absolute',
    top: 13,
    right: 20,
    zIndex: 1,
  },

  settingsButton: {
    height: 26,
    width: 26,
    resizeMode: 'contain',
  },

  noReviewsText:{
    fontSize:18,
    color:"grey",
    textAlign:"center",
    marginTop:10
  },
});

export default styles;
