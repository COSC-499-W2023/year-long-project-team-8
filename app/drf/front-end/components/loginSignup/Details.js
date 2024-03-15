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
import InputField from "./InputField";
import ButtonLanding from "./ButtonLanding";
import AsyncStorage from "@react-native-async-storage/async-storage";

//const Details = ({ navigation, route }) => {
const Details = ({ navigation }) => {
  //Setting accessToken and userId parameters passed from SignUp component
  //const accessToken = route.params?.accessToken;
  //const userId = route.params?.userId;

  //Frontend logic
  const [fontLoaded, setFontLoaded] = useState(false);
  const baseEndpoint = "https://passtheplate.pythonanywhere.com/api";

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState(""); // Added last name
  const [phone, setPhone] = useState("");

  const [firstNameError, setFirstNameError] = useState(""); // Changed from nameError to firstNameError
  const [lastNameError, setLastNameError] = useState(""); // Added last name error state
  const [phoneError, setPhoneError] = useState("");

  const backgroundImage = require("../../assets/wave.png");

  // Format phone number to remove non-numeric characters and limit to 11 characters
  // Format phone number to remove non-numeric characters and limit to 10 characters
  const formatPhoneNumber = (text) => {
    const cleaned = text.replace(/\D/g, "");
    return cleaned.slice(0, 10);
  };

  // Format phone number for display with (XXX) XXX-XXXX pattern
  const phoneFormatted = (phone) => {
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
  };

  const isPhoneValid = (cleanedPhone) => {
    return cleanedPhone.length === 10;
  };

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

    // Validate first name if it's not empty
    if (firstname.trim() && !firstname.match(/^[a-zA-Z]+$/)) {
      setFirstNameError("Invalid first name");
      valid = false;
    } else {
      setFirstNameError("");
    }

    // Validate last name if it's not empty
    if (lastname.trim() && !lastname.match(/^[a-zA-Z]+$/)) {
      setLastNameError("Invalid last name");
      valid = false;
    } else {
      setLastNameError("");
    }

    // Validate phone number if it's not empty
    if (phone.trim() && !isPhoneValid(formatPhoneNumber(phone))) {
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

  //setting userUpdateEndpoint for userId
  const handleUpdate = async () => {
    const userId = await AsyncStorage.getItem("user_id");
    const accessToken = await AsyncStorage.getItem("access_token");
    //setting userUpdateEndpoint for userId
    const userUpdateEndpoint = `${baseEndpoint}/users/${userId}/`;
    //PATCH request, passing accessToken to Auth header and content body
    try {
      const response = await fetch(userUpdateEndpoint, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
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

      console.log("User profile updated:", data);
      navigation.navigate("MainApp");
      // navigation.navigate("Tabs", { userId, accessToken: accessToken });
    } catch (error) {
      console.error("Error updating user profile:", error.message);
    }
  };

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
              maxLength={50}
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
              maxLength={50}
            />
            <InputField
              icon="phone"
              placeholder="PHONE NUMBER"
              value={phoneFormatted(phone)}
              onChangeText={(text) => {
                const formattedText = formatPhoneNumber(text);
                setPhone(formattedText);
                if (!isPhoneValid(formattedText)) {
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
            onPress={() => navigation.navigate("MainApp")}
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
