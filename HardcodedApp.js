import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';

// Completely static app with hardcoded values
export default function HardcodedApp() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>FitFoodie</Text>
          <Text style={styles.headerSubtitle}>Discover influencer meals</Text>
        </View>
        
        <View style={styles.featuredSection}>
          <Text style={styles.sectionTitle}>Featured Meals</Text>
          <View style={styles.featuredItem}>
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
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Order Ingredients</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.saveButton]}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
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
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Recommendations</Text>
          <View style={styles.recommendationItem}>
            <Text style={styles.recommendationTitle}>Daily Plan</Text>
            <View style={styles.mealImagePlaceholder}>
              <Text style={styles.placeholderText}>Meal Plan Image</Text>
            </View>
            <Text style={styles.recommendationDescription}>
              Based on your profile, we recommend meals high in protein and moderate in carbs.
            </Text>
            <TouchableOpacity style={styles.viewButton}>
              <Text style={styles.viewButtonText}>View Plan</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.tabBar}>
          <TouchableOpacity style={styles.tabItem}>
            <View style={styles.tabIconPlaceholder}>
              <Text style={styles.tabIconText}>H</Text>
            </View>
            <Text style={[styles.tabLabel, styles.activeTabLabel]}>Home</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.tabItem}>
            <View style={styles.tabIconPlaceholder}>
              <Text style={styles.tabIconText}>M</Text>
            </View>
            <Text style={styles.tabLabel}>Meals</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.tabItem}>
            <View style={styles.tabIconPlaceholder}>
              <Text style={styles.tabIconText}>R</Text>
            </View>
            <Text style={styles.tabLabel}>Recs</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.tabItem}>
            <View style={styles.tabIconPlaceholder}>
              <Text style={styles.tabIconText}>P</Text>
            </View>
            <Text style={styles.tabLabel}>Profile</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  featuredSection: {
    padding: 20,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  featuredItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
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
    marginBottom: 5,
  },
  influencerName: {
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
    marginBottom: 15,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#4CAF50',
    marginRight: 0,
  },
  saveButtonText: {
    color: '#4CAF50',
    fontWeight: 'bold',
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
  recommendationItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recommendationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  recommendationDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  viewButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingVertical: 10,
    marginTop: 20,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
  },
  tabIconPlaceholder: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  tabIconText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
  },
  tabLabel: {
    fontSize: 12,
    color: '#666',
  },
  activeTabLabel: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});
