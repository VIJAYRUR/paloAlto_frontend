import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import App from './App';

// This is a wrapper component that will catch any errors
export default function AppWrapper() {
  try {
    return <App />;
  } catch (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorTitle}>Error</Text>
        <Text style={styles.errorMessage}>{error.message}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 10,
  },
  errorMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
