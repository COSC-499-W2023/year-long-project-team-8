import { StyleSheet, Platform } from "react-native";

const LoginStyles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
  },
  allContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  headerContainer: {
    padding: 30,
  },
  headerText: {
    fontSize: 50,
    fontWeight: "700",
    color: "#1f1f1f",
  },
  subHeaderText: {
    fontSize: 20,
    color: "grey",
    marginTop: 10,
  },
  fields: {
    paddingHorizontal: 30,
  },
  forgotPasswordContainer: {
    alignItems: "flex-start",
    marginTop: 10,
    marginLeft: 15,
  },
  forgotPasswordText: {
    color: "#3b3a3a",
    fontWeight: "bold",
    fontSize: 15,
    opacity: 0.7,
  },
  arrow: {
    marginLeft: 10,
  },
  signupContainer: {
    alignSelf: "center",
    marginTop: 60,
  },
  signupText: {
    color: "#3F525C",
    fontWeight: "bold",
    fontSize: 16,
  },
  signup: {
    color: "#DB6D2A",
    fontSize: 17,
    fontWeight: "bold",
  },
  floatingBubble: {
    backgroundColor: 'lightgrey',
    padding: 40,
    borderRadius: 10,
    elevation: 5, // Android-only shadow effect
    marginTop: 150,
    alignSelf: 'center',
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  forgotPasswordModalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: "#1f1f1f",
  },
  forgotPasswordModalInput: {
    marginBottom: 10,
    paddingVertical: 18,
    paddingHorizontal: 36,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    color: "#1f1f1f",
  },
  forgotPasswordModalButton: {
    backgroundColor: '#DB6D2A',
    padding: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  forgotPasswordModalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPasswordModalCloseButton: {
    backgroundColor: 'orange',
    padding: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  forgotPasswordModalCloseButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginStyles;
