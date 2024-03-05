import React from 'react';
import { View } from 'react-native';
import CustomText from '../CustomText';
import Chips from './Chips';
import styles from './styles';

const AllergensSelector = ({ availableAllergens, selectedAllergens, toggleAllergen }) => {
  return (
    <View style={styles.section}>
      <CustomText style={styles.title}>Allergens</CustomText>
      <View style={styles.quickFiltersContainer}>
        {availableAllergens.map((allergen) => (
          <Chips
            key={allergen}
            label={allergen}
            isSelected={selectedAllergens.includes(allergen)}
            onSelect={() => toggleAllergen(allergen)}
          />
        ))}
      </View>
    </View>
  );
};

export default AllergensSelector;
