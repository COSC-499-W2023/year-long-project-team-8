import React from "react";
import { View, Text, Image, StyleSheet, Button, TouchableOpacity, Dimensions} from "react-native";
import { useNavigation } from "@react-navigation/native";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const SettingsPage = () => {
  const navigation = useNavigation();

  const goToEditProfile = () => {
    // Navigate to the Edit Profile page
    navigation.navigate("EditProfile");
  };

  return (
    <View style={styles.container}>
        <Text style={styles.headerText}>Settings</Text>
      <View style={styles.manageAccountContainer}>
        <TouchableOpacity onPress={goToEditProfile}>
          <Text style={styles.manageAccountHeader}> Manage Account </Text>
          <Text style={styles.manageAccountSubHeader}> Update information and manage your account</Text>
          <Image source={require("../../assets/right-arrow.png")} style={styles.rightArrow}/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    borderColor: 'red',
    borderWidth: 2

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
  position: "absolute",
  alignSelf: "flex-end",
  top: "50%",
  transform: [{ translateY: -7.5 }],
},

});

export default SettingsPage;

