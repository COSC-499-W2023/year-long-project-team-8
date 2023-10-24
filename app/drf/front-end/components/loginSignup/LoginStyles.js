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
    alignItems: "flex-start",
    marginTop: 10,
    marginLeft: 15,
  },
  forgotPasswordText: {
    color: "#3b3a3a",
    fontWeight: "bold",
    fontSize: 15,
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
});

export default LoginStyles;
