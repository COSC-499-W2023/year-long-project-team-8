import React, { useEffect, useState, useContext } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  ImageBackground,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "./editProfileStyles";
import { getUserData, updateUserData } from "../helperFunctions/apiHelpers";
import AuthContext from "../../context/AuthContext";
import EditProfileForm from "./editProfileJSX";
import ButtonSignup from "../loginSignup/ButtonLanding";
import CustomText from "../CustomText";

const EditProfilePage = () => {
  const { authTokens, userId } = useContext(AuthContext);
  const navigation = useNavigation();
  const route = useRoute();

  const [userData, setUserData] = useState(null);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [formHasErrors, setFormHasErrors] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  useEffect(() => {
    getUserData(userId, authTokens)
      .then((data) => {
        setUserData(data);
        setFirstName(data?.firstname || "");
        setLastName(data?.lastname || "");
        setPhone(data?.phone || "");
      })
      .catch((error) => {
        console.log("Error fetching user data: ", error);
      });
  }, [userId, authTokens]);

  const handleSaveDetails = async () => {
    if (formHasErrors) {
      return;
    }

    const updatedData = {
      firstname: firstname,
      lastname: lastname,
      phone: phone,
    };

    try {
      await updateUserData(userId, authTokens, updatedData);
      const updatedUserData = await getUserData(userId, authTokens);
      setUserData(updatedUserData);

      // Navigate back to the source screen
      const sourceScreen = route.params?.sourceScreen;
      if (sourceScreen === "Profile") {
        navigation.navigate("Profile");
      } else if (sourceScreen === "Settings") {
        navigation.navigate("Settings");
      } else {
        navigation.goBack();
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/wave.png")}
      style={styles.container}
      resizeMode="cover"
    >
      <KeyboardAvoidingView style={styles.innerContainer}>
        <View>
          <View style={styles.headerContainer}>
            <CustomText style={styles.headerText}>Manage Details</CustomText>
          </View>
          <EditProfileForm
            firstname={firstname}
            setFirstName={setFirstName}
            lastname={lastname}
            setLastName={setLastName}
            phone={phone}
            setPhone={setPhone}
            setFormHasErrors={setFormHasErrors}
            setPhoneError={setPhoneError}
            phoneError={phoneError}
          />
          <View style={styles.saveButtonContainer}>
            <ButtonSignup title="Save Details" onPress={handleSaveDetails} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default EditProfilePage;
