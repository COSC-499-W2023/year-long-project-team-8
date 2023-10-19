import { StyleSheet } from "react-native";

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
    paddingHorizontal: 30,
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
    fontSize: 15,
    flex: 1,
  },
  iconForm: {
    marginRight: 10,
  },

  errorText: {
    color: "red",
    marginTop: 5,
    fontSize: 15,
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
  arrow: {
    marginLeft: 10,
  },
  signupContainer: {
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 10,
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
