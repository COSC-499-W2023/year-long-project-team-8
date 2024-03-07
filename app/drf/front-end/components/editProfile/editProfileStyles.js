import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "white",
  },
  coverImage: {
    width: "100%",
    height: 200,
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
    borderWidth: 12,
    marginTop: -52,
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
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  scrollView: {
    backgroundColor: "white",
  },
  saveButtonContainer: {
    padding: 20,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
