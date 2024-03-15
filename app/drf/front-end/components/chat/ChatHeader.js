import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  PanResponder,
  Animated,
} from "react-native";
import CustomText from "../CustomText";
import CarouselComponent from "../posts/CarouselComponent";
const ChatHeader = ({
  receiverDetails,
  productDetails,
  navigation,
  isGiver,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const animatedHeight = useRef(new Animated.Value(150)).current;
  const contentOpacity = useRef(new Animated.Value(1)).current;
  const carouselOpacity = useRef(new Animated.Value(0)).current;

  const startY = useRef(0);

  const imageUrl =
    productDetails?.images?.length > 0 ? productDetails.images[0].image : null;

  const displayName = receiverDetails?.firstname
    ? receiverDetails.firstname
    : receiverDetails.email
      ? receiverDetails.email.split("@")[0]
      : "Unknown User";

  const backArrowIcon = require("../../assets/icons/back-arrow.png");
  const [isDoneButtonPressed, setIsDoneButtonPressed] = useState(false);
  const images = productDetails?.images;

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
    console.log("Food Given");
    setIsDoneButtonPressed(!isDoneButtonPressed);
  };

  const handleOnReceived = () => {
    console.log("Food Received");
    setIsDoneButtonPressed(!isDoneButtonPressed);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => {
        // Get the position of the carousel
        const carouselPosition = {
          x: 0,
          y: isExpanded ? 150 : 350, // Adjust these values based on your layout
          width: styles.carouselContainer.minWidth,
          height: styles.carouselContainer.minHeight,
        };

        // Check if the gesture starts within the carousel bounds
        const isGestureInCarousel =
          gestureState.x0 >= carouselPosition.x &&
          gestureState.x0 <= carouselPosition.x + carouselPosition.width &&
          gestureState.y0 >= carouselPosition.y &&
          gestureState.y0 <= carouselPosition.y + carouselPosition.height;

        // Only set the pan responder if the gesture is outside the carousel bounds
        return !isGestureInCarousel;
      },
      onPanResponderGrant: (_, gestureState) => {
        startY.current = gestureState.y0;
      },
      onPanResponderMove: (_, gestureState) => {
        const distance = gestureState.moveY - startY.current;
        if (distance > 0 && !isExpanded) {
          // Dragging down to expand
          animatedHeight.setValue(Math.max(150 + distance, 150));
          contentOpacity.setValue(1 - distance / 150);
          carouselOpacity.setValue(distance / 200); // Fade in carousel as the header expands
        } else if (distance < 0 && (isExpanded || distance < -50)) {
          // Dragging up to collapse
          const newHeight = 350 + distance;
          animatedHeight.setValue(Math.max(newHeight, 150));
          contentOpacity.setValue(distance / 150 + 1);
          carouselOpacity.setValue(-distance / 200); // Fade out carousel as the header collapses
          if (distance < -50) {
            setIsExpanded(false); // Update the isExpanded state when dragging up
          }
        }
      },

      onPanResponderRelease: (_, gestureState) => {
        const distance = gestureState.moveY - startY.current;
        if (distance > 50 && !isExpanded) {
          // Expand if dragged down significantly
          Animated.parallel([
            Animated.spring(animatedHeight, {
              toValue: 350, // Expanded height
              useNativeDriver: false,
            }),
            Animated.timing(contentOpacity, {
              toValue: 0, // Fade out content
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(carouselOpacity, {
              toValue: 1, // Fade in carousel
              duration: 300,
              useNativeDriver: true,
            }),
          ]).start(() => setIsExpanded(true));
        } else if (distance < -50 && isExpanded) {
          // Collapse if dragged up significantly
          Animated.parallel([
            Animated.spring(animatedHeight, {
              toValue: 150, // Collapsed height
              useNativeDriver: false,
            }),
            Animated.timing(contentOpacity, {
              toValue: 1, // Fade in content
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(carouselOpacity, {
              toValue: 0, // Fade out carousel
              duration: 300,
              useNativeDriver: true,
            }),
          ]).start(() => setIsExpanded(false));
        } else {
          // Reset to original state if not dragged enough
          Animated.spring(animatedHeight, {
            toValue: isExpanded ? 350 : 150,
            useNativeDriver: false,
          }).start();
          setIsExpanded(false); // Ensure the state is updated to collapsed
          Animated.timing(contentOpacity, {
            toValue: 1, // Fade in content
            duration: 300,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  return (
    <Animated.View
      style={[styles.container, { height: animatedHeight }]}
      {...panResponder.panHandlers}
    >
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
      {!isExpanded ? (
        <Animated.View style={[styles.body, { opacity: contentOpacity }]}>
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
              <TouchableOpacity
                onPressIn={pressInDoneButton}
                onPressOut={pressOutDoneButton}
                onPress={isGiver ? handleOnGiven : handleOnReceived}
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
                      {isGiver ? "Food Given" : "Food Received"}
                    </CustomText>
                  </View>
                </Animated.View>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      ) : (
        <Animated.View
          style={[styles.newContent, { opacity: carouselOpacity }]}
        >
          <View style={styles.carouselContainer}>
            <CarouselComponent images={images} />
          </View>
        </Animated.View>
      )}
      <View style={styles.draggable} />
    </Animated.View>
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
  },
  carouselContainer: {
    minHeight: 200,
    minWidth: 380,
    zIndex: 1000,
  },
});
