import React, { useState, useEffect } from "react";
import { View, Image, ImageBackground } from "react-native";
import InputField from "./InputField";
import styles from "./editProfileStyles";

const EditProfileForm = ({
  firstname,
  setFirstName,
  prevFirstName,
  setPrevFirstName,
  lastname,
  setLastName,
  prevLastName,
  setPrevLastName,
  phone,
  setPhone,
  setPrevPhone,
  email,
  setEmail,
  setPrevEmail,
  pfp,
  setHasErrors,
  setEmailError,
  setPhoneError,
  setFirstNameError,
  setLastNameError,
  emailError,
  phoneError,
  firstNameError,
  lastNameError,
}) => {
  const defaultProfile = require("../../assets/icons/profile.png");

  useEffect(() => {
    setHasErrors(hasErrors);
  }, [emailError, phoneError, firstNameError, lastNameError]);

  // Format phone number to remove non-numeric characters and limit to 11 characters
  const formatPhoneNumber = (text) => {
    const cleaned = text.replace(/\D/g, "");
    setPhone(cleaned.slice(0, 10));
  };

  // Format phone number for display with (XXX) XXX-XXXX pattern
  const phoneFormatted = (phone) => {
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2 - $3");
  };

  const isPhoneValid = (cleanedPhone) => {
    return cleanedPhone.length === 10 || cleanedPhone.length === 0;
  };

  const emailValidation = () => {
    if (isEmailValid(email)) {
      setEmailError("");
    } else {
      setEmailError("Invalid email format");
    }
  };

  const phoneValidation = () => {
    if (isPhoneValid(phone)) {
      setPhone(phone);
      setPhoneError("");
    } else {
      setPhoneError("Invalid phone number");
    }
  };

  // Check if email matches the proper format
  const isEmailValid = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  // Check if the first name is valid (contains only letters)
  const isValidFirstName = (firstname) => {
    const namePattern = /^[a-zA-Z]*$/;
    return namePattern.test(firstname);
  };

  // Validate first name and set error message if invalid
  const firstNameValidation = () => {
    if (isValidFirstName(firstname)) {
      setFirstName(firstname);
      setFirstNameError(""); // Clear the error message if the first name is valid
    } else {
      setFirstNameError("Invalid first name"); // Set the error message if the first name is invalid
      console.log("First Name is invalid");
    }
  };

  // Check if the last name is valid (contains only letters)
  const isValidLastName = (lastname) => {
    const namePattern = /^[a-zA-Z]*$/;
    return namePattern.test(lastname);
  };

  // Validate last name and set error message if invalid
  const lastNameValidation = () => {
    if (isValidLastName(lastname)) {
      setLastName(lastname);
      setLastNameError(""); // Clear the error message if the last name is valid
    } else {
      setLastNameError("Invalid last name"); // Set the error message if the last name is invalid
      console.log("Last Name is invalid");
    }
  };

  const hasErrors = () => {
    return (
      emailError !== "" ||
      phoneError !== "" ||
      firstNameError !== "" ||
      lastNameError !== ""
    );
  };

  return (
    <>
      <View style={styles.formContainer}>
        <ImageBackground
          source={require("../../assets/waves_profile.png")}
          style={styles.coverImage}
          resizeMode="cover"
        />
        <View style={styles.profilePictureContainer}>
          <View styles={styles.profileImageContainer}>
            <Image
              source={pfp ? { uri: pfp } : defaultProfile}
              style={styles.profileImage}
            />
          </View>
        </View>
        <InputField
          icon="account-circle"
          placeholder="First Name"
          value={firstname}
          onChangeText={(text) => {
            setFirstName(text);
            setFirstNameError("");
          }}
          onBlur={firstNameValidation}
          onFocus={() => setPrevFirstName(firstname)}
          errorText={firstNameError}
          charLimit={50}
        />
        <InputField
          icon="account-circle"
          placeholder="Last Name"
          value={lastname}
          onChangeText={(text) => {
            setLastName(text);
            setLastNameError("");
          }}
          onBlur={lastNameValidation}
          onFocus={() => setPrevLastName(lastname)}
          errorText={lastNameError} // Display the last name error
          charLimit={50}
        />

        {/* Phone Number */}
        <InputField
          icon="phone"
          placeholder="PHONE NUMBER"
          value={phoneFormatted(phone)}
          onChangeText={(text) => {
            formatPhoneNumber(text);
            setPhoneError("");
          }}
          onBlur={phoneValidation}
          onFocus={() => setPrevPhone(phone)}
          errorText={phoneError}
        />

        <InputField
          icon="email"
          placeholder="Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setEmailError(""); // Clear the email error when the text changes
          }}
          onBlur={emailValidation}
          onFocus={() => setPrevEmail(email)}
          errorText={emailError}
          charLimit={100}
        />
      </View>
    </>
  );
};

export default EditProfileForm;
