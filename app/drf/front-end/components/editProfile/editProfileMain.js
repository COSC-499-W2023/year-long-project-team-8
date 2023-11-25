import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  BackHandler,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./editProfileStyles";
import { getUserData, updateUserData } from "../helperFunctions/apiHelpers";
import AuthContext from "../../context/AuthContext";

const EditProfilePage = () => {
  const { authTokens, userId } = useContext(AuthContext);

  const [userData, setUserData] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    getUserData(userId, authTokens)
      .then((data) => {
        setUserData(data);
        console.log("User Data:", data);
      })
      .catch((error) => {
        console.log("Error fetching user data: ", error);
      });
  }, [userId, authTokens]);

  const handleSaveDetails = () => {
    const updatedData = {};

    if (firstName !== "") {
      updatedData.first_name = firstName;
    }
    if (lastName !== "") {
      updatedData.last_name = lastName;
    }
    if (countryCode !== "") {
      updatedData.country_code = countryCode;
    }
    if (phoneNumber !== "") {
      updatedData.phone_number = phoneNumber;
    }
    if (email !== "") {
      updatedData.email = email;
    }

    updateUserData(userId, authTokens, updatedData)
      .then(() => {
        getUserData(userId, authTokens)
          .then((data) => {
            setUserData(data);
            console.log("User Data Updated: ", data);
          })
          .catch((error) => {
            console.log("Error fetching updated user data: ", error);
          });
      })
      .catch((error) => {
        console.log("Error updating user data: ", error);
      });
  };

  const navigation = useNavigation();

  useEffect(() => {
    const handleBackPress = () => {
      goBack();
      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.topBarContainer}>
        <TouchableOpacity onPress={goBack}>
          <Image
            source={require("../../assets/back_arrow.png")}
            style={styles.backArrow}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSaveDetails}>
          <Text style={styles.saveButton}>Save</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.nameTextContainer}>
        <Text style={styles.firstName}>First Name</Text>
        <Text style={styles.lastName}>Last Name</Text>
      </View>

      <View style={styles.nameInputContainer}>
        <TextInput
            style={styles.firstNameInput}
            autoCapitalize="words"
            onChangeText={(text) => setFirstName(text)}
        >{userData?.firstName}</TextInput>
        <TextInput
            style={styles.lastNameInput}
            autoCapitalize="words"
            onChangeText={(text) => setLastName(text)}
            value={lastName}
        />
      </View>

      <View style={styles.phoneNumberTextContainer}>
        <Text style={styles.countryCode}>Country</Text>
        <Text style={styles.phoneNumber}>Phone Number</Text>
      </View>

      <View style={styles.phoneNumberInputContainer}>
        {/* Will be changing this to a dropdown menu */}
        <TextInput
          style={styles.countryCodeInput}
          onChangeText={(text) => setCountryCode(text)}
          value={countryCode}
        />
        <TextInput
          style={styles.phoneNumberInput}
          onChangeText={(text) => setPhoneNumber(text)}
          value={phoneNumber}
        />
      </View>

      <View style={styles.emailTextContainer}>
        <Text style={styles.email}>Email</Text>
      </View>

      <View style={styles.emailInputContainer}>
        <TextInput
          style={styles.emailInput}
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
      </View>
    </SafeAreaView>
  );
};

export default EditProfilePage;
