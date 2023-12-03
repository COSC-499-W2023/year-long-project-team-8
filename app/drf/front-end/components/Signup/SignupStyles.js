import { StyleSheet, Dimensions } from "react-native";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const SignupStyles = StyleSheet.create({
  screen: {
    flex: 1,
    overflow: "hidden",
    paddingBottom: 10,
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
    marginBottom: 8,
    marginTop: 180,
  },
  input: {
    height: 50,
    width: "100%",
    borderColor: "gray",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  button: {
    width: "80%",
    alignSelf: "center",
    backgroundColor: "#ffa458",
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 5,
    alignItems: "center",
    elevation: 5,
    boxShadow: "0px 2px 3.84px rgba(0, 0, 0, 0.25)",
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
  loginContainer: {
    marginLeft: "10%",
    marginTop: 20,
    alignSelf: "flex-start",
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
  loginText: {
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

export default SignupStyles;
