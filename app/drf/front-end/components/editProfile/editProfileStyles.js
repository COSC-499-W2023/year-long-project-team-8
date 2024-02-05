// editProfileStyles.js

// Importing necessary modules from react-native
import { StyleSheet, Dimensions } from 'react-native';

// Dimensions of the window
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Color palette used in the styles
export const colors = {
  lightOrange: '#F8B951',
  mediumOrange: '#FCA63C',
  darkOrange: '#DB6D2A',
  darkGray: '#222222',
  inputGrey: '#e9e9e9',
};

// StyleSheet for the EditProfilePage component styles
const styles = StyleSheet.create({
  // Styling for the SafeAreaView component
  safeAreaView: {
    flex: 1,
  },
  // Styling for the top navigation bar
  topBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
    height: 40,
    width: windowWidth,
  },
  // Styling for the back arrow image
  backArrow: {
    height: 40,
    width: 40,
    transform: [{ translateY: -15 }],
    top: 5,
  },
  // Styling for the save button text
  saveButton: {
    fontSize: 20,
    fontWeight: '600',
    transform: [{ translateY: -11 }],
  },
  // Styling for the container of first name and last name texts
  nameTextContainer: {
    marginTop: 80,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  // Styling for the first name text
  firstName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 3,
    width: '47%',
  },
  // Styling for the last name text
  lastName: {
    marginLeft: 20,
    fontSize: 18,
    fontWeight: 'bold',
    width: '47%',
  },
  // Styling for the container of first name and last name input fields
  nameInputContainer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  // Styling for the first name input field
  firstNameInput: {
    fontSize: 18,
    fontWeight: '500',
    height: 45,
    width: '47%',
    backgroundColor: '#e9e9e9',
    borderRadius: 5,
    padding: 10,
    marginTop: 3,
  },
  // Styling for the last name input field
  lastNameInput: {
    fontSize: 18,
    fontWeight: '500',
    height: 45,
    width: '47%',
    backgroundColor: colors.inputGrey,
    borderRadius: 5,
    padding: 10,
    marginTop: 3,
  },
  // Styling for the container of phone number text
  phoneNumberTextContainer: {
    marginTop: 10,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  // Styling for the phone number text
  phoneNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    width: '70%',
  },
  // Styling for the container of the phone number input field
  phoneNumberInputContainer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  // Styling for the phone number input field
  phoneNumberInput: {
    fontSize: 18,
    fontWeight: '500',
    height: 45,
    width: '100%',
    backgroundColor: '#e9e9e9',
    borderRadius: 5,
    padding: 10,
    marginTop: 3,
  },
  // Styling for the container of email text
  emailTextContainer: {
    marginTop: 10,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  // Styling for the email text
  email: {
    fontSize: 18,
    fontWeight: 'bold',
    width: '25%',
  },
  // Styling for the container of the email input field
  emailInputContainer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  // Styling for the email input field
  emailInput: {
    fontSize: 18,
    fontWeight: '500',
    height: 45,
    width: '100%',
    backgroundColor: '#e9e9e9',
    borderRadius: 5,
    padding: 10,
    marginTop: 3,
  },
  buttonFieldContainer: {
    marginTop: 55,
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  changePasswordButton: {
    height: 50,
    width: '100%',
    marginBottom: 20,
    backgroundColor: colors.mediumOrange,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  changePasswordText: {
    color: "white",
    fontWeight: 'bold',
  },
  deleteAccountButton: {
    height: 45,
    width: '100%',
    marginTop: 20,
    backgroundColor: colors.darkOrange,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteAccountText: {
    color: "white",
    fontWeight: 'bold',
  },
  profilePictureContainer: {
    marginTop: 50,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    height: 150,
    width: 150,
    borderRadius: 75,
    borderColor: "black",
    borderWidth: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContentContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  scrollView: {
    paddingTop: 10,
  }

});

// Exporting the styles as the default export
export default styles;
