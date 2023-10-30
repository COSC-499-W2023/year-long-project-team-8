import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  ImageBackground,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as Font from "expo-font";
import { parsePhoneNumberFromString, AsYouType } from "libphonenumber-js";

import InputField from "./InputField";
import ButtonLanding from "./ButtonLanding";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Details = ({ navigation}) => {
  //Setting accessToken and userId parameters passed from SignUp component
  //const accessToken = route.params?.accessToken;
  //const userId = route.params?.userId;
  
  //Frontend logic
  const [fontLoaded, setFontLoaded] = useState(false);

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState(""); // Added last name
  const [phone, setPhone] = useState("");

  const [firstNameError, setFirstNameError] = useState(""); // Changed from nameError to firstNameError
  const [lastNameError, setLastNameError] = useState(""); // Added last name error state
  const [phoneError, setPhoneError] = useState("");

  const backgroundImage = require("../../assets/wave.png");

 

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        titleFont: require("../../assets/fonts/Inter-Bold.ttf"),
        subHeaderFont: require("../../assets/fonts/Inter-Regular.ttf"),
        textFont: require("../../assets/fonts/Inter-Medium.ttf"),
      });
      setFontLoaded(true);
    };
    loadFont();
  }, []);

  const handleHome = () => {
    let valid = true;

    // Validate first name
    if (!firstname.trim()) {
      setFirstNameError("First name is required");
      valid = false;
    } else {
      setFirstNameError("");
    }

    // Validate last name
    if (!lastname.trim()) {
      setLastNameError("Last name is required");
      valid = false;
    } else {
      setLastNameError("");
    }

    // Validate phone number
    if (!isValidPhoneNumber(phone)) {
      setPhoneError("Invalid phone number");
      valid = false;
    } else {
      setPhoneError("");
    }

    if (valid) {
      //Calling backend logic function
      handleUpdate();
    }
  };

  const handleUpdate = async () => {
    const userId = await AsyncStorage.getItem('user_id');
    const accessToken = await AsyncStorage.getItem('access_token');
    //setting userUpdateEndpoint for userId
    const userUpdateEndpoint = `http://localhost:8000/api/users/${userId}/`;
    //PATCH request, passing accessToken to Auth header and content body
    try {
      const response = await fetch(userUpdateEndpoint, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          firstname,
          lastname,
          phone,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('User profile updated:', data);
      navigation.navigate("Tabs");
    } catch (error) {
      console.error('Error updating user profile:', error.message);
    }
  };

  //Frontend validation
  function formatPhoneNumber(text) {
    const phoneNumber = new AsYouType().input(text);
    return phoneNumber;
  }

  function isValidPhoneNumber(text) {
    const phoneNumber = parsePhoneNumberFromString(text);
    return phoneNumber ? phoneNumber.isValid() : false;
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
        }}
        keyboardShouldPersistTaps="handled"
      >
        <ImageBackground
          source={backgroundImage}
          resizeMode="cover"
          style={DetailStyles.screen}
        >
          <View style={DetailStyles.headerContainer}>
            <Text
              style={[
                DetailStyles.headerText,
                fontLoaded ? { fontFamily: "titleFont" } : {},
              ]}
            >
              Welcome!
            </Text>
            <Text
              style={[
                DetailStyles.subHeaderText,
                fontLoaded ? { fontFamily: "subHeaderFont" } : {},
              ]}
            >
              Add your name and phone number to improve your experience.
            </Text>
          </View>

          <View style={DetailStyles.fields}>
            <InputField
              icon="person"
              placeholder="First Name"
              value={firstname}
              onChangeText={(text) => {
                setFirstName(text);
                setFirstNameError("");
              }}
              onFocus={() => {
                setFirstNameError("");
              }}
              errorText={firstNameError}
              autoCapitalize="words"
              autoCorrect={false}
              name="firstname"
            />
            <InputField
              icon="person"
              placeholder="Last Name"
              value={lastname}
              onChangeText={(text) => {
                setLastName(text);
                setLastNameError("");
              }}
              onFocus={() => {
                setLastNameError("");
              }}
              errorText={lastNameError}
              autoCapitalize="words"
              autoCorrect={false}
              name="lastname"
            />
            <InputField
              icon="phone"
              placeholder="+(1) 235 234 8912"
              value={phone}
              onChangeText={(text) => {
                let formattedText = formatPhoneNumber(text);
                setPhone(formattedText);

                if (!isValidPhoneNumber(formattedText)) {
                  setPhoneError("Invalid phone number");
                } else {
                  setPhoneError("");
                }
              }}
              onFocus={() => {
                setPhoneError("");
              }}
              errorText={phoneError}
              keyboardType="numeric"
              autoCorrect={false}
              name="phone"
            />
            <View style={DetailStyles.saveContainer}>
              <ButtonLanding
                title="SAVE"
                onPress={handleHome}
                showIcon={false}
                style={DetailStyles.saveButton}
              />
            </View>
          </View>
          <Pressable
            style={DetailStyles.skipContainer}
            onPress={() => navigation.navigate("Tabs")}
          >
            <Text
              style={[
                DetailStyles.skipText,
                fontLoaded ? { fontFamily: "textFont" } : {},
              ]}
            >
              SKIP
            </Text>
          </Pressable>
        </ImageBackground>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const DetailStyles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 60,
    backgroundColor: "white",
  },
  headerContainer: {
    padding: 25,
    paddingBottom: 30,
    marginBottom: 0,
    alignItems: "center",
  },
  headerText: {
    fontSize: 55,
    fontWeight: "700",
    color: "#FCA63C",
    marginBottom: 20,
  },
  subHeaderText: {
    fontSize: 20,
    color: "grey",
    marginTop: 10,
    textAlign: "center",
  },
  fields: {
    paddingHorizontal: 30,
    marginBottom: 30,
  },
  saveContainer: {
    alignSelf: "center",
  },
  saveButton: {
    paddingLeft: 50,
    paddingRight: 50,
  },
  skipContainer: {
    position: "absolute",
    bottom: 50,
    right: 50,
  },
  skipText: {
    textDecorationLine: "none",
    fontSize: 20,
    color: "#525252",
    opacity: 0.5,
  },
});

export default Details;
