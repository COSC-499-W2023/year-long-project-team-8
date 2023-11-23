import React from "react";
import {View, Text, SafeAreaView, TouchableOpacity, Image, TextInput,} from "react-native";
//import DropDownPicker from "react-native-dropdown-picker";
// import {HeaderBackButton} from "@react-navigation/stack";
import styles from "./editProfileStyles";
import { useNavigation } from "@react-navigation/native";


const EditProfilePage = () => {

      const navigation = useNavigation();

      const goToSettings = () => {
          navigation.navigate("Settings");
      };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.topBarContainer}>
        <TouchableOpacity onPress={goToSettings}>
          <Image source={require("../../assets/back_arrow.png")} style={styles.backArrow} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.saveButton}>Save</Text>
        </TouchableOpacity>
      </View>
        <View style={styles.nameTextContainer}>
            <Text style={styles.firstName}> First Name </Text>
            <Text style={styles.lastName}> Last Name</Text>
        </View>
        <View style={styles.nameInputContainer}>
            <TextInput style={styles.firstNameInput}> </TextInput>
            <TextInput style={styles.lastNameInput}> </TextInput>
        </View>
        <View style={styles.phoneNumberTextContainer}>
            {/* drop down to go here */}
            <TextInput style={styles.phoneNumberInput}> </TextInput>
        </View>
    </SafeAreaView>
  );
};

export default EditProfilePage;
