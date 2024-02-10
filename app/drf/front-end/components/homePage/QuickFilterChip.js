// QuickFilterChip.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const QuickFilterChip = ({ label, isSelected, onSelect }) => {

  const handlePress = () => {
    onSelect(label);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.chip, isSelected ? styles.chipSelected : {}]}
    >
      <Text style={[styles.chipText, isSelected ? styles.chipTextSelected : {}]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: 'white',
    marginRight: 8,
    elevation:3
  },
  chipSelected: {
    backgroundColor: '#3381ff',
  },
  chipText: {
    color: '#000',
  },
  chipTextSelected: {
    color: '#fff',
  },
});

export default QuickFilterChip;
