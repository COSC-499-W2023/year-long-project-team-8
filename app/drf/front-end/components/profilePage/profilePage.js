import React from 'react';
import {View, Text, Image, TouchableOpacity, SafeAreaView, StatusBar} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


import loginStyles from './profilePageStyles.js';
import login from "../loginSignup/Login";

const ProfilePage = () => {
  return (

            <SafeAreaView style={loginStyles.safeArea}>
                <View style={loginStyles.topHalf}>
                    <Text style={loginStyles.usernameText}> @username </Text>
                    <View style={loginStyles.topBox}/>
                    <View style={loginStyles.bottomHalf}/>
                        <View style={loginStyles.circle}/>
                        <Image style={loginStyles.profilePicture} source={require('../../assets/images/dummyPFP/pfp.png')} />

                </View>
            </SafeAreaView>
  );
};

export default ProfilePage;
