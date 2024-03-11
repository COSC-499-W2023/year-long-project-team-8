import React from 'react';
import { View, Image, ScrollView } from 'react-native';
import CustomText from '../CustomText'; 
import styles from './styles'; 
import { categoryIcons } from '../Categories'; 

const CategoriesComponent = ({ categories }) => {
  return (
    <View style={styles.categoryContainer}>
      <CustomText fontType={"title"} style={styles.giverTitle}>Categories</CustomText>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -10 }}>
        <View style={styles.detailRow}>
          {categories && typeof categories === 'string' && categories.split(',').map((category, index) => (
            <View key={index} style={styles.categoryItem}>
              <Image
                source={categoryIcons[category.trim()]}
                style={styles.categoryIcon}
              />
              <CustomText fontType={"text"} style={styles.categoryText}>
                {category.trim()}
              </CustomText>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default CategoriesComponent;
