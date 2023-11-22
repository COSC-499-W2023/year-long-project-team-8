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
    top: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postsContainer: {
    flexDirection: 'row',
  },
  recentPostsText: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
    marginBottom: 20,
  },
  postContainer: {
    width: windowWidth * 0.3,
    height: '90%',
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
  viewAllButton: {
    alignItems: 'center',
    backgroundColor: colors.lightOrange,
    borderRadius: 10,
    marginTop: 20,
    height: 40,
    width: 120,
  },
  viewAllButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: 'white',
    marginTop: 10,
  },
});

export default styles;
