import React from "react";
import { View, TouchableOpacity } from "react-native";
import CustomText from "../CustomText";
import styles from "./styles";
import { MaterialIcons } from "@expo/vector-icons";

const Item = ({ title, description, icon = "arrow-forward-ios", onPress }) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.itemContainer}>
          <View style={styles.headerContainer}>
            <CustomText style={styles.itemTitle} fontType={"text"}>
              {title}
            </CustomText>
            <CustomText style={styles.itemDescription} fontType={"subHeader"}>
              {description}
            </CustomText>
          </View>
          <View style={styles.iconContainer}>
            <MaterialIcons
              name={icon}
              size={30}
              color={"grey"}
              style={styles.icon}
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Item;
