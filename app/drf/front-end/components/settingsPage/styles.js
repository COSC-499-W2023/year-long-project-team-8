import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffbf0",
  },
  imageBg: {
    flex: 1,
  },
  header: {
    padding: 30,
  },
  headerText: {
    fontSize: 48,
    fontWeight: "700",
    color: "#1f1f1f",
  },
  subHeaderText: {
    fontSize: 20,
    color: "grey",
    marginTop: 10,
  },
  containerItems: {
    flex: 1,
  },
  itemContainer: {
    alignItems: "center",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 10,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#000000",
  },
  itemDescription: {
    fontSize: 13,
    marginTop: 5,
    fontWeight: "400",
    color: "#000000",
  },
  iconContainer: {
    alignSelf: "center",
  },
  itemPressed: {
    transform: [{ scale: 0.95 }], // Scale down a bit when pressed
  },
});

export default styles;
