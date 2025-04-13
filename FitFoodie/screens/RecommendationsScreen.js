import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import LoadingIndicator from '../components/LoadingIndicator';

// Sample recommendation data
const SAMPLE_RECOMMENDATIONS = [
  {
    id: '1',
    title: 'Breakfast',
    meal: 'Greek Yogurt Parfait',
    description: 'Greek yogurt with berries, honey, and granola',
    macros: {
      calories: 320,
      protein: 20,
      carbs: 40,
      fat: 10
    },
    reason: 'High in protein to support your muscle gain goals'
  },
  {
    id: '2',
    title: 'Lunch',
    meal: 'Quinoa Salad Bowl',
    description: 'Quinoa with mixed vegetables, grilled chicken, and olive oil dressing',
    macros: {
      calories: 450,
      protein: 30,
      carbs: 45,
      fat: 15
    },
    reason: 'Balanced macros for sustained energy throughout the day'
  },
  {
    id: '3',
    title: 'Dinner',
    meal: 'Baked Salmon with Vegetables',
    description: 'Baked salmon fillet with roasted asparagus and sweet potatoes',
    macros: {
      calories: 480,
      protein: 35,
      carbs: 30,
      fat: 22
    },
    reason: 'Rich in omega-3 fatty acids and lean protein'
  },
  {
    id: '4',
    title: 'Snack',
    meal: 'Protein Smoothie',
    description: 'Protein powder, banana, almond milk, and spinach',
    macros: {
      calories: 220,
      protein: 25,
      carbs: 20,
      fat: 5
    },
    reason: 'Quick protein boost to support recovery'
  }
];

const MealRecommendation = ({ item }) => {
  return (
    <View style={styles.mealCard}>
      <View style={styles.mealHeader}>
        <Text style={styles.mealTime}>{item.title}</Text>
        <Text style={styles.mealName}>{item.meal}</Text>
      </View>

      <View style={styles.imagePlaceholder}>
        <Text style={styles.placeholderText}>Meal Image</Text>
      </View>

      <View style={styles.mealContent}>
        <Text style={styles.mealDescription}>{item.description}</Text>

        <View style={styles.macrosContainer}>
          <View style={styles.macrosGrid}>
            <View style={styles.macroItem}>
              <Text style={styles.macroValue}>{item.macros.calories}</Text>
              <Text style={styles.macroLabel}>Calories</Text>
            </View>
            <View style={styles.macroItem}>
              <Text style={styles.macroValue}>{item.macros.protein}g</Text>
              <Text style={styles.macroLabel}>Protein</Text>
            </View>
            <View style={styles.macroItem}>
              <Text style={styles.macroValue}>{item.macros.carbs}g</Text>
              <Text style={styles.macroLabel}>Carbs</Text>
            </View>
            <View style={styles.macroItem}>
              <Text style={styles.macroValue}>{item.macros.fat}g</Text>
              <Text style={styles.macroLabel}>Fat</Text>
            </View>
          </View>
        </View>

        <View style={styles.reasonContainer}>
          <Text style={styles.reasonTitle}>Why this works for you:</Text>
          <Text style={styles.reasonText}>{item.reason}</Text>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Order Ingredients</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.alternateButton]}>
            <Text style={styles.alternateButtonText}>See Alternatives</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const RecommendationsScreen = () => {
  const [activeTab, setActiveTab] = useState('daily');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simulate loading data
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [activeTab]);

  if (loading) {
    return <LoadingIndicator color="#4CAF50" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'daily' && styles.activeTab]}
          onPress={() => setActiveTab('daily')}
        >
          <Text style={[styles.tabText, activeTab === 'daily' && styles.activeTabText]}>Daily Plan</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'weekly' && styles.activeTab]}
          onPress={() => setActiveTab('weekly')}
        >
          <Text style={[styles.tabText, activeTab === 'weekly' && styles.activeTabText]}>Weekly Plan</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'grocery' && styles.activeTab]}
          onPress={() => setActiveTab('grocery')}
        >
          <Text style={[styles.tabText, activeTab === 'grocery' && styles.activeTabText]}>Grocery List</Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'daily' && (
        <>
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryTitle}>Today's Nutrition Summary</Text>
            <View style={styles.summaryGrid}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryValue}>1,470</Text>
                <Text style={styles.summaryLabel}>Calories</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryValue}>110g</Text>
                <Text style={styles.summaryLabel}>Protein</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryValue}>135g</Text>
                <Text style={styles.summaryLabel}>Carbs</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryValue}>52g</Text>
                <Text style={styles.summaryLabel}>Fat</Text>
              </View>
            </View>
          </View>

          <FlatList
            data={SAMPLE_RECOMMENDATIONS}
            renderItem={({ item }) => <MealRecommendation item={item} />}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />

          <TouchableOpacity style={styles.orderAllButton}>
            <Text style={styles.orderAllButtonText}>Order All Ingredients</Text>
          </TouchableOpacity>
        </>
      )}

      {activeTab === 'weekly' && (
        <View style={styles.comingSoonContainer}>
          <Text style={styles.comingSoonText}>Weekly meal planning coming soon!</Text>
        </View>
      )}

      {activeTab === 'grocery' && (
        <View style={styles.comingSoonContainer}>
          <Text style={styles.comingSoonText}>Grocery list feature coming soon!</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#4CAF50',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  summaryContainer: {
    backgroundColor: '#fff',
    padding: 15,
    margin: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  summaryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#666',
  },
  listContainer: {
    paddingHorizontal: 15,
    paddingBottom: 80,
  },
  mealCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  mealHeader: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  mealTime: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  mealName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  imagePlaceholder: {
    height: 150,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#999',
  },
  mealContent: {
    padding: 15,
  },
  mealDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  macrosContainer: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  macrosGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  reasonContainer: {
    marginBottom: 15,
  },
  reasonTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  reasonText: {
    fontSize: 14,
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  alternateButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#4CAF50',
    marginRight: 0,
  },
  alternateButtonText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  orderAllButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  orderAllButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  comingSoonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  comingSoonText: {
    fontSize: 18,
    color: '#666',
  },
});

export default RecommendationsScreen;
