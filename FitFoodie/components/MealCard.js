import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const MealCard = ({ meal, onPress }) => {
  return (
    <TouchableOpacity style={styles.mealCard} onPress={onPress}>
      <View style={styles.imagePlaceholder}>
        <Text style={styles.placeholderText}>Meal Image</Text>
      </View>
      
      <View style={styles.mealContent}>
        <Text style={styles.mealTitle}>{meal.title}</Text>
        <Text style={styles.influencerName}>by {meal.influencer}</Text>
        
        <View style={styles.macrosContainer}>
          <View style={styles.macrosGrid}>
            <View style={styles.macroItem}>
              <Text style={styles.macroValue}>{meal.macros.calories}</Text>
              <Text style={styles.macroLabel}>Cal</Text>
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
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
  mealTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  influencerName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  macrosContainer: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
  },
  macrosGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  macroItem: {
    alignItems: 'center',
  },
  macroValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  macroLabel: {
    fontSize: 12,
    color: '#666',
  },
});

export default MealCard;
