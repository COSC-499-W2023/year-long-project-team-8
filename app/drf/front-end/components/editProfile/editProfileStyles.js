// editProfileStyles.js
import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const colors = {
  lightOrange: '#F8B951',
  mediumOrange: '#FCA63C',
  darkOrange: '#DB6D2A',
  darkGray: '#222222',
  inputGrey: '#e9e9e9',
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  topBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
    height: 40,
    width: windowWidth,
  },
  backArrow: {
    height: 30,
    width: 30,
    transform: [{ translateY: -15 }],
  },
  saveButton: {
    fontSize: 20,
    fontWeight: '600',
    transform: [{ translateY: -11 }],
  },
  nameTextContainer: {
    marginTop: 10,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  firstName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 3,
    width: '50%',
  },
  lastName: {
    marginLeft: 20,
    fontSize: 18,
    fontWeight: 'bold',
    width: '45%',
  },
  nameInputContainer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  firstNameInput: {
    fontSize: 18,
    fontWeight: '500',
    height: 40,
    width: '50%',
    backgroundColor: '#e9e9e9',
    borderRadius: 5,
    padding: 10,
    marginTop: 3,

  },
  lastNameInput: {
    fontSize: 18,
    fontWeight: '500',
    height: 40,
    width: '45%',
    backgroundColor: colors.inputGrey,
    borderRadius: 5,
    padding: 10,
    marginTop: 3,
  },
  phoneNumberTextContainer: {
    marginTop: 5,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  countryCode: {
    fontSize: 18,
    fontWeight: 'bold',
    width: '25%',
  },
  phoneNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    width: '70%',
  },
  phoneNumberInputContainer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  countryCodeInput: {
    fontSize: 18,
    fontWeight: '500',
    height: 40,
    width: '25%',
    backgroundColor: '#e9e9e9',
    borderRadius: 5,
    padding: 10,
    marginTop: 3,
  },
  phoneNumberInput: {
    fontSize: 18,
    fontWeight: '500',
    height: 40,
    width: '70%',
    backgroundColor: '#e9e9e9',
    borderRadius: 5,
    padding: 10,
    marginTop: 3,
  },
  emailTextContainer: {
    marginTop: 5,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  email: {
    fontSize: 18,
    fontWeight: 'bold',
    width: '25%',
  },
  emailInputContainer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  emailInput: {
    fontSize: 18,
    fontWeight: '500',
    height: 40,
    width: '100%',
    backgroundColor: '#e9e9e9',
    borderRadius: 5,
    padding: 10,
    marginTop: 3,
  },
});

export default styles;

