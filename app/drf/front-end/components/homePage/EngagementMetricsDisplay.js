// EngagementMetricsDisplay.js
import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import CustomText from '../CustomText';
import numeral from 'numeral';

// Placeholder function to simulate fetching data from an API
const getEngagementMetrics = async (authTokens) => {
  // Simulate API call with a promise that resolves to mock data
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        totalPeopleHelped: 1434,
        totalFoodSaved: 5678,
      });
    }, 1000);
  });
};

const EngagementMetricsDisplay = ({ authTokens }) => {
  const [metrics, setMetrics] = useState({
    totalPeopleHelped: 0,
    totalFoodSaved: 0
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const metricsData = await getEngagementMetrics(authTokens);
        setMetrics(metricsData);
      } catch (error) {
        console.error('Error fetching engagement metrics:', error);
      }
    };

    fetchMetrics();
  }, [authTokens]);

  const formattedPeopleHelped = numeral(metrics.totalPeopleHelped).format('0,0');
  const formattedFoodSaved = numeral(metrics.totalFoodSaved).format('0,0');

  return (
    <View style={styles.container}>
      <View style={styles.metricItem}>
        <Image
          source={require('../../assets/icons/people.png')}
          style={styles.icon}
        />
        <CustomText style={styles.text} fontType={'subHeader'}>
          {formattedPeopleHelped}
        </CustomText>
        <CustomText style={styles.text} fontType={'subHeader'}>
          People Helped
        </CustomText>
      </View>
      <View style={styles.metricItem}>
        <Image
          source={require('../../assets/icons/breakfast.png')}
          style={styles.icon}
        />
        <CustomText style={styles.text} fontType={'subHeader'}>
          {formattedFoodSaved}
        </CustomText>
        <CustomText style={styles.text} fontType={'subHeader'}>
          Plates Saved
        </CustomText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex:1,
      flexDirection: 'row',
      justifyContent:"space-around",
      alignItems: 'center',
      paddingVertical: 5, 
      marginHorizontal:10,
    },
    metricItem: {
      alignItems: 'center',
      justifyContent: "center",
    },
    icon: {
      width: 40, 
      height: 40,
    },
    text: {
      marginTop: 2,
      fontSize: 13, 
      textAlign: 'center',
    },
  });
  

export default EngagementMetricsDisplay;
