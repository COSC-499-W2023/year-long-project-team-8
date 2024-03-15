import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  chatListItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  chatListImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
    marginRight: 10,
  },
  chatListImage: {
    width: "100%",
    height: "100%",
  },
  chatListPlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#41ade8",
    justifyContent: "center",
    alignItems: "center",
  },
  chatListInitial: {
    color: "white",
    fontSize: 18,
  },
  chatListTextContainer: {
    flex: 1,
  },
  chatListListingTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  chatListName: {
    fontSize: 14,
    color: "#666",
  },
  chatListTimestamp: {
    fontSize: 12,
    color: "#999",
  },
  header: {
    backgroundColor: "#FFA500",
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 16,
    alignItems: "center",
    flexDirection: "row",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
    flex: 1,
  },
  receiverText: {
    fontSize: 16,
    color: "white",
  },
  separator: {
    height: 1,
    backgroundColor: "#c0c0c0",
    width: "90%",
    alignSelf: "center",
    marginVertical: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 5,
  },
  input: {
    flex: 1,
    marginRight: 8,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: "#333333",
    elevation: 2,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sendButton: {
    backgroundColor: "#41ade8",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  sendButtonContainer: {
    borderRadius: 8,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  sendButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  backButton: {
    color: "white",
    padding: 10,
    marginRight: 10,
  },
  backText: {
    color: "white",
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: "white",
  },
});

export default styles;
