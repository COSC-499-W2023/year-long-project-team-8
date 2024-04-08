import { StyleSheet } from "react-native";

const InputStyles = StyleSheet.create({
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    backgroundColor: "white",
    elevation: 5,
    padding: 15,
    borderRadius: 20,
    shadowColor: "#000", // for iOS
    shadowOffset: { width: 0, height: 2 }, // for iOS
    shadowOpacity: 0.25, // for iOS
    shadowRadius: 3.84, // for iOS
    width: 300,
  },
  input: {
    fontSize: 15,
    flex: 1,
    marginLeft: 10,
  },
  iconForm: {
    marginRight: 10,
  },
  inputWrapperError: {
    borderColor: "red",
  },
  inputError: {
    color: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
    marginLeft: 10,
  },
});

export default InputStyles;
