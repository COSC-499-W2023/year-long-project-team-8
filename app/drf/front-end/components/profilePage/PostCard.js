import React, { useState, useRef, useContext, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import CustomText from "../CustomText";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Modal from "react-native-modal";
import AuthContext from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { deleteProduct } from "../helperFunctions/apiHelpers";
import { useAppState } from "../../context/AppStateContext";

const windowWidth = Dimensions.get("window").width;

const PostCard = ({
  post,
  onPress,
  isDropdownVisible,
  onPressDropdown,
  onPostDelete,
}) => {
  // Removed local dropdownVisible state
  const scaleValue = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const [isModalVisible, setModalVisible] = useState(false);
  const { userId, authTokens } = useContext(AuthContext);
  const navigation = useNavigation();
  const { updatePostCreated } = useAppState();

  // Rotation degree for dropdown icon
  const rotationDegree = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  // Function to shorten the description text
  const shortenText = (text, maxLength = 50) =>
    text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

  // Press In and Press Out animations
  const onCardPressIn = () =>
    Animated.spring(scaleValue, {
      toValue: 0.95,
      friction: 4,
      useNativeDriver: true,
    }).start();
  const onCardPressOut = () =>
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();

  // Edit and Delete handlers
  const handleEdit = () => {
    navigation.navigate("EditPost", { post });
    onPressDropdown(); // Close dropdown after navigation
  };
  const handleDeleteConfirmation = () => {
    setModalVisible(true);
    onPressDropdown(); // Close dropdown when confirming delete
  };

  // TODO: Delete action
  const handleDelete = async () => {
    try {
      await deleteProduct(authTokens, post.id);
      onPostDelete(); // Trigger the refresh of the post list
      updatePostCreated();
      setModalVisible(false);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Cancel delete action
  const handleCancel = () => setModalVisible(false);

  // Dropdown item component
  const DropdownItem = ({ iconName, label, onPress, color = "#595959" }) => (
    <TouchableOpacity onPress={onPress} style={styles.dropdownItem}>
      <MaterialIcons
        name={iconName}
        size={24}
        color={color}
        style={styles.dropdownIcon}
      />
      <Text style={styles.dropdownItemText}>{label}</Text>
    </TouchableOpacity>
  );

  // Rotate animation for dropdown icon
  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: isDropdownVisible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isDropdownVisible]);

  return (
    <>
      <TouchableOpacity
        onPressIn={onCardPressIn}
        onPressOut={onCardPressOut}
        onPress={onPress}
        activeOpacity={1}
        style={styles.card}
      >
        <Image source={{ uri: post?.images[0]?.image }} style={styles.image} />
        <TouchableOpacity
          onPress={onPressDropdown}
          style={styles.editButton}
          activeOpacity={1}
        >
          <CustomText style={styles.editButtonText}>Options</CustomText>
          <Animated.View style={{ transform: [{ rotate: rotationDegree }] }}>
            <MaterialIcons name="expand-more" size={24} color="#595959" />
          </Animated.View>
        </TouchableOpacity>

        {isDropdownVisible && (
          <View style={styles.dropdownMenu}>
            <DropdownItem iconName="edit" label="Edit" onPress={handleEdit} />
            <DropdownItem
              iconName="delete"
              label="Delete"
              onPress={handleDeleteConfirmation}
              color="#f73e47"
            />
          </View>
        )}

        <View style={styles.content}>
          <CustomText style={styles.title}>{post.title}</CustomText>
          <CustomText style={styles.description}>
            {shortenText(post.content)}
          </CustomText>
        </View>
      </TouchableOpacity>

      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <CustomText style={styles.modalTitle}>Delete Post</CustomText>
          <CustomText style={styles.modalMessage}>
            Are you sure you want to delete this post?
          </CustomText>
          <View style={styles.modalButtons}>
            <TouchableOpacity
              onPress={handleCancel}
              style={styles.modalButtonCancel}
            >
              <CustomText style={styles.modalButtonText}>Cancel</CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleDelete}
              style={styles.modalButtonDelete}
            >
              <CustomText style={styles.modalButtonText}>Delete</CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    margin: 5,
    width: windowWidth - 10,
    marginBottom: 10,
    height: 280,
  },
  image: {
    width: "100%",
    height: 200,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  content: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 12,
    color: "#666",
  },
  editButton: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    top: 0,
    right: 0,
    backgroundColor: "rgb(255, 255, 255)",
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    padding: 5,
  },
  editButtonText: {
    marginHorizontal: 5,
  },
  dropdownMenu: {
    position: "absolute",
    top: 40,
    right: 10,
    backgroundColor: "white",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 1000,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  dropdownIcon: {
    marginRight: 15,
  },
  dropdownItemText: {
    color: "#595959",
    fontSize: 16,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 15,
  },
  modalMessage: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
  },
  modalButtonCancel: {
    backgroundColor: "#a6a6a6",
    padding: 10,
    borderRadius: 4,
    marginRight: 10,
  },
  modalButtonDelete: {
    backgroundColor: "#f73e47",
    padding: 10,
    borderRadius: 4,
  },
  modalButtonText: {
    color: "white",
  },
});

export default PostCard;
