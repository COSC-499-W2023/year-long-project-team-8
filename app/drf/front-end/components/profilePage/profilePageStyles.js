import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


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
  ratingContainer: {
    alignItems: 'center',
    top: 20,
  },
  profileContainer: {
    top: 40,
    alignItems: 'center',
  },
  profilePicture: {
    width: 130,
    height: 130,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: 'black',
  },
  name: {
    fontSize: 24,
    color: 'black',
    fontWeight: '500',
    marginTop: 15,
  },
  locationContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  location: {
    fontSize: 16,
    color: colors.mediumOrange,
    marginLeft: 2,
  },
  settingsButton: {
    position: 'absolute',
  },
  settingsIcon: {
    width: 30,
    height: 30,
  },
  centeredPostsContainer: {
    flex: 1,
    top: 20
  },
  postsContainer: {
    flexDirection: 'row',
  },
  postContainer: {
      bottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  post: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.2,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'black',
    backgroundColor: 'lightgray',
    margin: 6.5,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
    recentPostsText: {
    fontSize: 20,
    textAlign: 'center',
      top: 50,
      fontWeight: 'bold',
  },
  viewAllButton: {
    backgroundColor: colors.mediumOrange,
    borderRadius: 8,
    width: 140,
    height: 50,
    padding: 10,
    bottom: 60,
    alignSelf: 'center',
  },
  viewAllButtonText: {
    color: 'white',
    fontSize: 16,
    alignSelf: 'center',
    fontWeight: "bold",
    top: 5
  },
});

export default styles;
