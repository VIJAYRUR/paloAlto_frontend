import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Modal,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME, NUTRITIONIX_CONFIG } from '../config';
import LoadingIndicator from '../components/LoadingIndicator';

// Mock data for food log
const MOCK_FOOD_LOG = {
  date: new Date().toISOString().split('T')[0],
  totalCalories: 1850,
  totalProtein: 120,
  totalCarbs: 180,
  totalFat: 65,
  meals: [
    {
      id: '1',
      name: 'Breakfast',
      time: '08:30',
      foods: [
        {
          id: '101',
          name: 'Oatmeal with Berries',
          quantity: '1 bowl',
          calories: 320,
          protein: 12,
          carbs: 54,
          fat: 6
        },
        {
          id: '102',
          name: 'Greek Yogurt',
          quantity: '1 cup',
          calories: 150,
          protein: 15,
          carbs: 8,
          fat: 5
        }
      ]
    },
    {
      id: '2',
      name: 'Lunch',
      time: '13:00',
      foods: [
        {
          id: '201',
          name: 'Grilled Chicken Salad',
          quantity: '1 plate',
          calories: 450,
          protein: 35,
          carbs: 30,
          fat: 20
        },
        {
          id: '202',
          name: 'Whole Grain Bread',
          quantity: '1 slice',
          calories: 120,
          protein: 4,
          carbs: 22,
          fat: 2
        }
      ]
    },
    {
      id: '3',
      name: 'Dinner',
      time: '19:30',
      foods: [
        {
          id: '301',
          name: 'Salmon Fillet',
          quantity: '6 oz',
          calories: 350,
          protein: 34,
          carbs: 0,
          fat: 22
        },
        {
          id: '302',
          name: 'Steamed Vegetables',
          quantity: '1 cup',
          calories: 80,
          protein: 4,
          carbs: 16,
          fat: 0
        },
        {
          id: '303',
          name: 'Brown Rice',
          quantity: '1/2 cup',
          calories: 120,
          protein: 3,
          carbs: 25,
          fat: 1
        }
      ]
    },
    {
      id: '4',
      name: 'Snacks',
      time: 'Various',
      foods: [
        {
          id: '401',
          name: 'Protein Bar',
          quantity: '1 bar',
          calories: 180,
          protein: 12,
          carbs: 20,
          fat: 7
        },
        {
          id: '402',
          name: 'Apple',
          quantity: '1 medium',
          calories: 80,
          protein: 0,
          carbs: 21,
          fat: 0
        }
      ]
    }
  ]
};

// Mock data for food search results
const MOCK_SEARCH_RESULTS = [
  {
    id: '1001',
    name: 'Chicken Breast',
    brand: 'Generic',
    servingSize: '3 oz',
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6
  },
  {
    id: '1002',
    name: 'Salmon',
    brand: 'Generic',
    servingSize: '3 oz',
    calories: 177,
    protein: 19,
    carbs: 0,
    fat: 11
  },
  {
    id: '1003',
    name: 'Brown Rice',
    brand: 'Generic',
    servingSize: '1/2 cup cooked',
    calories: 108,
    protein: 2.5,
    carbs: 22.5,
    fat: 0.9
  },
  {
    id: '1004',
    name: 'Avocado',
    brand: 'Generic',
    servingSize: '1/2 medium',
    calories: 114,
    protein: 1.3,
    carbs: 6,
    fat: 10.5
  },
  {
    id: '1005',
    name: 'Greek Yogurt',
    brand: 'Fage',
    servingSize: '6 oz',
    calories: 100,
    protein: 18,
    carbs: 6,
    fat: 0
  }
];

const FoodLogScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [foodLog, setFoodLog] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);

  useEffect(() => {
    // Simulate API call to fetch food log
    const fetchFoodLog = async () => {
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          setFoodLog(MOCK_FOOD_LOG);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching food log:', error);
        setLoading(false);
      }
    };

    fetchFoodLog();
  }, []);

  const searchFood = (query) => {
    setSearchQuery(query);

    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    setSearching(true);

    // In a real app, this would be an API call to Nutritionix
    setTimeout(() => {
      const filteredResults = MOCK_SEARCH_RESULTS.filter(
        item => item.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredResults);
      setSearching(false);
    }, 500);
  };

  const addFoodToMeal = (food) => {
    // In a real app, this would update the database
    const newFoodLog = { ...foodLog };
    const mealIndex = newFoodLog.meals.findIndex(meal => meal.id === selectedMeal.id);

    if (mealIndex !== -1) {
      const newFood = {
        id: Date.now().toString(),
        name: food.name,
        quantity: food.servingSize,
        calories: food.calories,
        protein: food.protein,
        carbs: food.carbs,
        fat: food.fat
      };

      newFoodLog.meals[mealIndex].foods.push(newFood);

      // Update totals
      newFoodLog.totalCalories += food.calories;
      newFoodLog.totalProtein += food.protein;
      newFoodLog.totalCarbs += food.carbs;
      newFoodLog.totalFat += food.fat;

      setFoodLog(newFoodLog);
      setModalVisible(false);
      setSearchQuery('');
      setSearchResults([]);
    }
  };

  const formatDate = (date) => {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const renderMacroProgress = (current, target, label, color) => {
    const percentage = Math.min((current / target) * 100, 100);

    return (
      <View style={styles.macroProgressContainer}>
        <View style={styles.macroLabelRow}>
          <Text style={styles.macroLabel}>{label}</Text>
          <Text style={styles.macroValue}>{current}g</Text>
        </View>
        <View style={styles.progressBarBackground}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${percentage}%`, backgroundColor: color }
            ]}
          />
        </View>
      </View>
    );
  };

  const renderFoodItem = ({ item }) => (
    <View style={styles.foodItem}>
      <View style={styles.foodItemLeft}>
        <Text style={styles.foodName}>{item.name}</Text>
        <Text style={styles.foodQuantity}>{item.quantity}</Text>
      </View>
      <View style={styles.foodItemRight}>
        <Text style={styles.foodCalories}>{item.calories} cal</Text>
        <View style={styles.foodMacros}>
          <Text style={styles.foodMacro}>P: {item.protein}g</Text>
          <Text style={styles.foodMacro}>C: {item.carbs}g</Text>
          <Text style={styles.foodMacro}>F: {item.fat}g</Text>
        </View>
      </View>
    </View>
  );

  const renderMealSection = ({ item }) => (
    <View style={styles.mealSection}>
      <View style={styles.mealHeader}>
        <View style={styles.mealHeaderLeft}>
          <Text style={styles.mealName}>{item.name}</Text>
          <Text style={styles.mealTime}>{item.time}</Text>
        </View>
        <TouchableOpacity
          style={styles.addFoodButton}
          onPress={() => {
            setSelectedMeal(item);
            setModalVisible(true);
          }}
        >
          <Ionicons name="add" size={20} color="#FFFFFF" />
          <Text style={styles.addFoodButtonText}>Add Food</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={item.foods}
        renderItem={renderFoodItem}
        keyExtractor={(food) => food.id}
        scrollEnabled={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={() => (
          <Text style={styles.emptyListText}>No foods logged for this meal</Text>
        )}
      />
    </View>
  );

  const renderSearchResultItem = ({ item }) => (
    <TouchableOpacity
      style={styles.searchResultItem}
      onPress={() => addFoodToMeal(item)}
    >
      <View style={styles.searchResultLeft}>
        <Text style={styles.searchResultName}>{item.name}</Text>
        <Text style={styles.searchResultBrand}>{item.brand} • {item.servingSize}</Text>
      </View>
      <View style={styles.searchResultRight}>
        <Text style={styles.searchResultCalories}>{item.calories} cal</Text>
        <View style={styles.searchResultMacros}>
          <Text style={styles.searchResultMacro}>P: {item.protein}g</Text>
          <Text style={styles.searchResultMacro}>C: {item.carbs}g</Text>
          <Text style={styles.searchResultMacro}>F: {item.fat}g</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.dateSelector}>
          <Ionicons name="calendar-outline" size={20} color={THEME.COLORS.PRIMARY} />
          <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
          <Ionicons name="chevron-down" size={20} color={THEME.COLORS.PRIMARY} />
        </TouchableOpacity>
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Daily Summary</Text>

        <View style={styles.calorieRow}>
          <View style={styles.calorieContainer}>
            <Text style={styles.calorieValue}>{foodLog.totalCalories}</Text>
            <Text style={styles.calorieLabel}>calories</Text>
          </View>
          <View style={styles.calorieRemainingContainer}>
            <Text style={styles.calorieRemainingValue}>650</Text>
            <Text style={styles.calorieRemainingLabel}>remaining</Text>
          </View>
        </View>

        <View style={styles.macrosContainer}>
          {renderMacroProgress(foodLog.totalProtein, 150, 'Protein', '#4CAF50')}
          {renderMacroProgress(foodLog.totalCarbs, 200, 'Carbs', '#2196F3')}
          {renderMacroProgress(foodLog.totalFat, 70, 'Fat', '#FF9800')}
        </View>
      </View>

      <FlatList
        data={foodLog.meals}
        renderItem={renderMealSection}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.mealListContainer}
        ItemSeparatorComponent={() => <View style={styles.mealSeparator} />}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Add Food to {selectedMeal ? selectedMeal.name : 'Meal'}
              </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                  setModalVisible(false);
                  setSearchQuery('');
                  setSearchResults([]);
                }}
              >
                <Ionicons name="close" size={24} color={THEME.COLORS.TEXT} />
              </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
              <Ionicons name="search" size={20} color={THEME.COLORS.TEXT_SECONDARY} style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search for a food..."
                value={searchQuery}
                onChangeText={searchFood}
                autoFocus={true}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity
                  style={styles.clearButton}
                  onPress={() => {
                    setSearchQuery('');
                    setSearchResults([]);
                  }}
                >
                  <Ionicons name="close-circle" size={20} color={THEME.COLORS.TEXT_SECONDARY} />
                </TouchableOpacity>
              )}
            </View>

            {searching ? (
              <View style={styles.searchingContainer}>
                <LoadingIndicator size="small" />
                <Text style={styles.searchingText}>Searching...</Text>
              </View>
            ) : (
              <FlatList
                data={searchResults}
                renderItem={renderSearchResultItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.searchResultsContainer}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                ListEmptyComponent={() => (
                  searchQuery.length > 1 ? (
                    <Text style={styles.emptySearchText}>No results found</Text>
                  ) : searchQuery.length > 0 ? (
                    <Text style={styles.emptySearchText}>Type at least 2 characters</Text>
                  ) : null
                )}
              />
            )}
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.BACKGROUND,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    backgroundColor: THEME.COLORS.CARD,
  },
  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  dateText: {
    fontSize: THEME.SIZES.MEDIUM,
    fontWeight: 'bold',
    color: THEME.COLORS.PRIMARY,
    marginHorizontal: 8,
  },
  summaryCard: {
    backgroundColor: THEME.COLORS.CARD,
    borderRadius: THEME.BORDER_RADIUS.MEDIUM,
    padding: 16,
    margin: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: THEME.SIZES.LARGE,
    fontWeight: 'bold',
    color: THEME.COLORS.TEXT,
    marginBottom: 12,
  },
  calorieRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  calorieContainer: {
    alignItems: 'center',
  },
  calorieValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: THEME.COLORS.PRIMARY,
  },
  calorieLabel: {
    fontSize: THEME.SIZES.SMALL,
    color: THEME.COLORS.TEXT_SECONDARY,
  },
  calorieRemainingContainer: {
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: THEME.BORDER_RADIUS.MEDIUM,
  },
  calorieRemainingValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: THEME.COLORS.TEXT,
  },
  calorieRemainingLabel: {
    fontSize: THEME.SIZES.SMALL,
    color: THEME.COLORS.TEXT_SECONDARY,
  },
  macrosContainer: {
    marginTop: 8,
  },
  macroProgressContainer: {
    marginBottom: 12,
  },
  macroLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  macroLabel: {
    fontSize: THEME.SIZES.SMALL,
    color: THEME.COLORS.TEXT,
  },
  macroValue: {
    fontSize: THEME.SIZES.SMALL,
    fontWeight: 'bold',
    color: THEME.COLORS.TEXT,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  mealListContainer: {
    padding: 12,
    paddingBottom: 100, // Extra padding for bottom tab bar
  },
  mealSection: {
    backgroundColor: THEME.COLORS.CARD,
    borderRadius: THEME.BORDER_RADIUS.MEDIUM,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  mealHeaderLeft: {
    flexDirection: 'column',
  },
  mealName: {
    fontSize: THEME.SIZES.LARGE,
    fontWeight: 'bold',
    color: THEME.COLORS.TEXT,
  },
  mealTime: {
    fontSize: THEME.SIZES.SMALL,
    color: THEME.COLORS.TEXT_SECONDARY,
  },
  addFoodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.COLORS.PRIMARY,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: THEME.BORDER_RADIUS.MEDIUM,
  },
  addFoodButtonText: {
    fontSize: THEME.SIZES.SMALL,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 4,
  },
  foodItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  foodItemLeft: {
    flex: 1,
  },
  foodName: {
    fontSize: THEME.SIZES.MEDIUM,
    color: THEME.COLORS.TEXT,
    marginBottom: 2,
  },
  foodQuantity: {
    fontSize: THEME.SIZES.SMALL,
    color: THEME.COLORS.TEXT_SECONDARY,
  },
  foodItemRight: {
    alignItems: 'flex-end',
  },
  foodCalories: {
    fontSize: THEME.SIZES.MEDIUM,
    fontWeight: 'bold',
    color: THEME.COLORS.TEXT,
    marginBottom: 2,
  },
  foodMacros: {
    flexDirection: 'row',
  },
  foodMacro: {
    fontSize: THEME.SIZES.SMALL,
    color: THEME.COLORS.TEXT_SECONDARY,
    marginLeft: 8,
  },
  separator: {
    height: 1,
    backgroundColor: '#EEEEEE',
  },
  mealSeparator: {
    height: 16,
  },
  emptyListText: {
    fontSize: THEME.SIZES.MEDIUM,
    color: THEME.COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    padding: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: THEME.COLORS.CARD,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 16,
    paddingBottom: Platform.OS === 'ios' ? 40 : 16,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  modalTitle: {
    fontSize: THEME.SIZES.LARGE,
    fontWeight: 'bold',
    color: THEME.COLORS.TEXT,
  },
  closeButton: {
    padding: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: THEME.BORDER_RADIUS.MEDIUM,
    margin: 16,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: THEME.SIZES.MEDIUM,
    color: THEME.COLORS.TEXT,
  },
  clearButton: {
    padding: 4,
  },
  searchingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  searchingText: {
    fontSize: THEME.SIZES.MEDIUM,
    color: THEME.COLORS.TEXT_SECONDARY,
    marginLeft: 8,
  },
  searchResultsContainer: {
    paddingHorizontal: 16,
  },
  searchResultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  searchResultLeft: {
    flex: 1,
  },
  searchResultName: {
    fontSize: THEME.SIZES.MEDIUM,
    color: THEME.COLORS.TEXT,
    marginBottom: 2,
  },
  searchResultBrand: {
    fontSize: THEME.SIZES.SMALL,
    color: THEME.COLORS.TEXT_SECONDARY,
  },
  searchResultRight: {
    alignItems: 'flex-end',
  },
  searchResultCalories: {
    fontSize: THEME.SIZES.MEDIUM,
    fontWeight: 'bold',
    color: THEME.COLORS.TEXT,
    marginBottom: 2,
  },
  searchResultMacros: {
    flexDirection: 'row',
  },
  searchResultMacro: {
    fontSize: THEME.SIZES.SMALL,
    color: THEME.COLORS.TEXT_SECONDARY,
    marginLeft: 8,
  },
  emptySearchText: {
    fontSize: THEME.SIZES.MEDIUM,
    color: THEME.COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    padding: 16,
  },

});

export default FoodLogScreen;
