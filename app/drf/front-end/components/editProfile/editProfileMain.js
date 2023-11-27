// Importing necessary components and functions from React, React Native, and custom modules
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
import styles from "./editProfileStyles"; // Importing styles for the component
import { getUserData, updateUserData } from "../helperFunctions/apiHelpers"; // Importing functions for fetching and updating user data
import AuthContext from "../../context/AuthContext"; // Importing authentication context

// Functional component definition for the EditProfilePage
const EditProfilePage = () => {
  // Destructuring values from the authentication context
  const { authTokens, userId } = useContext(AuthContext);

  // State variables to hold user data and form input values
  const [userData, setUserData] = useState(null);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // State variables to store previous values for email and phone
  const [prevEmail, setPrevEmail] = useState("");
  const [prevPhone, setPrevPhone] = useState("");
  const [prevFirstName, setPrevFirstName] = useState("");
  const [prevLastName, setPrevLastName] = useState("");

  // Effect hook to fetch user data when component mounts or dependencies change
  useEffect(() => {
    getUserData(userId, authTokens)
      .then((data) => {
        setUserData(data);
        setFirstName(data?.firstname || "");
        setLastName(data?.lastname || "");
        setPhone(data?.phone || "");
        setEmail(data?.email || "");
        console.log("User Data:", data);
      })
      .catch((error) => {
        console.log("Error fetching user data: ", error);
      });
  }, [userId, authTokens]);

  // Function to handle saving edited user details
  const handleSaveDetails = () => {
    const updatedData = {};

    // Checking for changes in form inputs and updating the corresponding fields
    if (firstname !== "") {
      updatedData.firstname = firstname;
    }
    if (lastname !== "") {
      updatedData.lastname = lastname;
    }
    if (phone !== "") {
      updatedData.phone = phone;
    }
    if (email !== "") {
      updatedData.email = email;
    }

    // Updating user data via API call
    updateUserData(userId, authTokens, updatedData)
      .then(() => {
        // Fetching updated user data after successful update
        getUserData(userId, authTokens)
          .then((data) => {
            setUserData(data);
            console.log("User Data updated:", data);
          })
          .catch((error) => {
            console.error("Error fetching updated user data:", error);
          });
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
      });
  };

  // Accessing navigation object for navigating between screens
  const navigation = useNavigation();

  // Effect hook to handle the hardware back button press
  useEffect(() => {
    const handleBackPress = () => {
      goBack();
      return true;
    };

    BackHandler.addEventListener("hardwareBackPress", handleBackPress);

    // Cleanup function to remove the event listener when the component is unmounted
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, []);

  // Function to navigate back to the previous screen
  const goBack = () => {
    navigation.goBack();
  };

  // Function to format phone number input as the user types
  const formatPhoneNumber = (text) => {
    const cleaned = text.replace(/\D/g, "");
    setPhone(cleaned);
  };

  // Function to validate and update email input
  const validEmail = (text) => {
    if (text.includes('@')) {
      setEmail(text);
    } else {
        setEmail(prevEmail);
        console.log("missing @ symbol");
    }
  };

  // Rendered JSX structure for the EditProfilePage
  return (
    <SafeAreaView style={styles.safeAreaView}>
      {/* Top navigation bar with back button and save button */}
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

      {/* Container for displaying and editing first name and last name */}
      <View style={styles.nameTextContainer}>
        <Text style={styles.firstName}>First Name</Text>
        <Text style={styles.lastName}>Last Name</Text>
      </View>

      {/* Input fields for first name and last name */}
      <View style={styles.nameInputContainer}>
        <TextInput
          style={styles.firstNameInput}
          value={firstname ? firstname.charAt(0).toUpperCase() + firstname.slice(1) : ""}
          onChangeText={(text) => setFirstName(text)}
        />
        <TextInput
          style={styles.lastNameInput}
          value={lastname ? lastname.charAt(0).toUpperCase() + lastname.slice(1) : ""}
          onChangeText={(text) => setLastName(text)}
        />
      </View>

      {/* Container for displaying and editing phone number */}
      <View style={styles.phoneNumberTextContainer}>
        <Text style={styles.phoneNumber}>Phone Number</Text>
      </View>

      {/* Input field for phone number with formatting and validation */}
      <View style={styles.phoneNumberInputContainer}>
        <TextInput
          style={styles.phoneNumberInput}
          value={phone.replace(/(\d)(\d{3})(\d{3})(\d{4})/, '+$1 ($2) $3 - $4')}
          onChangeText={(text) => formatPhoneNumber(text)}
          maxLength={14}
          keyboardType={'phone-pad'}
        />
      </View>

      {/* Container for displaying and editing email */}
      <View style={styles.emailTextContainer}>
        <Text style={styles.email}>Email</Text>
      </View>

      {/* Input field for email with validation */}
      <View style={styles.emailInputContainer}>
        <TextInput
          style={styles.emailInput}
          value={email}
          onFocus={() => setPrevEmail(email)}
          onChangeText={(text) => setEmail(text)}
          onEndEditing={(event) => validEmail(event.nativeEvent.text)}
        />
      </View>

    </SafeAreaView>
  );
};

// Exporting the EditProfilePage component as the default export
export default EditProfilePage;

