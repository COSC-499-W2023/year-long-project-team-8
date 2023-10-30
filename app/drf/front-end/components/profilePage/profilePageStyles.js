import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const colors = {
  lightOrange: '#F8B951',
  mediumOrange: '#FCA63C',
  darkOrange: '#DB6D2A',
  darkGray: '#222222',
};

const loginStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    height: windowHeight,
  },
  background: {
    flex: 1,
    flexDirection: 'column',
  },
  topHalf: {
    flex: 2.5,
    backgroundColor: colors.darkGray,
  },
  bottomHalf: {
    flex: 7,
    backgroundColor: colors.lightOrange,
  },
  profilePictureContainer: {
    position: 'absolute',
    width: windowWidth,
    alignItems: 'center',
  },
  profileTag: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.lightOrange,
    top: -5,
  },
  profilePicture: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderColor: 'white',
    borderWidth: 3,
    top: 85,
  },
  profileIconContainer: {
    position: 'absolute',
  },
  profileIcons: {
    width: 40,
    height: 40,
    opacity: 0.25,
  },
  mainContainer: {
    position: 'absolute',
    top: '40%',
    width: windowWidth,
    alignItems: 'center',
  },
  userText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    bottom: '6%',
  },
  locContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    bottom: 10,
  },
  userLocation: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
  },
  locPng: {
    height: 15,
    width: 15,
  },
  contactInfoContainer: {
    alignItems: 'center',
    flexDirection: 'row',

  },
  contactPngContainer: {
    top: 24,
    right: '5%'
  },
  emailPng: {

  },
  phonePng: {
    top: 18,
  },
  contactTextContainer: {
    top: 20,
    left: '15%'
  },
  email: {
    fontSize: 20,
    color: 'black',
  },
  phone: {
    fontSize: 20,
    color: 'black',
    top: 25,
  },
  postContainer: {
    height: 120,
    width: windowWidth + 5,
    top: 75,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: 'black',
    borderWidth: 1,

  },
  post: {
    height: 90,
    width: 90,
    borderRadius: 100,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    top: 104,
    height: 55,
    width: 250,
    borderRadius: 50,
    backgroundColor: '#404040'
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },

});

export default loginStyles;
