import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  RefreshControl,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../config';
import LoadingIndicator from '../components/LoadingIndicator';

// Mock data for meal plans
const MOCK_MEAL_PLANS = [
  {
    id: '1',
    title: 'High Protein Meal Plan',
    description: 'Perfect for muscle building and recovery',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554',
    influencer: {
      name: 'Fitness Chef',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      isVerified: true,
    },
    duration: '7 days',
    mealsPerDay: 5,
    totalCalories: 2500,
    macros: {
      protein: 40,
      carbs: 40,
      fat: 20
    },
    tags: ['High Protein', 'Muscle Building', 'Fitness'],
    price: 19.99,
    rating: 4.8,
    reviews: 124
  },
  {
    id: '2',
    title: 'Plant-Based Weight Loss',
    description: 'Healthy plant-based meals for sustainable weight loss',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
    influencer: {
      name: 'Nutrition Guru',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      isVerified: true,
    },
    duration: '14 days',
    mealsPerDay: 3,
    totalCalories: 1800,
    macros: {
      protein: 25,
      carbs: 55,
      fat: 20
    },
    tags: ['Plant-Based', 'Weight Loss', 'Vegan'],
    price: 24.99,
    rating: 4.6,
    reviews: 98
  },
  {
    id: '3',
    title: 'Quick & Healthy Meal Prep',
    description: 'Save time with these quick and nutritious meal prep recipes',
    image: 'https://images.unsplash.com/photo-1493770348161-369560ae357d',
    influencer: {
      name: 'Healthy Eats',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      isVerified: false,
    },
    duration: '5 days',
    mealsPerDay: 4,
    totalCalories: 2200,
    macros: {
      protein: 30,
      carbs: 45,
      fat: 25
    },
    tags: ['Meal Prep', 'Quick', 'Time-Saving'],
    price: 14.99,
    rating: 4.5,
    reviews: 76
  }
];

const MealPlansScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [mealPlans, setMealPlans] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'High Protein', 'Weight Loss', 'Vegan', 'Keto', 'Meal Prep'];

  useEffect(() => {
    // Simulate API call to fetch meal plans
    const fetchMealPlans = async () => {
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          setMealPlans(MOCK_MEAL_PLANS);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching meal plans:', error);
        setLoading(false);
      }
    };

    fetchMealPlans();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    // In a real app, this would refresh the data from the API
    setTimeout(() => {
      setMealPlans(MOCK_MEAL_PLANS);
      setRefreshing(false);
    }, 1000);
  };

  const filteredMealPlans = activeFilter === 'All'
    ? mealPlans
    : mealPlans.filter(plan => plan.tags.includes(activeFilter));

  const renderFilterItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.filterItem,
        activeFilter === item && styles.activeFilterItem
      ]}
      onPress={() => setActiveFilter(item)}
    >
      <Text
        style={[
          styles.filterText,
          activeFilter === item && styles.activeFilterText
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderMealPlanItem = ({ item }) => (
    <TouchableOpacity
      style={styles.mealPlanCard}
      onPress={() => navigation.navigate('MealDetail', { mealId: item.id })}
    >
      <Image source={{ uri: item.image }} style={styles.mealPlanImage} />
      <View style={styles.mealPlanContent}>
        <View style={styles.influencerRow}>
          <Image source={{ uri: item.influencer.avatar }} style={styles.influencerAvatar} />
          <Text style={styles.influencerName}>{item.influencer.name}</Text>
          {item.influencer.isVerified && (
            <Ionicons name="checkmark-circle" size={14} color={THEME.COLORS.PRIMARY} style={styles.verifiedIcon} />
          )}
        </View>

        <Text style={styles.mealPlanTitle}>{item.title}</Text>
        <Text style={styles.mealPlanDescription}>{item.description}</Text>

        <View style={styles.mealPlanDetails}>
          <View style={styles.detailItem}>
            <Ionicons name="calendar-outline" size={16} color={THEME.COLORS.TEXT_SECONDARY} />
            <Text style={styles.detailText}>{item.duration}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="restaurant-outline" size={16} color={THEME.COLORS.TEXT_SECONDARY} />
            <Text style={styles.detailText}>{item.mealsPerDay} meals/day</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="flame-outline" size={16} color={THEME.COLORS.TEXT_SECONDARY} />
            <Text style={styles.detailText}>{item.totalCalories} cal</Text>
          </View>
        </View>

        <View style={styles.macrosContainer}>
          <View style={styles.macroItem}>
            <Text style={styles.macroValue}>{item.macros.protein}%</Text>
            <Text style={styles.macroLabel}>Protein</Text>
          </View>
          <View style={styles.macroItem}>
            <Text style={styles.macroValue}>{item.macros.carbs}%</Text>
            <Text style={styles.macroLabel}>Carbs</Text>
          </View>
          <View style={styles.macroItem}>
            <Text style={styles.macroValue}>{item.macros.fat}%</Text>
            <Text style={styles.macroLabel}>Fat</Text>
          </View>
        </View>

        <View style={styles.tagsContainer}>
          {item.tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>

        <View style={styles.bottomRow}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating} ({item.reviews})</Text>
          </View>
          <Text style={styles.priceText}>${item.price}</Text>
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
        <Text style={styles.headerTitle}>Meal Plans</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search-outline" size={24} color={THEME.COLORS.TEXT} />
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        data={filters}
        renderItem={renderFilterItem}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersContainer}
      />

      <FlatList
        data={filteredMealPlans}
        renderItem={renderMealPlanItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.mealPlansContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[THEME.COLORS.PRIMARY]}
          />
        }
      />
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    backgroundColor: THEME.COLORS.CARD,
  },
  headerTitle: {
    fontSize: THEME.SIZES.TITLE,
    fontWeight: 'bold',
    color: THEME.COLORS.TEXT,
  },
  searchButton: {
    padding: 8,
  },
  filtersContainer: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: THEME.COLORS.CARD,
  },
  filterItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    marginRight: 8,
  },
  activeFilterItem: {
    backgroundColor: THEME.COLORS.PRIMARY,
  },
  filterText: {
    fontSize: THEME.SIZES.SMALL,
    color: THEME.COLORS.TEXT,
  },
  activeFilterText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  mealPlansContainer: {
    padding: 12,
  },
  mealPlanCard: {
    backgroundColor: THEME.COLORS.CARD,
    borderRadius: THEME.BORDER_RADIUS.MEDIUM,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  mealPlanImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  mealPlanContent: {
    padding: 12,
  },
  influencerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  influencerAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  influencerName: {
    fontSize: THEME.SIZES.SMALL,
    color: THEME.COLORS.TEXT_SECONDARY,
  },
  verifiedIcon: {
    marginLeft: 4,
  },
  mealPlanTitle: {
    fontSize: THEME.SIZES.LARGE,
    fontWeight: 'bold',
    color: THEME.COLORS.TEXT,
    marginBottom: 4,
  },
  mealPlanDescription: {
    fontSize: THEME.SIZES.MEDIUM,
    color: THEME.COLORS.TEXT_SECONDARY,
    marginBottom: 12,
  },
  mealPlanDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: THEME.SIZES.SMALL,
    color: THEME.COLORS.TEXT_SECONDARY,
    marginLeft: 4,
  },
  macrosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F9F9F9',
    borderRadius: THEME.BORDER_RADIUS.SMALL,
    padding: 10,
    marginBottom: 12,
  },
  macroItem: {
    alignItems: 'center',
    flex: 1,
  },
  macroValue: {
    fontSize: THEME.SIZES.MEDIUM,
    fontWeight: 'bold',
    color: THEME.COLORS.TEXT,
  },
  macroLabel: {
    fontSize: THEME.SIZES.SMALL,
    color: THEME.COLORS.TEXT_SECONDARY,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  tag: {
    backgroundColor: '#E8F5E9',
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: THEME.SIZES.SMALL,
    color: THEME.COLORS.PRIMARY,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingTop: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: THEME.SIZES.SMALL,
    color: THEME.COLORS.TEXT_SECONDARY,
    marginLeft: 4,
  },
  priceText: {
    fontSize: THEME.SIZES.LARGE,
    fontWeight: 'bold',
    color: THEME.COLORS.PRIMARY,
  },

});

export default MealPlansScreen;
