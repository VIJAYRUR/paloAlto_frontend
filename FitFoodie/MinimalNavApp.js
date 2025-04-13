import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Simple screen components
const HomeScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.text}>Home Screen</Text>
  </View>
);

const ProfileScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.text}>Profile Screen</Text>
  </View>
);

// Create tab navigator
const Tab = createBottomTabNavigator();

// Main app component
export default function MinimalNavApp() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          // Use static values for all options
          tabBarActiveTintColor: '#4CAF50',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
          // Explicitly set tabBarIcon to null to avoid any icon rendering
          tabBarIcon: () => null,
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
