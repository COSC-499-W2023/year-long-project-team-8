import React, { useEffect, useState } from "react";
import { View } from "react-native";
import InputField from "./InputField";
import styles from "./editProfileStyles";

const EditProfileForm = ({
  firstname,
  setFirstName,
  lastname,
  setLastName,
  phone,
  setPhone,
  setFormHasErrors,
  setPhoneError,
  phoneError,
  firstNameError,
  lastNameError,
  setFirstNameError,
  setLastNameError,
}) => {
  // Format phone number for display with (XXX) XXX-XXXX pattern
  const phoneFormatted = (phone) => {
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2 - $3");
  };

  const isPhoneValid = (cleanedPhone) => {
    return cleanedPhone.length === 10 || cleanedPhone.length === 0;
  };

  const phoneValidation = () => {
    if (isPhoneValid(phone)) {
      setPhone(phone);
      setPhoneError("");
    } else {
      setPhoneError("Invalid phone number");
    }
  };

  const isNameValid = (name) => {
    return /^[A-Za-z\s]*$/.test(name);
  };

  const nameValidation = (name, setName, setError) => {
    if (isNameValid(name)) {
      setName(name);
      setError("");
    } else {
      setError("Name can only contain letters and spaces");
    }
  };

  useEffect(() => {
    setFormHasErrors(
      phoneError !== "" || firstNameError !== "" || lastNameError !== ""
    );
  }, [phoneError, firstNameError, lastNameError, setFormHasErrors]);

  return (
    <View style={styles.formContainer}>
      <InputField
        icon="account-circle"
        placeholder="First Name"
        value={firstname}
        onChangeText={(text) => {
          setFirstName(text.trim());
          nameValidation(text.trim(), setFirstName, setFirstNameError);
        }}
        errorText={firstNameError}
      />
      <InputField
        icon="account-circle"
        placeholder="Last Name"
        value={lastname}
        onChangeText={(text) => {
          setLastName(text.trim());
          nameValidation(text.trim(), setLastName, setLastNameError);
        }}
        errorText={lastNameError}
      />
      <InputField
        icon="phone"
        placeholder="Phone Number"
        value={phoneFormatted(phone)}
        onChangeText={(text) => {
          const cleaned = text.replace(/\D/g, "");
          setPhone(cleaned.slice(0, 10));
        }}
        onBlur={phoneValidation}
        errorText={phoneError}
      />
    </View>
  );
};

export default EditProfileForm;
