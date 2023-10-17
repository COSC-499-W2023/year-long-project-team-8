import { StyleSheet, Dimensions } from "react-native";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const LoginStyles = StyleSheet.create({
  screen: {
    flex: 1,
    overflow: "hidden",
    paddingBottom: 10,
    position: "relative",
  },
  logoImage: {
    position: "absolute",
    top: screenHeight * 0.1,
    left: (screenWidth - 350) / 2,
    height: 200,
    width: 350,
  },
  fields: {
    width: screenWidth * 0.8,
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 200,
  },
  inputContainer: {
    flexDirection: "column",
  },
  pass: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  forgotText: {
    color: "#5500EB",
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 5,
    alignSelf: "flex-end",
  },
  input: {
    height: 50,
    width: "100%",
    borderColor: "gray",
    borderRadius: 5,
    backgroundColor: "#fff",
    marginBottom: 5,
  },
  button: {
    width: "80%",
    backgroundColor: "#ffa458",
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
    elevation: 5,
    boxShadow: "0px 2px 3.84px rgba(0, 0, 0, 0.25)",
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
  text: {
    marginTop: 10,
    marginBottom: 20,
    textAlign: "center",
    fontSize: 15,
  },
  signupContainer: {
    marginRight: "10%",
    marginTop: 20,
    alignSelf: "flex-end",
    flexDirection: "row",
    width: 150,
    alignItems: "center",
    backgroundColor: "#E8B21A",
    paddingVertical: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: "center",
    elevation: 5,
    boxShadow: "0px 2px 3.84px rgba(0, 0, 0, 0.25)",
  },
  joinUsSection: {
    flex: 0.8,
    paddingVertical: 5,
    paddingHorizontal: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  arrowSection: {
    flex: 0.2,
    paddingVertical: 5,
    paddingHorizontal: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  signUpText: {
    color: "white",
    fontSize: 18,
  },

  backgroundImage: {
    height: screenHeight,
    width: screenWidth,
    justifyContent: "center",
    alignItems: "center",
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    marginTop: 0,
  },
});

export default LoginStyles;
