import React from "react";
import { View, Text, TextInput } from "react-native";
import styles from "./editProfileStyles";

// EditProfileForm Component
const EditProfileForm = ({
    firstname,
    setFirstName,
    lastname,
    setLastName,
    phone,
    setPhone,
    email,
    setEmail,
    prevEmail,
    setPrevEmail,
}) => {

    // Function to format phone number input as the user types
    const formatPhoneNumber = (text) => {
        const cleaned = text.replace(/\D/g, "");
        setPhone(cleaned);
    };

    // Function to format phone number for display
    const phoneFormatting = (phone) => {
        return phone.replace(/(\d)(\d{3})(\d{3})(\d{4})/, '+$1 ($2) $3 - $4')
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
                    value={firstname ? firstname.charAt(0).toUpperCase() + firstname.slice(1) : ""}
                    onChangeText={(text) => setFirstName(text)}
                />
                {/* Input field for last name */}
                <TextInput
                    style={styles.lastNameInput}
                    value={lastname ? lastname.charAt(0).toUpperCase() + lastname.slice(1) : ""}
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
                    placeholder={"+x (xxx) xxx - xxxx"}
                    value={phoneFormatting(phone) || "+1 (111) 111 - 1111"}
                    onChangeText={(text) => formatPhoneNumber(text)}
                    maxLength={14}
                    keyboardType={'phone-pad'}
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
                    value={email || "test@test.com"}
                    onFocus={() => setPrevEmail(email)}
                    onChangeText={(text) => setEmail(text)}
                    onEndEditing={(event) => validEmail(event.nativeEvent.text)}
                />
            </View>
        </>
    );
};

export default EditProfileForm;

