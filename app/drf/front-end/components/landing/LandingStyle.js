import { StyleSheet, Dimensions } from "react-native";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const LandingStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff3d7",
    justifyContent: "center",
  },
  backgroundImage: {
    flex: 1,
    height: screenHeight,
    width: screenWidth,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});

export default LandingStyles;
