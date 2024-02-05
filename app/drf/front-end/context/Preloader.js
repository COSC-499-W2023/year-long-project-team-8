import React from 'react';
import LottieView from 'lottie-react-native';
import { View, StyleSheet } from 'react-native';
import CustomText from '../components/CustomText';

const Preloader = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/loader.json')} 
        autoPlay
        loop
        style={styles.loader}
      />
      <CustomText fontType={"text"} style={styles.text}>LOADING...</CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000, 
  },
  loader:{
    width:200,
    height:200,
    marginLeft:10,
  },
  text:{
    fontSize:18,
    textAlign:"center",
    marginTop: -40, 

  }
});

export default Preloader;
