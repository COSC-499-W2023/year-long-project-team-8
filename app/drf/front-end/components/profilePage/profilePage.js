import React from 'react';
import { View, Text, Image, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import loginStyles from './profilePageStyles.js';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ProfilePage = () => {
  return (
    <SafeAreaView style={loginStyles.safeArea}>
      <View style={loginStyles.background}>
        <View style={loginStyles.topHalf} />
        <View style={loginStyles.bottomHalf} />
        <View style={loginStyles.profilePictureContainer}>
          <Text style={loginStyles.profileTag}> Profile </Text>
          <View style={loginStyles.profileIconContainer}>

            <View>

                <Image
                  style={[loginStyles.profileIcons, {top: 30}]}
                  source={require('../../assets/images/profilePage/fork.png')}
                />
                <Image
                    style={[loginStyles.profileIcons, {top: 42.5, right: 82.5}]}
                    source={require('../../assets/images/profilePage/pizza.png')}
                />
                <Image
                  style={[loginStyles.profileIcons, {top: 55, right: 165 }]}
                  source={require('../../assets/images/profilePage/hamburger.png')}
                />
            </View>
            <View>
              <Image
                style={[loginStyles.profileIcons, { left: 170, bottom: 90 }]}
                source={require('../../assets/images/profilePage/chinese-food.png')}
              />
              <Image
                style={[loginStyles.profileIcons, { left: 92.5, bottom: 77.5 }]}
                source={require('../../assets/images/profilePage/kebab.png')}
              />
            </View>
            </View>
          <Image
            style={loginStyles.profilePicture}
            source={require('../../assets/images/profilePage/pfp.png')}
          />
        </View>
        <View style={loginStyles.mainContainer}>
          <Text style={loginStyles.userText}> Brandon Mack </Text>
          <View style={loginStyles.locContainer}>
            <Image
              style={loginStyles.locPng}
              source={require('../../assets/images/profilePage/location.png')}
            />
            <Text style={loginStyles.userLocation}> Kelowna, BC </Text>
          </View>
          <View style={loginStyles.contactInfoContainer}>
            <View style={loginStyles.contactPngContainer}>
              <Image style={loginStyles.emailPng} source={require('../../assets/images/profilePage/email.png')} />
              <Image style={loginStyles.phonePng} source={require('../../assets/images/profilePage/telephone.png')} />
            </View>
            <View style={loginStyles.contactTextContainer}>
              <Text style={loginStyles.email}> testuser@testuser.com </Text>
              <Text style={loginStyles.phone}> +1 (111) 111 - 1111</Text>
            </View>
          </View>
          <View style={loginStyles.postContainer}>
            <View style={[loginStyles.post, {right: 28}]}>
            <Text> sample post </Text>
            </View>
            <View style={loginStyles.post}>
              <Text> sample post </Text>
            </View>
            <View style={[loginStyles.post, {left: 28}]}>
              <Text> sample post </Text>
            </View>
          </View>
            <TouchableOpacity style={loginStyles.button}>
              <Text style={loginStyles.buttonText}> Edit Profile</Text>
            </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfilePage;
