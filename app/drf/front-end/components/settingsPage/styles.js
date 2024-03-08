import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  imageBg: {
    flex: 1,
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
});

export default styles;
