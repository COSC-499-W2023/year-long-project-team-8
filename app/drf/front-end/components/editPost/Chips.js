// QuickFilterChip.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Chips = ({ label, isSelected, onSelect }) => {

  const handlePress = () => {
    onSelect(label);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.chip, isSelected ? styles.chipSelected : {}]}
      activeOpacity={0.8}
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
    backgroundColor: '#F5F0E5',
    marginRight: 8,
    marginBottom:8,
    elevation:3
  },
  chipSelected: {
    backgroundColor: '#fab650',
  },
  chipText: {
    color: '#000',
  },
  chipTextSelected: {
    color: '#fff',
  },
});

export default Chips;
