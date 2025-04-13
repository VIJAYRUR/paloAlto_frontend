import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from 'react-native';

// A completely static app with no navigation or ActivityIndicator
export default function StaticApp() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>FitFoodie</Text>
          <Text style={styles.subtitle}>Static Version</Text>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Featured Meal</Text>
          <View style={styles.mealImagePlaceholder}>
            <Text style={styles.placeholderText}>Meal Image</Text>
          </View>
          <Text style={styles.mealName}>Healthy Breakfast Bowl</Text>
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
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Your Recommendations</Text>
          <Text style={styles.recommendationText}>
            Based on your profile, we recommend meals high in protein and moderate in carbs.
          </Text>
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>FitFoodie - Static Version</Text>
          <Text style={styles.footerText}>No navigation or dynamic components</Text>
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
  scrollContent: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
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
  recommendationText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  footer: {
    marginTop: 20,
    marginBottom: 40,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#999',
  },
});
