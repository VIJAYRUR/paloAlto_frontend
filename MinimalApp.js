import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Absolute minimal app with no dependencies
export default function MinimalApp() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>FitFoodie</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
});
