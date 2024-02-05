import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    zIndex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  searchRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  mapIconContainer: {
    marginLeft: 10,
  },
  mapIconImage: {
    width: 47,
    height: 47,
  },
  categoryScroll: {
    flexDirection: "row",
    marginVertical: 5,
  },
  categoryContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  categoryButton: {
    backgroundColor: "transparent",
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  categorySelected: {
    backgroundColor: "rgba(252,166,60,0.2) ",
  },
  iconImage: {
    width: 40,
    height: 40,
  },
  categoryText: {
    fontWeight: "600",
    color: "black",
    fontSize: 12,
  },
  categoryTextSelected: {
    fontWeight: "600",
    color: "rgba(252,166,60,0.8)",
    fontSize: 12,
  },
  filterAllContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  filterContainer: {
    flexDirection: "row",
    padding: 10,
  },
  mainFilter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    height: 45,
    width: 110,
    marginLeft: 8,
    backgroundColor: "#FCBF3D",
    borderRadius: 10,
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 2 }, // X, Y offset of the shadow
    shadowOpacity: 0.25, // Opacity of the shadow
    shadowRadius: 3.84, // Blur radius of the shadow
    elevation: 5, // Elevation for Android
  },
  filter: {
    alignItems: "center",
    justifyContent: "center",
    width: 90,
    height: 31,
    marginLeft: 8,
    marginBottom: 10,
    backgroundColor: "#FCBF3D",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25, // Opacity of the shadow
    shadowRadius: 3.84, // Blur radius of the shadow
    elevation: 5, // Elevation for Android
  },
  filterIcon: {
    marginRight: 8,
    width: 30,
    height: 30,
  },
  filterText: {
    fontWeight: "600",
    color: "white",
  },
  sortDropdownContainer: {
    flex: 1,
  },
  listingsContainer: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  noMatchesText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 20,
    color: "grey",
  },
  loader:{
    marginTop: 20,
  }
});

export default styles;
