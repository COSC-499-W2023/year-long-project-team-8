import React from 'react';
import { View } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather'; 

const Check: React.FC = () => {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)',
      }}
    >
      <FeatherIcon name="check" size={32} color="white" />
    </View>
  );
};

export default Check;
