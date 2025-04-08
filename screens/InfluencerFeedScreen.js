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

// Mock data for influencers
const MOCK_INFLUENCERS = [
  {
    id: '1',
    name: 'Fitness Chef',
    username: '@fitnesschef',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    isVerified: true,
    specialty: 'High Protein Meals',
    followers: 125000,
    posts: [
      {
        id: '101',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
        title: 'Protein-Packed Breakfast Bowl',
        description: 'Start your day with this nutrient-dense breakfast bowl!',
        likes: 3240,
        comments: 128,
        macros: {
          calories: 450,
          protein: 30,
          carbs: 45,
          fat: 15
        }
      }
    ]
  },
  {
    id: '2',
    name: 'Nutrition Guru',
    username: '@nutritionguru',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    isVerified: true,
    specialty: 'Plant-Based Nutrition',
    followers: 98000,
    posts: [
      {
        id: '201',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
        title: 'Green Smoothie Bowl',
        description: 'Packed with vitamins and antioxidants to boost your immune system.',
        likes: 2150,
        comments: 95,
        macros: {
          calories: 320,
          protein: 12,
          carbs: 60,
          fat: 8
        }
      }
    ]
  },
  {
    id: '3',
    name: 'Healthy Eats',
    username: '@healthyeats',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    isVerified: false,
    specialty: 'Quick & Healthy Meals',
    followers: 75000,
    posts: [
      {
        id: '301',
        image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061',
        title: '15-Minute Salmon Bowl',
        description: 'A quick and nutritious meal for busy weeknights.',
        likes: 1890,
        comments: 73,
        macros: {
          calories: 480,
          protein: 35,
          carbs: 30,
          fat: 22
        }
      }
    ]
  }
];

const InfluencerFeedScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [influencers, setInfluencers] = useState([]);

  useEffect(() => {
    // Simulate API call to fetch influencers
    const fetchInfluencers = async () => {
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          setInfluencers(MOCK_INFLUENCERS);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching influencers:', error);
        setLoading(false);
      }
    };

    fetchInfluencers();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    // In a real app, this would refresh the data from the API
    setTimeout(() => {
      setInfluencers(MOCK_INFLUENCERS);
      setRefreshing(false);
    }, 1000);
  };

  const renderInfluencerHeader = ({ item }) => (
    <TouchableOpacity
      style={styles.influencerHeader}
      onPress={() => navigation.navigate('InfluencerProfile', { influencerId: item.id })}
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.influencerInfo}>
        <View style={styles.nameContainer}>
          <Text style={styles.influencerName}>{item.name}</Text>
          {item.isVerified && (
            <Ionicons name="checkmark-circle" size={16} color={THEME.COLORS.PRIMARY} style={styles.verifiedIcon} />
          )}
        </View>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.specialty}>{item.specialty}</Text>
      </View>
      <TouchableOpacity style={styles.followButton}>
        <Text style={styles.followButtonText}>Follow</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderPost = ({ item }) => (
    <View style={styles.post}>
      <TouchableOpacity
        onPress={() => navigation.navigate('MealDetail', { mealId: item.id })}
      >
        <Image source={{ uri: item.image }} style={styles.postImage} />
        <View style={styles.postContent}>
          <Text style={styles.postTitle}>{item.title}</Text>
          <Text style={styles.postDescription}>{item.description}</Text>

          <View style={styles.macrosContainer}>
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

          <View style={styles.postActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="heart-outline" size={24} color={THEME.COLORS.TEXT} />
              <Text style={styles.actionText}>{item.likes}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="chatbubble-outline" size={22} color={THEME.COLORS.TEXT} />
              <Text style={styles.actionText}>{item.comments}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="bookmark-outline" size={24} color={THEME.COLORS.TEXT} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="share-social-outline" size={24} color={THEME.COLORS.TEXT} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderInfluencerItem = ({ item }) => (
    <View style={styles.influencerContainer}>
      {renderInfluencerHeader({ item })}
      <FlatList
        data={item.posts}
        renderItem={renderPost}
        keyExtractor={(post) => post.id}
        scrollEnabled={false}
      />
    </View>
  );

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>FitFoodie</Text>
        <TouchableOpacity
          style={styles.configButton}
          onPress={() => navigation.navigate('Config')}
        >
          <Ionicons name="settings-outline" size={24} color={THEME.COLORS.TEXT} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={influencers}
        renderItem={renderInfluencerItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.feedContainer}
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
    color: THEME.COLORS.PRIMARY,
  },
  configButton: {
    padding: 8,
  },
  feedContainer: {
    paddingBottom: 20,
  },
  influencerContainer: {
    marginBottom: 16,
    backgroundColor: THEME.COLORS.CARD,
    borderRadius: THEME.BORDER_RADIUS.MEDIUM,
    overflow: 'hidden',
    marginHorizontal: 12,
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  influencerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  influencerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  influencerName: {
    fontSize: THEME.SIZES.LARGE,
    fontWeight: 'bold',
    color: THEME.COLORS.TEXT,
  },
  verifiedIcon: {
    marginLeft: 4,
  },
  username: {
    fontSize: THEME.SIZES.SMALL,
    color: THEME.COLORS.TEXT_SECONDARY,
    marginBottom: 2,
  },
  specialty: {
    fontSize: THEME.SIZES.SMALL,
    color: THEME.COLORS.TEXT_SECONDARY,
  },
  followButton: {
    backgroundColor: THEME.COLORS.PRIMARY,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: THEME.BORDER_RADIUS.MEDIUM,
  },
  followButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: THEME.SIZES.SMALL,
  },
  post: {
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  postImage: {
    width: '100%',
    height: 240,
    resizeMode: 'cover',
  },
  postContent: {
    padding: 12,
  },
  postTitle: {
    fontSize: THEME.SIZES.LARGE,
    fontWeight: 'bold',
    color: THEME.COLORS.TEXT,
    marginBottom: 4,
  },
  postDescription: {
    fontSize: THEME.SIZES.MEDIUM,
    color: THEME.COLORS.TEXT_SECONDARY,
    marginBottom: 12,
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
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    marginLeft: 4,
    fontSize: THEME.SIZES.SMALL,
    color: THEME.COLORS.TEXT_SECONDARY,
  },
});

export default InfluencerFeedScreen;
