import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

const LoadingIndicator = ({ size = 'large', color = '#4CAF50' }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingIndicator;
