import React, { useState, useRef, useContext } from 'react';
import { View, Image, StyleSheet, Dimensions, Animated, TouchableOpacity, Text, Alert  } from 'react-native';
import CustomText from '../CustomText';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
import { deletePost } from '../helperFunctions/apiHelpers';
import AuthContext from "../../context/AuthContext";


const windowWidth = Dimensions.get('window').width;


const PostCard = ({ post, onPress }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const scaleValue = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current; // Initial value for rotation: 0 degrees
  const [isModalVisible, setModalVisible] = useState(false);
  const { userId, authTokens } = useContext(AuthContext); // Accesses auth context for user ID and tokens.


  const onToggleDropdown = () => {
    // Start the animation
    Animated.timing(rotateAnim, {
      toValue: dropdownVisible ? 0 : 1, // Values are switched
      duration: 300,
      useNativeDriver: true,
    }).start();

    setDropdownVisible(!dropdownVisible);
  };

  // Calculate rotation degree
  const rotationDegree = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'], // Rotate from 0 to 180 degrees
  });
  
  // Function to shorten the description text
  const shortenText = (text, maxLength = 50) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };
  const onCardPressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  const onCardPressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  // TODO: handle the edit action
  const handleEdit = () => {
    console.log("Edit action");
    setDropdownVisible(false); 
  };

  // Function to handle the delete action
  const handleDeleteConfirmation = () => {
    setModalVisible(true);
    setDropdownVisible(false);
  };

  // Function to handle delete when user confirms
  const handleDelete = async () => {
    try {
      await deletePost(post.id, authTokens);
      setModalVisible(false);
      // trigger a state update to remove the post from the UI
    } catch (error) {
      console.log("Error", error.message);
    }
  };

  const handleCancel = async () => {
    setModalVisible(false);
  }
  
  // Function to render a single dropdown item
  const DropdownItem = ({ iconName, label, onPress, color = "#595959" }) => (
    <TouchableOpacity onPress={onPress} style={styles.dropdownItem}>
      <MaterialIcons name={iconName} size={24} color={color} style={styles.dropdownIcon} />
      <Text style={styles.dropdownItemText}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <TouchableOpacity onPressIn={onCardPressIn} onPressOut={onCardPressOut} onPress={onPress} activeOpacity={1}>
        <Animated.View style={[styles.card, { transform: [{ scale: scaleValue }] }]}>
          <Image source={{ uri: post?.images[0]?.image }} style={styles.image} />

          {/* Edit button */}
          <TouchableOpacity onPress={onToggleDropdown} style={styles.editButton} activeOpacity={1}>
            <CustomText style={styles.editButtonText}>Actions</CustomText>
            <Animated.View
              style={{
                transform: [{ rotate: rotationDegree }],
              }}
            >
              <MaterialIcons name="expand-more" size={24} color="#595959" />
            </Animated.View>
          </TouchableOpacity>

          {/* Dropdown Menu */}
          {dropdownVisible && (
            <View style={styles.dropdownMenu}>
              <DropdownItem iconName="edit" label="Edit" onPress={handleEdit} />
              <DropdownItem iconName="delete" label="Delete" onPress={handleDeleteConfirmation} color={"#f73e47"}/>
            </View>
      )}

          <View style={styles.content}>
            <CustomText style={styles.title}>{post.title}</CustomText>
            <CustomText style={styles.description}>{shortenText(post.content)}</CustomText>
          </View>
        </Animated.View>
      </TouchableOpacity>
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <CustomText style={styles.modalTitle}>Delete Post</CustomText>
          <CustomText style={styles.modalMessage}>Are you sure you want to delete this post?</CustomText>
          <View style={styles.modalButtons}>
            <TouchableOpacity onPress={handleCancel} style={styles.modalButtonCancel}>
              <CustomText style={styles.modalButtonText}>Cancel</CustomText>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete} style={styles.modalButtonDelete}>
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
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    margin: 5,
    width: windowWidth - 10, 
    marginBottom: 10,  
    height:280,  
  },
  image: {
    width: '100%',
    height: 200, 
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  content: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 12,
    color: '#666',
  },
  editButton: {
    position: 'absolute',
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"flex-end",
    top: 0,
    right: 0,
    backgroundColor: 'rgb(255, 255, 255)', 
    borderTopRightRadius: 10,
    borderBottomLeftRadius:10,
    padding: 5,
  },
  editButtonText:{
    marginHorizontal:5,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 40, 
    right: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 1000, 
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  dropdownIcon: {
    marginRight: 15,
  },
  dropdownItemText: {
    color: '#595959',
    fontSize: 16,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 15,
  },
  modalMessage: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
  },
  modalButtonCancel: {
    backgroundColor: '#a6a6a6',
    padding: 10,
    borderRadius: 4,
    marginRight: 10,
  },
  modalButtonDelete: {
    backgroundColor: '#f73e47',
    padding: 10,
    borderRadius: 4,
  },
  modalButtonText:{
    color: 'white',
  }
});

export default PostCard;
