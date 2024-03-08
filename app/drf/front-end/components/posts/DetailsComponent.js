import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import CustomText from "../CustomText";
import { Rating } from "@kolking/react-native-rating";

const DetailsComponent = ({
  displayName,
  rating,
  userProfilePicture,
  navigation,
  userId,
}) => {
  const dummyPfp = require("../../assets/icons/profile.png");
  const profilePicSource = userProfilePicture
    ? { uri: userProfilePicture }
    : dummyPfp;

  return (
    <View style={styles.giverDetailsContainer}>
      <CustomText style={styles.giverTitle} fontType={"title"}>
        Giver
      </CustomText>
      <View style={styles.giverContent}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("OtherProfile", { userId: userId })
          }
        >
          <Image source={profilePicSource} style={styles.profilePic} />
        </TouchableOpacity>
        <View style={styles.giverInfo}>
          <CustomText style={styles.giverName} fontType={"text"}>
            {displayName}
          </CustomText>
          <View style={styles.ratingDisplay}>
            <Rating
              size={18}
              rating={rating}
              fillColor="orange"
              spacing={5}
              disabled={true}
            />
            <CustomText style={styles.rating} fontType={"text"}>
              {rating}
            </CustomText>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DetailsComponent;
