import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles'; 
import CustomText from '../CustomText';

const AllergensComponent = ({ allergens }) => {

    const formatWithSpacesAfterCommas = (text) => {
        if (!text) return '';
        return Array.isArray(text) ? text.join(', ') : text.split(',').join(', ');
      };

  if (!allergens || allergens.length === 0) return null;

  return (
    <View style={styles.allergenContainer}>
      <CustomText style={styles.allergenTitle} fontType={"title"}>Allergens</CustomText>
      <View style={styles.allergensList}>
          <CustomText fontType={"text"} style={styles.allergenText}>
                {formatWithSpacesAfterCommas(allergens)}
        </CustomText>
      </View>
    </View>
  );
};

export default AllergensComponent;
