import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import AuthContext from "../../context/AuthContext";
import Toast from "react-native-root-toast";

const HelpSupport = ({ navigation }) => {
  const { logoutUser } = useContext(AuthContext);

  const handleDeleteAccountPress = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: handleDeleteAccount, style: "destructive" },
      ],
      { cancelable: true }
    );
  };

  const handleDeleteAccount = () => {
    logoutUser();
    navigation.navigate("Landing");
    showToastSuccess("Account deleted successfully");
  };

  const showToastSuccess = (message) => {
    Toast.show(message, {
      duration: Toast.durations.SHORT,
      position: Toast.positions.TOP,
      shadow: true,
      animation: true,
      hideOnPress: true,
      backgroundColor: "#D5FDCE",
      textColor: "black",
      opacity: 1,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Help and Support</Text>
      <Text style={styles.text}>
        If you have any questions or need assistance, please feel free to reach
        out to us at <Text style={styles.email}>passtheplate9@gmail.com</Text>.
      </Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDeleteAccountPress}
      >
        <Text style={styles.deleteButtonText}>Delete Your Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
  },
  email: {
    color: "blue",
    textDecorationLine: "underline",
  },
  deleteButton: {
    backgroundColor: "#d9534f",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: "auto",
  },
  deleteButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default HelpSupport;
