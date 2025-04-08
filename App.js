import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from './config';

// Import screens
import InfluencerFeedScreen from './screens/InfluencerFeedScreen';
import MealPlansScreen from './screens/MealPlansScreen';
import ProfileScreen from './screens/ProfileScreen';
import FoodLogScreen from './screens/FoodLogScreen';
import OrderIngredientsScreen from './screens/OrderIngredientsScreen';
import MealDetailScreen from './screens/MealDetailScreen';
import InfluencerProfileScreen from './screens/InfluencerProfileScreen';
import ConfigScreen from './screens/ConfigScreen';
import AuthScreen from './screens/AuthScreen';

// Navigation setup
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Custom tab bar button for the center button
const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      top: -20,
      justifyContent: 'center',
      alignItems: 'center',
    }}
    onPress={onPress}
  >
    <View
      style={{
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: THEME.COLORS.PRIMARY,
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);

// Main tab navigator
function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'InfluencerFeed') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'MealPlans') {
            iconName = focused ? 'restaurant' : 'restaurant-outline';
          } else if (route.name === 'FoodLog') {
            iconName = 'add';
            return (
              <Ionicons name={iconName} size={30} color="#FFF" />
            );
          } else if (route.name === 'OrderIngredients') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={24} color={color} />;
        },
        tabBarActiveTintColor: THEME.COLORS.PRIMARY,
        tabBarInactiveTintColor: THEME.COLORS.TEXT_SECONDARY,
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          height: 60
        },
      })}
    >
      <Tab.Screen
        name="InfluencerFeed"
        component={InfluencerFeedScreen}
        options={{
          tabBarLabel: 'Influencers',
        }}
      />
      <Tab.Screen
        name="MealPlans"
        component={MealPlansScreen}
        options={{
          tabBarLabel: 'Meal Plans',
        }}
      />
      <Tab.Screen
        name="FoodLog"
        component={FoodLogScreen}
        options={{
          tabBarLabel: '',
          tabBarButton: (props) => (
            <CustomTabBarButton {...props} />
          ),
        }}
      />
      <Tab.Screen
        name="OrderIngredients"
        component={OrderIngredientsScreen}
        options={{
          tabBarLabel: 'Order',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
}

// Main stack navigator
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Set to true for development

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <>
            <Stack.Screen name="Main" component={MainTabNavigator} />
            <Stack.Screen name="MealDetail" component={MealDetailScreen} />
            <Stack.Screen name="InfluencerProfile" component={InfluencerProfileScreen} />
            <Stack.Screen name="Config" component={ConfigScreen} />
          </>
        ) : (
          <Stack.Screen name="Auth" component={AuthScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
