import React, {useState} from "react";
import { View, Text, TextInput } from "react-native";

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
}) => {

  // Format phone number to remove non-numeric characters and limit to 11 characters
  const formatPhoneNumber = (text) => {
    const cleaned = text.replace(/\D/g, "");
    setPhone(cleaned.slice(0, 10));
  };

  // Format phone number for display with  (XXX) XXX-XXXX pattern
  const phoneFormatted = (phone) => {
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2 - $3');
  };

  // Check if phone number matches the pattern /^\(\d{3}\) \d{3} - \d{4}/
  const isPhoneValid = (phone) => {
    const phonePattern = /^ \(\d{3}\) \d{3} - \d{4}/;
    return phonePattern.test(phone);
  };

  // Validate phone number and revert to the previous value if invalid
  const phoneValidation = () => {
    if (isPhoneValid(phone)) {
      setPhone(phone);
    } else {
      // TODO: Implement error modal to give user feedback
      setPhone(prevPhone);
      console.log("Phone is invalid");
    }
  };

  // Check if email matches the proper format
  const isEmailValid = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  // Validate email and revert to the previous value if invalid
  const emailValidation = () => {
    if (isEmailValid(email)) {
      setEmail(email);const emailValidation = () => {
    if (isEmailValid(email)) {
      setEmail(email);
    } else {
      // Revert to the previous value
      setEmail(prevEmail);
    }
  };
    } else {
      // TODO: Implement error modal to give user feedback
      setEmail(prevEmail);
      console.log("Email is invalid");
    }
  };

  // Check if the first name is valid (contains only letters)
  const isValidFirstName = (firstname) => {
    const namePattern = /^[a-zA-Z]+$/;
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
    const namePattern = /^[a-zA-Z]+$/;
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

  return (
    <>
      {/* First and Last Name */}
      <View style={styles.nameTextContainer}>
        <Text style={styles.firstName}>First Name</Text>
        <Text style={styles.lastName}>Last Name</Text>
      </View>

      <View style={styles.nameInputContainer}>
        {/* Input field for first name */}
        <TextInput
          style={styles.firstNameInput}
          value={firstname.charAt(0).toUpperCase() + firstname.slice(1)}
          onEndEditing={() => firstNameValidation()}
          onFocus={() => setPrevFirstName(firstname)}
          onChangeText={(text) => setFirstName(text)}
        />
        {/* Input field for last name */}
        <TextInput
          style={styles.lastNameInput}
          value={lastname.charAt(0).toUpperCase() + lastname.slice(1)}
          onEndEditing={() => lastNameValidation()}
          onFocus={() => setPrevLastName(lastname)}
          onChangeText={(text) => setLastName(text)}
        />
      </View>

      {/* Phone Number */}
      <View style={styles.phoneNumberTextContainer}>
        <Text style={styles.phoneNumber}>Phone Number</Text>
      </View>

      <View style={styles.phoneNumberInputContainer}>
        {/* Input field for phone number with formatting and validation */}
        <TextInput
          style={styles.phoneNumberInput}
          placeholder={"(xxx) xxx - xxxx"}
          value={phoneFormatted(phone)}
          maxLength={20}
          onFocus={() => setPrevPhone(phone)}
          onChangeText={(text) => formatPhoneNumber(text)}
          onEndEditing={() => phoneValidation()}
        />
      </View>

      {/* Email */}
      <View style={styles.emailTextContainer}>
        <Text style={styles.email}>Email</Text>
      </View>

      <View style={styles.emailInputContainer}>
        {/* Input field for email with validation */}
        <TextInput
          style={styles.emailInput}
          value={email}
          autoCapitalize={"none"}
          onFocus={() => setPrevEmail(email)}
          onChangeText={(text) => setEmail(text)}
          onEndEditing={() => emailValidation()}
        />
      </View>
    </>
  );
};

export default EditProfileForm;
