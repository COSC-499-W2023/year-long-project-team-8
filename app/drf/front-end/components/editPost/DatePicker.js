// DatePicker.js
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import CustomText from '../CustomText';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './styles';

const DatePicker = ({ bestBefore, setBestBefore, selectedDate, handleDateChange, showDatePicker, isDatePickerVisible, minimumDate }) => {
  return (
    <View style={styles.section}>
      <CustomText style={styles.title}>Expiration Date</CustomText>
      <View style={styles.datePicker}>
        <CustomText style={styles.datePickerText} fontType={'text'}>Change Expiration Date</CustomText>
        <TouchableOpacity style={styles.changeDateButtonContainer} onPress={showDatePicker}> 
          <CustomText style={styles.bestBeforeDate}>{bestBefore}</CustomText>
          <MaterialIcons name="arrow-forward-ios" size={20} color="#000" />
        </TouchableOpacity>
      </View>
      {isDatePickerVisible && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
          minimumDate={minimumDate}  
        />
      )}
    </View>
  );
};


export default DatePicker;
