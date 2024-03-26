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
    color: "blue",
    textDecorationLine: "underline",
    marginTop: 5,
  },
  marker: {
    width: 50,
    height: 50,
  },
  customMarker: {
    alignItems: "center",
    justifyContent: "center",
  },
  markerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: "white",
  },
  markerBase: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 20,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "white",
  },
});

export default styles;
