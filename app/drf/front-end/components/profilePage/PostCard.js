import React, { useState, useRef } from 'react';
import { View, Image, StyleSheet, Dimensions, Animated, TouchableOpacity, Text, Alert  } from 'react-native';
import CustomText from '../CustomText';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const windowWidth = Dimensions.get('window').width;


const PostCard = ({ post, onPress }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const scaleValue = useRef(new Animated.Value(1)).current;
  
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
  const handleDelete = () => {
    // Show confirmation alert
    Alert.alert(
      "Delete Post",
      "Are you sure you want to delete this post?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => console.log("Delete Pressed"), // Add your deletion logic here
          style: "destructive"
        }
      ],
      { cancelable: true } // This allows the alert to be dismissed by tapping outside of it
    );
  };
  
  // Function to render a single dropdown item
  const DropdownItem = ({ iconName, label, onPress, color = "#595959" }) => (
    <TouchableOpacity onPress={onPress} style={styles.dropdownItem}>
      <MaterialIcons name={iconName} size={24} color={color} style={styles.dropdownIcon} />
      <Text style={styles.dropdownItemText}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <TouchableOpacity onPressIn={onCardPressIn} onPressOut={onCardPressOut} onPress={onPress} activeOpacity={1}>
      <Animated.View style={[styles.card, { transform: [{ scale: scaleValue }] }]}>
        <Image source={{ uri: post?.images[0]?.image }} style={styles.image} />

        {/* Edit button */}
        <TouchableOpacity onPress={() => setDropdownVisible(!dropdownVisible)} style={styles.editButton} activeOpacity={0.8}>
          <CustomText style={styles.editButtonText}>Actions</CustomText>
          <MaterialIcons name="expand-more" size={24} color="#595959" />
        </TouchableOpacity>

        {/* Dropdown Menu */}
        {dropdownVisible && (
          <View style={styles.dropdownMenu}>
            <DropdownItem iconName="edit" label="Edit" onPress={handleEdit} />
            <DropdownItem iconName="delete" label="Delete" onPress={handleDelete} color={"#f73e47"}/>
          </View>
    )}

        <View style={styles.content}>
          <CustomText style={styles.title}>{post.title}</CustomText>
          <CustomText style={styles.description}>{shortenText(post.content)}</CustomText>
        </View>
      </Animated.View>
    </TouchableOpacity>
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
    height: 200, // Reduced image height
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
    top: 40, // Adjust this value as needed
    right: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 1000, // Ensure the dropdown is above other elements
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
});

export default PostCard;
