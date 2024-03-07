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
  prevPhone,
  setPrevPhone,
  email,
  setEmail,
  prevEmail,
  setPrevEmail,
  pfp,
  setHasErrors,
  setEmailError,
  setPhoneError,
  emailError,
  phoneError,
}) => {
  useEffect(() => {
    setHasErrors(hasErrors);
  }, [emailError, phoneError]);

  // Format phone number to remove non-numeric characters and limit to 11 characters
  const formatPhoneNumber = (text) => {
    const cleaned = text.replace(/\D/g, "");
    setPhone(cleaned.slice(0, 10));
  };

  // Format phone number for display with  (XXX) XXX-XXXX pattern
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
      setPhoneError("Invalid phone format");
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

  // Validate first name and revert to the previous value if invalid
  const firstNameValidation = () => {
    if (isValidFirstName(firstname)) {
      setFirstName(firstname);
    } else {
      // TODO: Implement error modal to give user feedback
      setFirstName(prevFirstName);
      console.log("First Name is invalid");
    }
  };

  // Check if the last name is valid (contains only letters)
  const isValidLastName = (lastname) => {
    const namePattern = /^[a-zA-Z]*$/;
    return namePattern.test(lastname);
  };

  // Validate last name and revert to the previous value if invalid
  const lastNameValidation = () => {
    if (isValidLastName(lastname)) {
      setLastName(lastname);
    } else {
      // TODO: Implement error modal to give user feedback
      setLastName(prevLastName);
      console.log("Last Name is invalid");
    }
  };

  const hasErrors = () => {
    return emailError !== "" || phoneError !== "";
  };

  return (
    <>
      {/* First and Last Name */}
      <View style={styles.formContainer}>
        <ImageBackground
          source={require("../../assets/waves_profile.png")}
          style={styles.coverImage}
          resizeMode="cover"
        />
        <View style={styles.profilePictureContainer}>
          <View styles={styles.profileImageContainer}>
            <Image source={{ uri: pfp }} style={styles.profileImage} />
          </View>
        </View>
        <InputField
          icon="account-circle"
          placeholder="First Name"
          value={firstname}
          onChangeText={setFirstName}
          onBlur={firstNameValidation}
          onFocus={() => setPrevFirstName(firstname)}
        />
        <InputField
          icon="account-circle"
          placeholder="Last Name"
          value={lastname}
          onChangeText={setLastName}
          onBlur={lastNameValidation}
          onFocus={() => setPrevLastName(lastname)}
        />

        {/* Phone Number */}
        <InputField
          icon="phone"
          placeholder="Phone Number"
          value={phoneFormatted(phone)}
          onChangeText={(text) => {
            formatPhoneNumber(text);
            setPhoneError(""); // Clear the phone error when the text changes
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
        />
      </View>
    </>
  );
};

export default EditProfileForm;
