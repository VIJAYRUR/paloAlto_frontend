import React from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';

const ActivityIndicatorExample = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ActivityIndicator Examples</Text>
      
      <View style={styles.row}>
        <Text>Small (default):</Text>
        <ActivityIndicator />
      </View>
      
      <View style={styles.row}>
        <Text>Small with color:</Text>
        <ActivityIndicator color="#4CAF50" />
      </View>
      
      <View style={styles.row}>
        <Text>Size as number (36):</Text>
        <ActivityIndicator size={36} color="#4CAF50" />
      </View>
      
      <View style={styles.row}>
        <Text>Size as number (50):</Text>
        <ActivityIndicator size={50} color="#4CAF50" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 10,
  },
});

export default ActivityIndicatorExample;
