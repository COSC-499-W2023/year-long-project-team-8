import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo'; 
import { AlbumData } from './ThemeTypes';
import CustomText from '../CustomText'; 

const Album: React.FC<AlbumData> = ({ thumb, album, goToGallery }) => {
  return (
    <TouchableOpacity onPress={() => goToGallery(album)} style={{ flex: 1, height: 200 }}>
      <Image source={{ uri: thumb.uri }} style={{ width: '100%', height: '100%' }} blurRadius={10} />
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          backgroundColor: 'rgba(0,0,0,0.2)',
          padding: 5,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <EntypoIcon name="folder" color="white" size={16} />
        <CustomText 
          fontType="text" 
          style={{ color: 'white', fontSize: 16, marginLeft: 5, flexShrink: 1 }} 
          numberOfLines={1} 
          ellipsizeMode="tail"
        >
          {album.title}
        </CustomText>
      </View>
    </TouchableOpacity>
  );
};

export default Album;
