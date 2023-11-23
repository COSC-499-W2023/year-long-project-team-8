import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Get the width and height of the window for responsive styling
const windowWidth = Dimensions.get('window').width;

const SettingsPage = () => {
  // Access the navigation object to navigate to other screens
  const navigation = useNavigation();

  // Function to navigate to the Edit Profile page
  const goToEditProfile = () => {
    navigation.navigate("EditProfile");
  };

  return (
    <View style={styles.container}>
      {/* Header Text */}
      <Text style={styles.headerText}>Settings</Text>

      {/* Manage Account Section */}
      <View style={styles.manageAccountContainer}>
        {/* TouchableOpacity for pressing and navigating to Edit Profile */}
        <TouchableOpacity onPress={goToEditProfile}>
          {/* Header for the Manage Account Section */}
          <Text style={styles.manageAccountHeader}> Manage Account </Text>
          {/* Subheader for the Manage Account Section */}
          <Text style={styles.manageAccountSubHeader}> Update information and manage your account</Text>
          {/* Right Arrow Image */}
          <Image source={require("../../assets/right-arrow.png")} style={styles.rightArrow}/>
        </TouchableOpacity>
      </View>
      {/* Line to separate the Manage Account Section from the rest of the page */}
      <View style={styles.lineStyle} />
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  // light grey: #c1c1c1

  container: {
    flex: 1,
  },
  headerText: {
    marginTop: 15,
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
  },
  manageAccountContainer: {
    alignItems: "flex-start",
    marginLeft: 20,
    marginTop: 50,
  },
  manageAccountHeader: {
    fontSize: 18,
    fontWeight: "500",
    color: "#000000",
  },
  manageAccountSubHeader: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "400",
    color: "#000000",
  },
  rightArrow: {
    width: 15,
    height: 15,
    alignSelf: 'flex-end',
    position: 'absolute',
    top: '50%',
    left: windowWidth * 0.85,
    transform: [{ translateY: -7.5 }],
  },
    lineStyle: {
      borderWidth: 0.3,
      borderColor: "#c1c1c1",
      marginLeft: 25,
      marginTop: 10,
    },
});

export default SettingsPage;

