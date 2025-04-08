import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';

// Main app component with manual tab navigation
export default function FinalStaticApp() {
  const [activeTab, setActiveTab] = useState('home');
  
  // Render the active screen based on the selected tab
  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'meals':
        return <MealsScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      {/* Main content area */}
      <View style={styles.content}>
        {renderScreen()}
      </View>
      
      {/* Custom tab bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => setActiveTab('home')}
        >
          <Text style={[
            styles.tabLabel,
            { color: activeTab === 'home' ? '#4CAF50' : 'gray' }
          ]}>
            Home
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => setActiveTab('meals')}
        >
          <Text style={[
            styles.tabLabel,
            { color: activeTab === 'meals' ? '#4CAF50' : 'gray' }
          ]}>
            Meals
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => setActiveTab('profile')}
        >
          <Text style={[
            styles.tabLabel,
            { color: activeTab === 'profile' ? '#4CAF50' : 'gray' }
          ]}>
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// Home screen component
const HomeScreen = () => (
  <ScrollView contentContainerStyle={styles.screenContent}>
    <View style={styles.header}>
      <Text style={styles.title}>FitFoodie</Text>
      <Text style={styles.subtitle}>Discover influencer meals</Text>
    </View>
    
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Featured Meal</Text>
      <View style={styles.mealImagePlaceholder}>
        <Text style={styles.placeholderText}>Meal Image</Text>
      </View>
      <Text style={styles.mealName}>Healthy Breakfast Bowl</Text>
      <Text style={styles.influencerName}>by FitChef</Text>
    </View>
    
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Trending Influencers</Text>
      <View style={styles.influencersRow}>
        <View style={styles.influencerItem}>
          <View style={styles.influencerAvatar}>
            <Text style={styles.avatarText}>FC</Text>
          </View>
          <Text style={styles.influencerItemName}>FitChef</Text>
        </View>
        <View style={styles.influencerItem}>
          <View style={styles.influencerAvatar}>
            <Text style={styles.avatarText}>NG</Text>
          </View>
          <Text style={styles.influencerItemName}>NutritionGuru</Text>
        </View>
        <View style={styles.influencerItem}>
          <View style={styles.influencerAvatar}>
            <Text style={styles.avatarText}>HE</Text>
          </View>
          <Text style={styles.influencerItemName}>HealthyEats</Text>
        </View>
      </View>
    </View>
  </ScrollView>
);

// Meals screen component
const MealsScreen = () => (
  <ScrollView contentContainerStyle={styles.screenContent}>
    <View style={styles.header}>
      <Text style={styles.title}>Meals</Text>
      <Text style={styles.subtitle}>Discover healthy recipes</Text>
    </View>
    
    <View style={styles.mealCard}>
      <Text style={styles.mealCardTitle}>Protein-Packed Breakfast Bowl</Text>
      <Text style={styles.mealCardInfluencer}>by FitChef</Text>
      <View style={styles.mealImagePlaceholder}>
        <Text style={styles.placeholderText}>Meal Image</Text>
      </View>
      <Text style={styles.mealCardDescription}>
        Start your day with this nutrient-dense breakfast bowl!
      </Text>
      <View style={styles.macrosContainer}>
        <View style={styles.macroItem}>
          <Text style={styles.macroValue}>450</Text>
          <Text style={styles.macroLabel}>Calories</Text>
        </View>
        <View style={styles.macroItem}>
          <Text style={styles.macroValue}>30g</Text>
          <Text style={styles.macroLabel}>Protein</Text>
        </View>
        <View style={styles.macroItem}>
          <Text style={styles.macroValue}>45g</Text>
          <Text style={styles.macroLabel}>Carbs</Text>
        </View>
        <View style={styles.macroItem}>
          <Text style={styles.macroValue}>15g</Text>
          <Text style={styles.macroLabel}>Fat</Text>
        </View>
      </View>
    </View>
    
    <View style={styles.mealCard}>
      <Text style={styles.mealCardTitle}>Green Smoothie Bowl</Text>
      <Text style={styles.mealCardInfluencer}>by NutritionGuru</Text>
      <View style={styles.mealImagePlaceholder}>
        <Text style={styles.placeholderText}>Meal Image</Text>
      </View>
      <Text style={styles.mealCardDescription}>
        Packed with vitamins and antioxidants to boost your immune system.
      </Text>
      <View style={styles.macrosContainer}>
        <View style={styles.macroItem}>
          <Text style={styles.macroValue}>320</Text>
          <Text style={styles.macroLabel}>Calories</Text>
        </View>
        <View style={styles.macroItem}>
          <Text style={styles.macroValue}>12g</Text>
          <Text style={styles.macroLabel}>Protein</Text>
        </View>
        <View style={styles.macroItem}>
          <Text style={styles.macroValue}>60g</Text>
          <Text style={styles.macroLabel}>Carbs</Text>
        </View>
        <View style={styles.macroItem}>
          <Text style={styles.macroValue}>8g</Text>
          <Text style={styles.macroLabel}>Fat</Text>
        </View>
      </View>
    </View>
  </ScrollView>
);

// Profile screen component
const ProfileScreen = () => (
  <ScrollView contentContainerStyle={styles.screenContent}>
    <View style={styles.profileHeader}>
      <View style={styles.profileAvatar}>
        <Text style={styles.profileAvatarText}>AJ</Text>
      </View>
      <Text style={styles.profileName}>Alex Johnson</Text>
      <Text style={styles.profileEmail}>alex@example.com</Text>
    </View>
    
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Physical Profile</Text>
      <View style={styles.profileInfoRow}>
        <Text style={styles.profileInfoLabel}>Height</Text>
        <Text style={styles.profileInfoValue}>5'10"</Text>
      </View>
      <View style={styles.profileInfoRow}>
        <Text style={styles.profileInfoLabel}>Weight</Text>
        <Text style={styles.profileInfoValue}>165 lbs</Text>
      </View>
      <View style={styles.profileInfoRow}>
        <Text style={styles.profileInfoLabel}>Age</Text>
        <Text style={styles.profileInfoValue}>28</Text>
      </View>
      <View style={styles.profileInfoRow}>
        <Text style={styles.profileInfoLabel}>Activity Level</Text>
        <Text style={styles.profileInfoValue}>Moderate</Text>
      </View>
    </View>
    
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Dietary Preferences</Text>
      <View style={styles.tagsContainer}>
        <View style={styles.tag}>
          <Text style={styles.tagText}>Low Carb</Text>
        </View>
        <View style={styles.tag}>
          <Text style={styles.tagText}>High Protein</Text>
        </View>
        <View style={styles.tag}>
          <Text style={styles.tagText}>Gluten Free</Text>
        </View>
      </View>
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  content: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  screenContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  mealImagePlaceholder: {
    height: 150,
    backgroundColor: '#eee',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  placeholderText: {
    color: '#999',
  },
  mealName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  influencerName: {
    fontSize: 14,
    color: '#666',
  },
  influencersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  influencerItem: {
    alignItems: 'center',
  },
  influencerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  avatarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  influencerItemName: {
    fontSize: 12,
  },
  mealCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mealCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  mealCardInfluencer: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  mealCardDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  macrosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 10,
  },
  macroItem: {
    alignItems: 'center',
  },
  macroValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  macroLabel: {
    fontSize: 12,
    color: '#666',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileAvatarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 36,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileEmail: {
    fontSize: 16,
    color: '#666',
  },
  profileInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  profileInfoLabel: {
    fontSize: 16,
    color: '#666',
  },
  profileInfoValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#E8F5E9',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 5,
  },
  tagText: {
    color: '#4CAF50',
    fontWeight: '500',
  },
});
