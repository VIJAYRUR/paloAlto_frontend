import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  SafeAreaView,
  StatusBar,
  ScrollView,
  Share
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../config';
import LoadingIndicator from '../components/LoadingIndicator';

// Mock data for meal detail
const MOCK_MEAL = {
  id: '101',
  title: 'Protein-Packed Breakfast Bowl',
  description: 'Start your day with this nutrient-dense breakfast bowl that will keep you full and energized all morning!',
  image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
  influencer: {
    id: '1',
    name: 'Fitness Chef',
    username: '@fitnesschef',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    isVerified: true,
  },
  prepTime: 15,
  cookTime: 10,
  servings: 2,
  calories: 450,
  protein: 30,
  carbs: 45,
  fat: 15,
  ingredients: [
    {
      id: '1',
      name: 'Rolled Oats',
      quantity: '1/2 cup',
      affiliateLink: 'https://example.com/oats'
    },
    {
      id: '2',
      name: 'Greek Yogurt',
      quantity: '1 cup',
      affiliateLink: 'https://example.com/greek-yogurt'
    },
    {
      id: '3',
      name: 'Protein Powder',
      quantity: '1 scoop',
      affiliateLink: 'https://example.com/protein-powder'
    },
    {
      id: '4',
      name: 'Mixed Berries',
      quantity: '1/2 cup',
      affiliateLink: 'https://example.com/berries'
    },
    {
      id: '5',
      name: 'Almond Butter',
      quantity: '1 tbsp',
      affiliateLink: 'https://example.com/almond-butter'
    },
    {
      id: '6',
      name: 'Chia Seeds',
      quantity: '1 tsp',
      affiliateLink: 'https://example.com/chia-seeds'
    },
    {
      id: '7',
      name: 'Honey',
      quantity: '1 tsp',
      affiliateLink: 'https://example.com/honey'
    }
  ],
  instructions: [
    'In a bowl, mix rolled oats with Greek yogurt.',
    'Add protein powder and mix well.',
    'Top with mixed berries, a dollop of almond butter, and a sprinkle of chia seeds.',
    'Drizzle with honey for sweetness.',
    'Enjoy immediately or refrigerate overnight for a grab-and-go breakfast.'
  ],
  tags: ['High Protein', 'Breakfast', 'Quick', 'Vegetarian'],
  likes: 3240,
  comments: 128,
  isFavorite: false
};

