import { StyleSheet } from "react-native";

const LoginStyles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  headerContainer: {
    padding: 30,
  },
  headerText: {
    fontSize: 40,
    fontWeight: "700",
    color: "black",
  },
  subHeaderText: {
    fontSize: 20,
    color: "grey",
    marginTop: 10,
  },
  fields: {
    flex: 1,
    paddingHorizontal: 30,
    marginTop: 50,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "white",
    elevation: 5,
    padding: 15,
    borderRadius: 20,
    shadowColor: "#000", // for iOS
    shadowOffset: { width: 0, height: 2 }, // for iOS
    shadowOpacity: 0.25, // for iOS
    shadowRadius: 3.84, // for iOS
  },
  input: {
    fontSize: 12,
  },
  iconForm: {
    marginRight: 10,
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginTop: 5,
    fontSize: 12,
  },
  forgotPasswordContainer: {
    position: "absolute",
    right: 15,
  },
  forgotPasswordText: {
    color: "orange",
    fontWeight: "bold",
    fontSize: 15,
  },
  button: {
    marginTop: 30,
    alignSelf: "flex-end",
    textAlign: "center",
    width: "50%",
    padding: 20,
    borderRadius: 50,
    elevation: 5, // for Android
    shadowColor: "#000", // for iOS
    shadowOffset: { width: 0, height: 2 }, // for iOS
    shadowOpacity: 0.25, // for iOS
    shadowRadius: 3.84, // for iOS
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
    fontSize: 20,
  },
  arrow: {
    marginLeft: 10,
  },
  signupContainer: {
    alignSelf: "center",
    marginTop: 100,
  },
  signupText: {
    color: "#3F525C",
    fontWeight: "bold",
  },
  signup: {
    color: "#DB6D2A",
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default LoginStyles;
