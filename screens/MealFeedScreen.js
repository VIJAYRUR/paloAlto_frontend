import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import LoadingIndicator from '../components/LoadingIndicator';

// Sample data for meal posts
const SAMPLE_MEALS = [
  {
    id: '1',
    title: 'Protein-Packed Breakfast Bowl',
    influencer: 'FitChef',
    description: 'Start your day with this nutrient-dense breakfast bowl!',
    macros: {
      calories: 450,
      protein: 30,
      carbs: 45,
      fat: 15
    },
    time: '2 hours ago'
  },
  {
    id: '2',
    title: 'Green Smoothie Bowl',
    influencer: 'NutritionGuru',
    description: 'Packed with vitamins and antioxidants to boost your immune system.',
    macros: {
      calories: 320,
      protein: 12,
      carbs: 60,
      fat: 8
    },
    time: '5 hours ago'
  },
  {
    id: '3',
    title: 'Grilled Chicken Salad',
    influencer: 'HealthyEats',
    description: 'A perfect lunch option that will keep you full and energized.',
    macros: {
      calories: 380,
      protein: 35,
      carbs: 20,
      fat: 18
    },
    time: '1 day ago'
  },
  {
    id: '4',
    title: 'Vegan Buddha Bowl',
    influencer: 'PlantPowered',
    description: 'A colorful mix of plant-based goodness for a complete meal.',
    macros: {
      calories: 410,
      protein: 15,
      carbs: 65,
      fat: 12
    },
    time: '1 day ago'
  },
];

const MealPost = ({ meal }) => {
  return (
    <View style={styles.mealCard}>
      <View style={styles.mealHeader}>
        <Text style={styles.influencerName}>{meal.influencer}</Text>
        <Text style={styles.timePosted}>{meal.time}</Text>
      </View>

      <View style={styles.imagePlaceholder}>
        <Text style={styles.placeholderText}>Meal Image</Text>
      </View>

      <View style={styles.mealContent}>
        <Text style={styles.mealTitle}>{meal.title}</Text>
        <Text style={styles.mealDescription}>{meal.description}</Text>

        <View style={styles.macrosContainer}>
          <Text style={styles.macrosTitle}>Macros:</Text>
          <View style={styles.macrosGrid}>
            <View style={styles.macroItem}>
              <Text style={styles.macroValue}>{meal.macros.calories}</Text>
              <Text style={styles.macroLabel}>Calories</Text>
            </View>
            <View style={styles.macroItem}>
              <Text style={styles.macroValue}>{meal.macros.protein}g</Text>
              <Text style={styles.macroLabel}>Protein</Text>
            </View>
            <View style={styles.macroItem}>
              <Text style={styles.macroValue}>{meal.macros.carbs}g</Text>
              <Text style={styles.macroLabel}>Carbs</Text>
            </View>
            <View style={styles.macroItem}>
              <Text style={styles.macroValue}>{meal.macros.fat}g</Text>
              <Text style={styles.macroLabel}>Fat</Text>
            </View>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Order Ingredients</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.saveButton]}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const MealFeedScreen = () => {
  const [loading, setLoading] = useState(false);
  const [meals, setMeals] = useState(SAMPLE_MEALS);

  useEffect(() => {
    // Simulate loading data
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingIndicator color="#4CAF50" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={meals}
        renderItem={({ item }) => <MealPost meal={item} />}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  mealCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  influencerName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  timePosted: {
    color: '#999',
    fontSize: 14,
  },
  imagePlaceholder: {
    height: 200,
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
  mealTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
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
  macrosTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
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
});

export default MealFeedScreen;
