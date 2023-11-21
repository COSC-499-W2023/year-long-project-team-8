import React, {useContext, useEffect, useState} from 'react';
import { View, Text, Image, TouchableOpacity, Modal, TextInput, KeyboardAvoidingView, StyleSheet, ScrollView } from 'react-native';
import styles from './profilePageStyles'; // Make sure you import your styles correctly
import { getUserData, updateUserData } from '../helperFunctions/apiHelpers'; // Import functions
import AuthContext from '../../context/AuthContext' // Import AuthContext

const ProfilePage = () => {
  const { authTokens, userId } = useContext(AuthContext);

  const [userData, setUserData] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    getUserData(userId, authTokens)
      .then((data) => {
        setUserData(data);
        console.log("User Data:", data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [userId, authTokens]);

  const handleOpenDetailsModal = () => {
    setShowDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
  };

  const handleSaveDetails = () => {
    // Update user data with the new details
    updateUserData(userId, authTokens, { firstname, lastname, phone })
      .then(() => {
        // Fetch and update the user data after saving details
        getUserData(userId, authTokens)
          .then((data) => {
            setUserData(data);
            console.log("User Data updated:", data);
          })
          .catch((error) => {
            console.error("Error fetching updated user data:", error);
          });
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
      });

    // Close the details modal
    setShowDetailsModal(false);
  };

  return (
    <View style={styles.container}>
      {/* holds the background image */}
      <Image
        source={require('../../assets/images/profilePage/background.png')}
        style={styles.headerImage}
      />
      {/* settings button */}
      {/* TODO: make the settings button clickable and actually do something */}
      <TouchableOpacity style={styles.settingsButton}>
        {/* settings button image */}
        <Image
          source={require('../../assets/images/profilePage/settings.png')}
          style={styles.settingsIcon}
        />
      </TouchableOpacity>
      {/* star rating system */}
      {/*TODO: change the star style and allow them to be half stars*/}
      <View style={styles.ratingContainer}>
        <Text style={styles.star}>⭐⭐⭐⭐⭐</Text>
      </View>

      {/* main container golding the profile information */}
      <View style={styles.profileContainer}>
        {/* profile picture */}
        <Image
          source={require('../../assets/images/profilePage/pfp.png')}
          style={styles.profilePicture}
        />
        {/* Greeting text */}
        <Text style={styles.name}>
        {userData?.firstname
          ? `Hello, ${userData.firstname}!`
          : 'Hello! Complete details below'}
        </Text>
        <Text style={styles.location}>
        {userData?.email
          ? userData.email
          : ''}
        </Text>
        <Text style={styles.location}>
        {userData?.phone
          ? userData.phone
          : ''}
        </Text>

        {/*adding button for details update*/}

      {/* Add Details button */}
      {(
        <TouchableOpacity onPress={handleOpenDetailsModal}>
          <Text style={styles.location}>Add Details</Text>
        </TouchableOpacity>
      )}
        
      {/* Details Modal */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={showDetailsModal}
        onRequestClose={handleCloseDetailsModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Details</Text>
            <TextInput
              placeholder="First Name"
              style={styles.inputField}
              value={firstname}
              onChangeText={(text) => setFirstname(text)}
            />
            <TextInput
              placeholder="Last Name"
              style={styles.inputField}
              value={lastname}
              onChangeText={(text) => setLastname(text)}
            />
            <TextInput
              placeholder="Phone"
              style={styles.inputField}
              value={phone}
              onChangeText={(text) => setPhone(text)}
            />
            <TouchableOpacity onPress={handleSaveDetails} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save Details</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCloseDetailsModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

        {/* users location */}
        <View style={styles.locationContainer}>
          <Image
            source={require('../../assets/images/profilePage/location.png')}
            style={styles.locationIcon}
          />
          <Text style={styles.location}>Kelowna, BC</Text>
        </View>
      </View>

      {/* container that holds all the recent posts */}
      <View style={styles.centeredPostsContainer}>
        <Text style={styles.recentPostsText}>Recent Posts</Text>
        {/* scrollview allows users to horizontally scroll the recent posts (max will be 10) */}
        {/* TODO: change this to an array that can show the most recent posts by a user */}
        <ScrollView
          horizontal
          style={styles.postsContainer}
          showsHorizontalScrollIndicator={false}
        >
          {/* containers where the actual posts are located */}
          <View style={styles.postContainer}>
            <View style={styles.post}>
            </View>
          </View>
          <View style={styles.postContainer}>
            <View style={styles.post}>
            </View>
          </View>
          <View style={styles.postContainer}>
            <View style={styles.post}>
            </View>
          </View>
          <View style={styles.postContainer}>
            <View style={styles.post}>
            </View>
          </View>
          <View style={styles.postContainer}>
            <View style={styles.post}>
            </View>
          </View>
          <View style={styles.postContainer}>
            <View style={styles.post}>
            </View>
          </View>
          <View style={styles.postContainer}>
            <View style={styles.post}>
            </View>
          </View>
        </ScrollView>
        {/* view all button */}
        {/* TODO: make this button actually take the user to a page where all of their posts are */}
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllButtonText}>View All</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfilePage;
