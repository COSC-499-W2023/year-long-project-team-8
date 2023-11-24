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
  headerImage: {
    height: '30%',
    width: '100%',
  },
  ratingContainer: {
    alignItems: 'center',
  },
  star: {
    fontSize: 24,
    marginTop: -30,
    bottom: 100,
  },
  profileContainer: {
    marginTop: -65,
    alignItems: 'center',
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: 'black',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 15,
  },
  locationContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  locationIcon: {
    width: 20, // Adjust the width and height as needed
    height: 20,
    marginRight: 2,
  },
  location: {
    fontSize: 16,
    color: 'gray',
    marginLeft: 2,
  },
  contactContainer: {
    marginTop: 30,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactIcon: {
    width: 20, // Adjust the width and height as needed
    height: 20,
    marginRight: 5,
  },
  contactText: {
    fontSize: 18,
    marginLeft: 5,
  },
  settingsButton: {
    position: 'absolute',
    top: 20, // Adjust the top value as needed
    right: 20, // Adjust the right value as needed
  },
  settingsIcon: {
    width: 30, // Adjust the width and height as needed
    height: 30,
  },
  centeredPostsContainer: {
    flex: 1,
  },
  postsContainer: {
    flexDirection: 'row',
  },
  postContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    marginHorizontal: 10,
    justifyContent: "flex-end",
  },
  scrollView: {
    flex: 1,
  },
  modalContent: {
    padding: 20,
    backgroundColor: "#f8f9fa",
    justifyContent: "space-around",
    alignItems: "stretch",
    borderRadius: 12,
    borderColor: "rgba(0, 0, 0, 0.05)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textInput: {
    height: 40,
    borderColor: "#ced4da",
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  applyButton: {
    backgroundColor: "#FCBF3D",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 20,
    width: "auto",
  },
  applyButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  closeButton: {
    position: "absolute",
    zIndex: 1000,
    top: 10,
    right: 10,
    backgroundColor: "#dee2e6",
    padding: 8,
    borderRadius: 20,
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
      top: 30,
      fontWeight: 'bold',
  },
  viewAllButton: {
    backgroundColor: colors.mediumOrange,
    borderRadius: 8,
    width: 120,
    padding: 10,
    bottom: 25,
    alignSelf: 'center',
  },
  viewAllButtonText: {
    color: 'white',
    fontSize: 16,
    alignSelf: 'center',
    fontWeight: "bold",
  },
});

export default styles;
