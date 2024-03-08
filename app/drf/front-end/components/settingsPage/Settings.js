import React from "react";
import { View, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Item from "./Item";
import styles from "./styles";
import CustomText from "../CustomText";

const SettingsPage = () => {
  const navigation = useNavigation();

  const goToEditProfile = () => {
    navigation.navigate("EditProfile", { sourceScreen: "Settings" });
  };

  const goToChangeEmail = () => {
    navigation.navigate("ChangeEmail");
  };

  const goToChangePassword = () => {
    navigation.navigate("ChangePassword");
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/wave.png")}
        style={styles.imageBg}
      >
        <View style={styles.header}>
          <CustomText style={styles.headerText} fontType={"title"}>
            Settings
          </CustomText>
          <CustomText style={styles.subHeaderText} fontType={"subHeader"}>
            Manage your account and personal information
          </CustomText>
        </View>
        <View style={styles.containerItems}>
          <Item
            title={"Personal Details"}
            description={"Update your profile information"}
            onPress={goToEditProfile}
            icon={"person"}
          />
          <Item
            title={"Change Email"}
            description={"Change your current email address"}
            onPress={goToChangeEmail}
            icon={"email"}
          />
          <Item
            title={"Change Password"}
            description={"Set a new password for your account"}
            onPress={goToChangePassword}
            icon="lock"
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default SettingsPage;
