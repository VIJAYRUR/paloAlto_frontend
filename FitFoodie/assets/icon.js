// This is a placeholder for the app icon
// In a real app, you would use a proper image file

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { THEME } from '../config';

const AppIcon = ({ size = 100 }) => {
  return (
    <View style={[styles.container, { width: size, height: size, borderRadius: size / 2 }]}>
      <Text style={[styles.text, { fontSize: size * 0.4 }]}>FF</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default AppIcon;
