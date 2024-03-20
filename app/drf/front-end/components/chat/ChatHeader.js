import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Alert,
} from "react-native";
import CustomText from "../CustomText";
const ChatHeader = ({
  receiverDetails,
  productDetails,
  navigation,
  isGiver,
  onGivenConfirm,
}) => {
  const imageUrl =
    productDetails?.images?.length > 0 ? productDetails.images[0].image : null;

  const displayName = receiverDetails?.firstname
    ? receiverDetails.firstname
    : receiverDetails.email
      ? receiverDetails.email.split("@")[0]
      : "Unknown User";

  const backArrowIcon = require("../../assets/icons/back-arrow.png");
  const [isDoneButtonPressed, setIsDoneButtonPressed] = useState(false);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const scaleDoneButton = new Animated.Value(1);
  const scaleImageButton = new Animated.Value(1);

  const pressInDoneButton = () => {
    Animated.spring(scaleDoneButton, {
      toValue: 0.9,
      speed: 20,
      useNativeDriver: true,
    }).start();
  };

  const pressOutDoneButton = () => {
    Animated.spring(scaleDoneButton, {
      toValue: 1,
      speed: 20,
      useNativeDriver: true,
    }).start();
  };

  const pressInImageButton = () => {
    Animated.spring(scaleImageButton, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 20,
    }).start();
  };

  const pressOutImageButton = () => {
    Animated.spring(scaleImageButton, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
    }).start();
  };

  const handleOnGiven = () => {
    if (isDoneButtonPressed) {
      Alert.alert(
        "Action Not Allowed",
        "You cannot unconfirm once the food has been marked as given."
      );
    } else {
      Alert.alert(
        "Confirm",
        "Are you sure you want to mark this listing as given?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: () => {
              setIsDoneButtonPressed(!isDoneButtonPressed);
              onGivenConfirm();
            },
          },
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.backArrowContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Image source={backArrowIcon} style={styles.icon} />
          </TouchableOpacity>
        </View>

        <CustomText style={styles.name} fontType={"text"}>
          {displayName}
        </CustomText>
      </View>
      <View style={styles.body}>
        {imageUrl && (
          <TouchableOpacity
            onPressIn={pressInImageButton}
            onPressOut={pressOutImageButton}
            style={styles.imageContainer}
            activeOpacity={1}
            onPress={() =>
              navigation.navigate("PostDetails", { listing: productDetails })
            }
          >
            <Animated.Image
              source={{ uri: imageUrl }}
              style={[
                styles.image,
                { transform: [{ scale: scaleImageButton }] },
              ]}
            />
          </TouchableOpacity>
        )}
        <View style={styles.detailsContainer}>
          <CustomText style={styles.productTitle}>
            {productDetails.title}
          </CustomText>
          <CustomText style={styles.productCategory}>
            {productDetails.categories}
          </CustomText>
          <View style={styles.expireDateContainer}>
            <CustomText style={styles.productExpireDate}>
              Expires: {formatDate(productDetails.best_before)}
            </CustomText>
            {isGiver && ( // Conditionally render the button if isGiver is true
              <TouchableOpacity
                onPressIn={pressInDoneButton}
                onPressOut={pressOutDoneButton}
                onPress={handleOnGiven}
                activeOpacity={1}
              >
                <Animated.View
                  style={{ transform: [{ scale: scaleDoneButton }] }}
                >
                  <View
                    style={[
                      styles.doneButton,
                      isDoneButtonPressed && { backgroundColor: "#6fc276" },
                    ]}
                  >
                    <CustomText style={styles.doneButtonText}>
                      Food Given
                    </CustomText>
                  </View>
                </Animated.View>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default ChatHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: "center",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  backArrowContainer: {
    position: "absolute",
    left: 0,
    zIndex: 10,
  },
  iconContainer: {
    width: 40,
  },
  icon: {
    width: 30,
    height: 30,
  },
  body: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    marginTop: 15,
  },
  imageContainer: {
    marginRight: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  detailsContainer: {
    flex: 1,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  productCategory: {
    fontSize: 15,
    color: "#666",
  },
  productExpireDate: {
    fontSize: 13,
    color: "#999",
  },
  name: {
    fontSize: 20,
    flex: 1,
    textAlign: "center",
  },
  expireDateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  doneButton: {
    backgroundColor: "rgba(167, 167, 167, 1)",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  doneButtonText: {
    color: "white",
    fontSize: 12,
  },
  draggable: {
    width: 15,
    height: 3,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 20,
    backgroundColor: "grey",
    borderColor: "grey",
    position: "absolute",
    bottom: 0,
  },
  newContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
    backgroundColor: "white",
    padding: 10,
    position: "absolute",
    top: 40,
    width: "100%",
  },
  newContentTitle: {
    fontSize: 25,
    alignSelf: "flex-start",
  },
  newContentDescription: {
    fontSize: 15,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  carouselContainer: {
    minHeight: 180,
    minWidth: 370,
  },
});
