import React from 'react';
import { View } from 'react-native';
import CustomText from '../CustomText';
import Chips from './Chips';
import styles from './styles';

const CategoriesSelector = ({ availableCategories, selectedCategories, toggleCategory }) => {
  return (
    <View style={styles.section}>
      <CustomText style={styles.title}>Categories</CustomText>
      <View style={styles.quickFiltersContainer}>
        {availableCategories.map((category) => (
          <Chips
            key={category}
            label={category}
            isSelected={selectedCategories.includes(category)}
            onSelect={() => toggleCategory(category)}
          />
        ))}
      </View>
    </View>
  );
};

export default CategoriesSelector;
