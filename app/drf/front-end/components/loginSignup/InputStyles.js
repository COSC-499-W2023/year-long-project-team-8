import { StyleSheet } from "react-native";

const InputStyles = StyleSheet.create({
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "white",
    elevation: 5,
    padding: 15,
    borderRadius: 20,
    shadowColor: "#000", // for iOS
    shadowOffset: { width: 0, height: 2 }, // for iOS
    shadowOpacity: 0.25, // for iOS
    shadowRadius: 3.84, // for iOS
  },
  input: {
    fontSize: 15,
    flex: 1,
  },
  inputWrappererror: {
    backgroundColor: "#ffd6d4",
  },

  iconForm: {
    marginRight: 10,
  },

  errorText: {
    color: "#ff7770",
    marginTop: 10,
    fontSize: 15,
    marginLeft: 15,
  },
  forgotPasswordContainer: {
    position: "absolute",
    right: 15,
  },
  forgotPasswordText: {
    color: "orange",
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default InputStyles;
