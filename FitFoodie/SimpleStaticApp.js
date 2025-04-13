import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';

// Simple static app with manual tab switching
export default function SimpleStaticApp() {
  const [activeTab, setActiveTab] = useState('home');
  
  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeContent />;
      case 'meals':
        return <MealsContent />;
      case 'profile':
        return <ProfileContent />;
      default:
        return <HomeContent />;
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {renderContent()}
      </View>
      
      {/* Custom tab bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={styles.tabItem} 
          onPress={() => setActiveTab('home')}
        >
          <Text style={[
            styles.tabText, 
            activeTab === 'home' && styles.activeTabText
          ]}>
            Home
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.tabItem} 
          onPress={() => setActiveTab('meals')}
        >
          <Text style={[
            styles.tabText, 
            activeTab === 'meals' && styles.activeTabText
          ]}>
            Meals
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.tabItem} 
          onPress={() => setActiveTab('profile')}
        >
          <Text style={[
            styles.tabText, 
            activeTab === 'profile' && styles.activeTabText
          ]}>
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// Home tab content
const HomeContent = () => (
  <ScrollView style={styles.scrollView}>
    <View style={styles.header}>
      <Text style={styles.headerTitle}>FitFoodie</Text>
      <Text style={styles.headerSubtitle}>Discover influencer meals</Text>
    </View>
    
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Featured Meal</Text>
      <View style={styles.card}>
        <View style={styles.mealImagePlaceholder}>
          <Text style={styles.placeholderText}>Meal Image</Text>
        </View>
        <Text style={styles.mealTitle}>Healthy Breakfast Bowl</Text>
        <Text style={styles.influencerName}>by FitChef</Text>
        
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
    </View>
    
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Trending Influencers</Text>
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

// Meals tab content
const MealsContent = () => (
  <ScrollView style={styles.scrollView}>
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Meals</Text>
      <Text style={styles.headerSubtitle}>Discover healthy recipes</Text>
    </View>
    
    <View style={styles.section}>
      <View style={styles.card}>
        <View style={styles.mealImagePlaceholder}>
          <Text style={styles.placeholderText}>Meal Image</Text>
        </View>
        <Text style={styles.mealTitle}>Protein-Packed Breakfast Bowl</Text>
        <Text style={styles.influencerName}>by FitChef</Text>
        
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
      
      <View style={styles.card}>
        <View style={styles.mealImagePlaceholder}>
          <Text style={styles.placeholderText}>Meal Image</Text>
        </View>
        <Text style={styles.mealTitle}>Green Smoothie Bowl</Text>
        <Text style={styles.influencerName}>by NutritionGuru</Text>
        
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
    </View>
  </ScrollView>
);

// Profile tab content
const ProfileContent = () => (
  <ScrollView style={styles.scrollView}>
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Profile</Text>
    </View>
    
    <View style={styles.profileHeader}>
      <View style={styles.profileAvatar}>
        <Text style={styles.profileAvatarText}>AJ</Text>
      </View>
      <Text style={styles.profileName}>Alex Johnson</Text>
      <Text style={styles.profileEmail}>alex@example.com</Text>
    </View>
    
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Physical Profile</Text>
      <View style={styles.card}>
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
    </View>
    
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Dietary Preferences</Text>
      <View style={styles.card}>
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
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
  mealTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  influencerName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
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
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    height: 50,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  profileHeader: {
    alignItems: 'center',
    padding: 20,
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
