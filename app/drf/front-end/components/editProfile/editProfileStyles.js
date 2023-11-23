// editProfileStyles.js
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
  safeAreaView: {
    flex: 1,
  },
  topBarContainer: {
    width: windowWidth,
    height: 40,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',

      borderColor: 'red',
      borderWidth: 2,
  },
  backArrow: {
    height: 30,
    width: 30,
    alignSelf: 'flex-start',
    marginLeft: 30,
      top: '50%',
      transform: [{ translateY: -15 }],
  },
  saveButton: {
    fontSize: 20,
      fontWeight: '600',
    alignSelf: 'flex-end',
    marginRight: 30,
      top: '50%',
      transform: [{ translateY: -11 }],
  },
    nameTextContainer: {
        height: 50,
        borderColor: 'blue',
        borderWidth: 2,
    },
    firstName: {

    },
    lastName: {

    },
    nameInputContainer: {
      height: 50,
        borderColor: 'green',
        borderWidth: 2,

    },
    firstNameInput: {

    },
    lastNameInput: {

    },
    phoneNumberTextContainer: {
      height: 50,
        borderColor: 'purple',
        borderWidth: 2,
    },
    countryCode: {

    },
    phoneNumberInput: {

    },

});

export default styles;
