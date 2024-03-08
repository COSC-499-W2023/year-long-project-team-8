import React, { useEffect, useState, useContext } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { updateProfilePicture } from "../helperFunctions/apiHelpers";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import styles from "./editProfileStyles";
import { getUserData, updateUserData } from "../helperFunctions/apiHelpers";
import AuthContext from "../../context/AuthContext";
import EditProfileForm from "./editProfileJSX";
import SaveButton from "./SaveButton";

const EditProfilePage = () => {
  const { authTokens, userId } = useContext(AuthContext);

  // State variables to hold user data and form input values
  const [userData, setUserData] = useState(null);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [prevEmail, setPrevEmail] = useState("");
  const [prevPhone, setPrevPhone] = useState("");
  const [prevFirstName, setPrevFirstName] = useState("");
  const [prevLastName, setPrevLastName] = useState("");
  const [pfp, setPfp] = useState(null);
  const [formHasErrors, setFormHasErrors] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");

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
        setPfp(data?.profile_picture);
      })
      .catch((error) => {
        console.log("Error fetching user data: ", error, "editProfileMain.js");
      });
  }, [userId, authTokens]);

  const fetchUserData = async () => {
    try {
      const data = await getUserData(userId, authTokens);
      setFirstName(data?.firstname);
      setLastName(data?.lastname);
      setPhone(data?.phone);
      setEmail(data?.email);
      setPfp(data?.profile_picture);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        // Reset form values to the actual user's values when the screen goes out of focus
        setFirstName(userData?.firstname || "");
        setLastName(userData?.lastname || "");
        setPhone(userData?.phone || "");
        setEmail(userData?.email || "");
        setPfp(userData?.profile_picture);
        setEmailError("");
        setPhoneError("");
        setLastNameError("");
        setFirstNameError("");
      };
    }, [userData])
  );

  useFocusEffect(
    React.useCallback(() => {
      fetchUserData();
    }, [userId, authTokens])
  );

  // Function to handle saving edited user details
  const handleSaveDetails = () => {
    const updatedData = {};
    updatedData.firstname = firstname;
    updatedData.lastname = lastname;
    updatedData.phone = phone;

    if (email !== "") {
      updatedData.email = email;
    }

    updateUserData(userId, authTokens, updatedData)
      .then(() => {
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

  const saveButtonPress = async () => {
    if (!formHasErrors) {
      await handleSaveDetails();
      navigation.goBack();
    } else {
      // Show an error message or handle the error
      console.log("Cannot save due to errors in the form");
    }
  };

  return (
    //put keyboard avoiding view and scrollview here so that users can move through the page
    <SafeAreaView
      style={styles.safeAreaView}
      keyboardVerticalOffset={200}
      behavior="padding"
    >
      {/* Top navigation bar with back button and save button */}
      <KeyboardAvoidingView>
        <ScrollView style={styles.scrollView}>
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
            pfp={pfp}
            setHasErrors={setFormHasErrors}
            setEmailError={setEmailError}
            setPhoneError={setPhoneError}
            emailError={emailError}
            phoneError={phoneError}
            firstNameError={firstNameError}
            lastNameError={lastNameError}
            setFirstNameError={setFirstNameError}
            setLastNameError={setLastNameError}
          />
          <View style={styles.saveButtonContainer}>
            <SaveButton title={"SAVE"} onPress={saveButtonPress} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/*
      <View style={styles.buttonFieldContainer}>
        <TouchableOpacity style={styles.changePasswordButton}>
          <Text style={styles.changePasswordText}>Change Password</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteAccountButton}>
          <Text style={styles.deleteAccountText}>Delete Account</Text>
        </TouchableOpacity>

        </View>*/}
    </SafeAreaView>
  );
};

export default EditProfilePage;
