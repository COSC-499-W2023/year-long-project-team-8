import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollview: {
    flex: 1,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  image: {
    width: "95%",
    height: 250,
    resizeMode: "cover",
    borderRadius: 15,
  },
  chatCard: {
    marginVertical: 10,
    borderRadius: 15,
    elevation: 3,
    padding: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  chatHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 5,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 5,
    marginBottom: 10,
  },

  bestBeforeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 10,
    marginBottom: 10,
  },

  titleAndTagRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 5,
    marginBottom: 5,
  },

  tagContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 5,
  },

  chatTitle: {
    fontSize: 18,
    color: "#5c5c5c",
  },
  chatIcon: {
    width: 28,
    height: 28,
    marginRight: 5,
  },
  chatButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    marginHorizontal: 10,
    alignContent: "center",
  },
  chatButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    padding: 5,
    marginHorizontal: 5,
  },
  chatButtonIcon: {
    width: 30,
    height: 30,
  },
  chatButtonText: {
    textAlign: "center",
    fontSize: 13,
    marginTop: 2,
  },
  messageBox: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  messageInput: {
    flex: 1,
    backgroundColor: "#fff",
    elevation: 2,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  card: {
    marginHorizontal: 5,
    marginTop: 10,
    padding: 10,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  bestBefore: {
    fontSize: 14,
    marginBottom: 10,
    marginLeft: 10,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 10,
  },
  buttonStyle: {
    width: 150,
  },
  categoryContainer: {
    marginHorizontal: 5,
  },
  categoryItem: {
    alignItems: "center",
    marginRight: 10,
    width: 60,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 13,
    textAlign: "center",
  },
  dividerContainer: {
    marginVertical: 10,
  },
  divider: {
    height: 1,
    backgroundColor: "grey",
  },
  descriptionContainer: {
    marginHorizontal: 5,
  },
  descriptionText: {
    fontSize: 16,
    color: "#333",
    paddingVertical: 10,
  },
  viewMoreText: {
    color: "#9ba5f1",
    fontSize: 16,
    fontWeight: "bold",
  },
  giverDetailsContainer: {
    marginHorizontal: 5,
  },
  giverTitle: {
    fontSize: 19,
    marginTop: 15,
    marginBottom: 10,
  },
  giverContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 10,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 10,
  },
  ratingDisplay: {
    flexDirection: "row",
  },
  rating: {
    marginLeft: 7,
  },
  reviews: {
    marginLeft: 5,
    color: "#9ba5f1",
  },
  allergenText: {
    fontSize: 16,
    color: "#333",
    paddingVertical: 3,
  },
  allergenContainer: {
    marginHorizontal: 5,
  },
  paginationOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 20,
  },
  paginationDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  paginationDotActive: {
    backgroundColor: "orange",
  },
  paginationDotInactive: {
    backgroundColor: "gray",
  },
  expiredTag: {
    backgroundColor: "#FF5733",
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginHorizontal: 5,
  },
  expiredText: {
    color: "white",
    fontSize: 14,
  },
  expiredContainer: {
    flexDirection: "row",
    justifyContent: "flex-star",
  },
  almostExpiredTag: {
    backgroundColor: "orange",
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginHorizontal: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
    alignItems: "center",
  },
  pickedUpTag: {
    backgroundColor: "#3FC080",
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginHorizontal: 5,
  },
});

export default styles;
