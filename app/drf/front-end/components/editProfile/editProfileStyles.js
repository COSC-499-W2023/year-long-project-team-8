import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffbf0",
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  headerContainer: {
    padding: 30,
  },
  headerText: {
    fontSize: 45,
    fontWeight: "700",
    color: "#1f1f1f",
  },
  formContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  names: {
    flexDirection: "row",
  },
  editIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    borderRadius: 15,
    padding: 2,
  },
  editIcon: {
    width: 20,
    height: 20,
  },
  // Styling for the save button text
  saveButton: {
    fontSize: 20,
    fontWeight: "600",
  },
  profilePictureContainer: {
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 75,
    borderWidth: 6,
    borderColor: "white",
    position: "relative",
  },
  coverImage: {
    width: "100%",
    height: 200,
  },
  profileImage: {
    height: 70,
    width: 70,
    borderRadius: 50,
  },
  profileImageContainer: {
    borderRadius: 50,
    borderWidth: 1,
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContentContainer: {
    padding: 20,
    borderRadius: 10,
  },
  saveButtonContainer: {
    padding: 20,
    marginTop: 10,
    alignItems: "flex-end",
    justifyContent: "center",
  },
});

export default styles;