const MealDetailScreen = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true);
  const [meal, setMeal] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  
  useEffect(() => {
    // Simulate API call to fetch meal details
    const fetchMealDetails = async () => {
      try {
        // In a real app, this would be an API call using the mealId from route.params
        setTimeout(() => {
          setMeal(MOCK_MEAL);
          setIsFavorite(MOCK_MEAL.isFavorite);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching meal details:', error);
        setLoading(false);
      }
    };

    fetchMealDetails();
  }, [route.params]);

  const toggleFavorite = () => {
    // In a real app, this would make an API call to update the favorite status
    setIsFavorite(!isFavorite);
  };

  const shareMeal = async () => {
    try {
      await Share.share({
        message: `Check out this amazing recipe: ${meal.title} by ${meal.influencer.name} on FitFoodie!`,
        url: 'https://fitfoodie.app/meals/' + meal.id,
      });
    } catch (error) {
      console.error('Error sharing meal:', error);
    }
  };

  const addToCart = () => {
    // In a real app, this would add the ingredients to the cart
    navigation.navigate('OrderIngredients');
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: meal.image }} style={styles.mealImage} />
          <View style={styles.overlay} />
          
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={toggleFavorite}
            >
              <Ionicons 
                name={isFavorite ? "heart" : "heart-outline"} 
                size={24} 
                color={isFavorite ? THEME.COLORS.ERROR : "#FFFFFF"} 
              />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={shareMeal}
            >
              <Ionicons name="share-social-outline" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.content}>
          <Text style={styles.title}>{meal.title}</Text>
          
          <TouchableOpacity 
            style={styles.influencerRow}
            onPress={() => navigation.navigate('InfluencerProfile', { influencerId: meal.influencer.id })}
          >
            <Image source={{ uri: meal.influencer.avatar }} style={styles.avatar} />
            <View style={styles.influencerInfo}>
              <View style={styles.nameContainer}>
                <Text style={styles.influencerName}>{meal.influencer.name}</Text>
                {meal.influencer.isVerified && (
                  <Ionicons name="checkmark-circle" size={16} color={THEME.COLORS.PRIMARY} style={styles.verifiedIcon} />
                )}
              </View>
              <Text style={styles.username}>{meal.influencer.username}</Text>
            </View>
          </TouchableOpacity>
          
          <Text style={styles.description}>{meal.description}</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Ionicons name="time-outline" size={20} color={THEME.COLORS.TEXT_SECONDARY} />
              <Text style={styles.statValue}>{meal.prepTime + meal.cookTime} min</Text>
              <Text style={styles.statLabel}>Total Time</Text>
            </View>
            
            <View style={styles.statItem}>
              <Ionicons name="restaurant-outline" size={20} color={THEME.COLORS.TEXT_SECONDARY} />
              <Text style={styles.statValue}>{meal.servings}</Text>
              <Text style={styles.statLabel}>Servings</Text>
            </View>
            
            <View style={styles.statItem}>
              <Ionicons name="flame-outline" size={20} color={THEME.COLORS.TEXT_SECONDARY} />
              <Text style={styles.statValue}>{meal.calories}</Text>
              <Text style={styles.statLabel}>Calories</Text>
            </View>
          </View>
          
          <View style={styles.macrosContainer}>
            <View style={styles.macroItem}>
              <Text style={styles.macroValue}>{meal.protein}g</Text>
              <Text style={styles.macroLabel}>Protein</Text>
            </View>
            <View style={styles.macroItem}>
              <Text style={styles.macroValue}>{meal.carbs}g</Text>
              <Text style={styles.macroLabel}>Carbs</Text>
            </View>
            <View style={styles.macroItem}>
              <Text style={styles.macroValue}>{meal.fat}g</Text>
              <Text style={styles.macroLabel}>Fat</Text>
            </View>
          </View>
          
          <View style={styles.tagsContainer}>
            {meal.tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            {meal.ingredients.map((ingredient, index) => (
              <View key={index} style={styles.ingredientItem}>
                <Text style={styles.ingredientName}>{ingredient.name}</Text>
                <Text style={styles.ingredientQuantity}>{ingredient.quantity}</Text>
              </View>
            ))}
            
            <TouchableOpacity 
              style={styles.orderButton}
              onPress={addToCart}
            >
              <Ionicons name="cart-outline" size={20} color="#FFFFFF" />
              <Text style={styles.orderButtonText}>Order Ingredients</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Instructions</Text>
            {meal.instructions.map((instruction, index) => (
              <View key={index} style={styles.instructionItem}>
                <View style={styles.instructionNumber}>
                  <Text style={styles.instructionNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.instructionText}>{instruction}</Text>
              </View>
            ))}
          </View>
          
          <View style={styles.engagementContainer}>
            <View style={styles.engagementItem}>
              <Ionicons name="heart" size={20} color={THEME.COLORS.ERROR} />
              <Text style={styles.engagementText}>{meal.likes} likes</Text>
            </View>
            <View style={styles.engagementItem}>
              <Ionicons name="chatbubble-outline" size={20} color={THEME.COLORS.TEXT_SECONDARY} />
              <Text style={styles.engagementText}>{meal.comments} comments</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.BACKGROUND,
  },
  scrollContent: {
    flexGrow: 1,
  },
  imageContainer: {
    height: 300,
    position: 'relative',
  },
  mealImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtons: {
    position: 'absolute',
    top: 16,
    right: 16,
    flexDirection: 'row',
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: THEME.COLORS.TEXT,
    marginBottom: 12,
  },
  influencerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  influencerInfo: {
    marginLeft: 12,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  influencerName: {
    fontSize: THEME.SIZES.MEDIUM,
    fontWeight: 'bold',
    color: THEME.COLORS.TEXT,
  },
  verifiedIcon: {
    marginLeft: 4,
  },
  username: {
    fontSize: THEME.SIZES.SMALL,
    color: THEME.COLORS.TEXT_SECONDARY,
  },
  description: {
    fontSize: THEME.SIZES.MEDIUM,
    color: THEME.COLORS.TEXT,
    lineHeight: 22,
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: THEME.SIZES.MEDIUM,
    fontWeight: 'bold',
    color: THEME.COLORS.TEXT,
    marginTop: 4,
  },
  statLabel: {
    fontSize: THEME.SIZES.SMALL,
    color: THEME.COLORS.TEXT_SECONDARY,
  },
  macrosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F9F9F9',
    borderRadius: THEME.BORDER_RADIUS.MEDIUM,
    padding: 16,
    marginBottom: 16,
  },
  macroItem: {
    alignItems: 'center',
    flex: 1,
  },
  macroValue: {
    fontSize: THEME.SIZES.LARGE,
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
    marginBottom: 24,
  },
  tag: {
    backgroundColor: '#E8F5E9',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: THEME.SIZES.SMALL,
    color: THEME.COLORS.PRIMARY,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: THEME.SIZES.LARGE,
    fontWeight: 'bold',
    color: THEME.COLORS.TEXT,
    marginBottom: 16,
  },
  ingredientItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  ingredientName: {
    fontSize: THEME.SIZES.MEDIUM,
    color: THEME.COLORS.TEXT,
  },
  ingredientQuantity: {
    fontSize: THEME.SIZES.MEDIUM,
    color: THEME.COLORS.TEXT_SECONDARY,
  },
  orderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME.COLORS.PRIMARY,
    paddingVertical: 12,
    borderRadius: THEME.BORDER_RADIUS.MEDIUM,
    marginTop: 16,
  },
  orderButtonText: {
    fontSize: THEME.SIZES.MEDIUM,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  instructionItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  instructionNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: THEME.COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  instructionNumberText: {
    fontSize: THEME.SIZES.SMALL,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  instructionText: {
    flex: 1,
    fontSize: THEME.SIZES.MEDIUM,
    color: THEME.COLORS.TEXT,
    lineHeight: 22,
  },
  engagementContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingTop: 16,
  },
  engagementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  engagementText: {
    fontSize: THEME.SIZES.SMALL,
    color: THEME.COLORS.TEXT_SECONDARY,
    marginLeft: 4,
  },
});

export default MealDetailScreen;
