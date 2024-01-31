import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  BackHandler,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./editProfileStyles";
import { getUserData, updateUserData } from "../helperFunctions/apiHelpers";
import AuthContext from "../../context/AuthContext";
import EditProfileForm from "./editProfileJSX"; // Importing the EditProfileForm component

const EditProfilePage = () => {
  const { authTokens, userId } = useContext(AuthContext);

  // State variables to hold user data and form input values
  const [userData, setUserData] = useState(null);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [prevPhone, setPrevPhone] = useState("");
  const [email, setEmail] = useState("");
  const [prevEmail, setPrevEmail] = useState("");
  const [prevFirstName, setPrevFirstName] = useState("");
  const [prevLastName, setPrevLastName] = useState("");

  // Accessing navigation object for navigating between screens
  const navigation = useNavigation();

  // Effect hook to fetch user data when the component mounts or dependencies change
  useEffect(() => {
    // Fetch user data
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
        console.log("Error fetching user data: ", error, "editProfileMain.js");
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
        // Fetching updated user data after a successful update
        getUserData(userId, authTokens)
          .then((data) => {
            setUserData(data);
            console.log("User Data updated:", data);
          })
          .catch((error) => {
            console.error(
              "Error fetching updated user data:",
              error,
              "editProfileMain.js"
            );
          });
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
      });
  };

  // Function to navigate back to the previous screen
  const goBack = () => {
    navigation.goBack();
  };

  const toHome = () => {
    navigation.goBack();
  }

  const saveButtonPress = () => {
    toHome();
    handleSaveDetails();
  }

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
        <TouchableOpacity onPress={saveButtonPress}>
          <Text style={styles.saveButton}>Save</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.profilePictureContainer}>
        <Image
          source={require("../../assets/images/profilePage/pfp.png")}
          style={styles.profileImage}
        />
      </View>

      {/* EditProfileForm component */}
      <EditProfileForm
        firstname={firstname}
        setFirstName={setFirstName}
        prevFirstName={prevFirstName}
        setPrevFirstName={setPrevFirstName}
        lastname={lastname}
        setLastName={setLastName}
        prevLastName={prevLastName}
        setPrevLastName={setPrevLastName}
        phone={phone}
        setPhone={setPhone}
        prevPhone={prevPhone}
        setPrevPhone={setPrevPhone}
        email={email}
        setEmail={setEmail}
        prevEmail={prevEmail}
        setPrevEmail={setPrevEmail}
      />
      <View style={styles.buttonFieldContainer}>
        <TouchableOpacity style={styles.changePasswordButton}>
          <Text style={styles.changePasswordText}>Change Password</Text>
        </TouchableOpacity>
        {/*
        <TouchableOpacity style={styles.deleteAccountButton}>
          <Text style={styles.deleteAccountText}>Delete Account</Text>
        </TouchableOpacity>
      */}
        </View>
    </SafeAreaView>
  );
};

export default EditProfilePage;
