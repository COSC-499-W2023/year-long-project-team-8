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
  forgotPasswordContainer: {
    marginTop: 20,
    marginLeft: 15,
  },
  forgotPasswordText: {
    color: "#DB6D2A",
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
