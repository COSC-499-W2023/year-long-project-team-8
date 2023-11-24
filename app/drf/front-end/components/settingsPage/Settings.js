import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Get the width of the window for responsive styling
const windowWidth = Dimensions.get('window').width;

const SettingsPage = () => {
  // Access the navigation object to navigate to other screens
  const navigation = useNavigation();

  // Function to navigate to the Edit Profile page
  const goToEditProfile = () => {
    navigation.navigate("EditProfile");
  };

  return (
    // Wrap the entire component with SafeAreaView for handling safe areas
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header Text */}
        <Text style={styles.headerText}>Settings</Text>

        {/* TouchableOpacity for pressing and navigating to Edit Profile */}
        <TouchableOpacity onPress={goToEditProfile}>
          {/* Manage Account Section */}
          <View style={styles.manageAccountContainer}>
            {/* Header for the Manage Account Section */}
            <Text style={styles.manageAccountHeader}> Manage Account </Text>
            {/* Subheader for the Manage Account Section */}
            <Text style={styles.manageAccountSubHeader}> Update information and manage your account</Text>
            {/* Right Arrow Image */}
            <Image source={require("../../assets/right-arrow.png")} style={styles.rightArrow}/>
          </View>
        </TouchableOpacity>

        {/* Line to separate the Manage Account Section from the rest of the page */}
        <View style={styles.lineStyle} />
      </View>
    </SafeAreaView>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  // Flex 1 for SafeAreaView to take up the entire screen
  safeArea: {
    flex: 1,
  },
  // Flex 1 for the main container to take up the entire screen
  container: {
    flex: 1,
  },
  // Styles for the header text
  headerText: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
  },
  // Styles for the Manage Account section container
  manageAccountContainer: {
    alignItems: "flex-start",
    marginLeft: 20,
    marginTop: 50,
  },
  // Styles for the header in the Manage Account section
  manageAccountHeader: {
    fontSize: 18,
    fontWeight: "500",
    color: "#000000",
  },
  // Styles for the subheader in the Manage Account section
  manageAccountSubHeader: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "400",
    color: "#000000",
  },
  // Styles for the right arrow image in the Manage Account section
  rightArrow: {
    width: 15,
    height: 15,
    alignSelf: 'flex-end',
    position: 'absolute',
    top: '50%',
    left: windowWidth * 0.85,
    transform: [{ translateY: -7.5 }],
  },
  // Styles for the line separating sections
  lineStyle: {
    borderWidth: 0.3,
    borderColor: "#c1c1c1",
    marginLeft: 25,
    marginTop: 10,
  },
});

// Export the component as the default export
export default SettingsPage;
