import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import styles from './profilePageStyles'; // Make sure you import your styles correctly

const ProfilePage = () => {
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
        {/* users name */}
        <Text style={styles.name}>Brandon Mack</Text>

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
