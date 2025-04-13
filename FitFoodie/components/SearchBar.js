import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../config';

/**
 * SearchBar - A reusable search component
 * 
 * @param {String} value - The current search text
 * @param {Function} onChangeText - Function to call when text changes
 * @param {Function} onSubmit - Function to call when search is submitted
 * @param {String} placeholder - Placeholder text for the search input
 * @param {Function} onClear - Function to call when the clear button is pressed
 */
const SearchBar = ({ 
  value, 
  onChangeText, 
  onSubmit, 
  placeholder = 'Search...', 
  onClear 
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons 
          name="search" 
          size={20} 
          color={THEME.COLORS.TEXT_SECONDARY} 
          style={styles.searchIcon} 
        />
        
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={THEME.COLORS.TEXT_SECONDARY}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmit}
          returnKeyType="search"
          clearButtonMode="while-editing"
          autoCapitalize="none"
          autoCorrect={false}
        />
        
        {value ? (
          <TouchableOpacity onPress={onClear} style={styles.clearButton}>
            <Ionicons 
              name="close-circle" 
              size={18} 
              color={THEME.COLORS.TEXT_SECONDARY} 
            />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: THEME.BORDER_RADIUS.MEDIUM,
    paddingHorizontal: 12,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: THEME.SIZES.MEDIUM,
    color: THEME.COLORS.TEXT,
    height: '100%',
  },
  clearButton: {
    padding: 4,
  },
});

export default SearchBar;
