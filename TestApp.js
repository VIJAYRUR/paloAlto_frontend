import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function TestApp() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Test App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
