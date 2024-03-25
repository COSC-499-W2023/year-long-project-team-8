import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  backArrow: {
    position: "absolute",
    height: 40,
    width: 40,
    left: 15,
    top: 15,
  },
  sliderContainer: {
    position: "absolute",
    alignSelf: "center",
    width: "80%",
    bottom: 35,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  slider: {
    width: "100%",
  },
  sliderText: {
    textAlign: "center",
    marginTop: 10,
    fontWeight: "bold",
    color: "black",
  },
  directionsLink: {
    color: "blue", // Change color as desired
    textDecorationLine: "underline", // Add underline to simulate link
    marginTop: 5, // Adjust spacing if needed
  },
});

export default styles;
