import React from 'react';
import { View } from 'react-native';
import CustomText from '../CustomText'; 
import styles from './styles'; 

const DescriptionComponent = ({ content, showFullDescription, setShowFullDescription }) => {
  return (
    <View style={styles.descriptionContainer}>
      <CustomText fontType={"title"} style={styles.giverTitle}>
        Description
      </CustomText>
      <CustomText fontType={"text"} style={styles.descriptionText}>
        {showFullDescription || content.length <= 100
          ? content
          : `${content.substring(0, 100)}... `}
        {content.length > 100 && (
          <CustomText
            onPress={() => setShowFullDescription(!showFullDescription)}
            style={styles.viewMoreText}>
            {showFullDescription ? ' See Less' : ' See More'}
          </CustomText>
        )}
      </CustomText>
    </View>
  );
};  

export default DescriptionComponent;
