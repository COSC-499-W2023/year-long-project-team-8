import { StyleSheet, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const colors = {
  lightOrange: '#F8B951',
  mediumOrange: '#FCA63C',
  darkOrange: '#DB6D2A',
  darkGray: '#222222',
};

const loginStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  topHalf: {
    alignItems: 'center',
  },
   usernameText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },




  /*
  circle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    top: -180,
    borderColor: 'white',
    borderWidth: 2,
  },
  profilePicture: {
    width: 146,
    height: 146,
    borderRadius: 73,
  },

  */



  userInformation: {},
  horizontalLine: {
    width: '100%',
    height: 2,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 25,
    color: 'black',
    left: 80,
  },
  button: {
    backgroundColor: colors.lightOrange,
    padding: 10,
    borderRadius: 50,
    width: 250,
    height: 60,
    bottom: 120,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    top: 7,
  },
  icons: {
    width: 40,
    height: 40,
  },
});

export default loginStyles;
