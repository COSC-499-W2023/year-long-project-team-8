import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons'; 
import { HeaderData } from './ThemeTypes';
import CustomText from '../CustomText';

const Header: React.FC<HeaderData> = ({ view, goToAlbum, imagesPicked, save, totalAllowed, cancel }) => {
  return (
    <View
      style={{
        paddingLeft: 10,
        height: 60,
        width: '100%',
        backgroundColor: '#252f39',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {view === 'album' && (
        <>
          <CustomText style={{ color: 'white', fontSize: 20 }} fontType={"text"}>Select an album</CustomText>
          <TouchableOpacity onPress={cancel} style={{ paddingRight: 10 }}>
            <IonIcon name="close" size={30} color="#EDF8F5" />
          </TouchableOpacity>
        </>
      )}
      {view === 'gallery' && (
        <>
          <TouchableOpacity onPress={goToAlbum}>
            <IonIcon name="arrow-back" size={30} color="#EDF8F5" />
          </TouchableOpacity>
          {imagesPicked > 0 && (
            <>
              <CustomText style={{ color: 'white', fontSize: 20 }} fontType={"text"}>
                {`${imagesPicked} of ${totalAllowed} selected`}
              </CustomText>
              <TouchableOpacity onPress={save} style={{padding:10}}>
                <CustomText style={{ color: 'white', fontSize: 18 }} fontType={"text"}>OK</CustomText>
              </TouchableOpacity>
            </>
          )}
        </>
      )}
    </View>
  );
};

export default Header;
