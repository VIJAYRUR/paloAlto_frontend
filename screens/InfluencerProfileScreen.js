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
  FlatList,
  Linking
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../config';
import LoadingIndicator from '../components/LoadingIndicator';

// Mock data for influencer profile
const MOCK_INFLUENCER = {
  id: '1',
  name: 'Fitness Chef',
  username: '@fitnesschef',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  coverImage: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061',
  bio: 'Certified nutritionist and fitness coach specializing in high-protein meals for muscle building and recovery. Author of "Eat for Performance" cookbook.',
  followers: 125000,
  following: 850,
  posts: 342,
  isVerified: true,
  isFollowing: false,
  specialty: 'High Protein Meals',
  socialMedia: {
    instagram: 'fitnesschef',
    youtube: 'fitnesschef',
    tiktok: 'fitnesschef',
    website: 'https://fitnesschef.com'
  },
  meals: [
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
    },
    {
      id: '102',
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061',
      title: 'Grilled Chicken Salad',
      description: 'A perfect post-workout meal with lean protein and veggies.',
      likes: 2890,
      comments: 95,
      macros: {
        calories: 380,
        protein: 35,
        carbs: 20,
        fat: 18
      }
    },
    {
      id: '103',
      image: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55',
      title: 'Protein Smoothie Bowl',
      description: 'Refreshing and packed with nutrients for recovery.',
      likes: 2150,
      comments: 87,
      macros: {
        calories: 320,
        protein: 25,
        carbs: 40,
        fat: 8
      }
    }
  ]
};

const InfluencerProfileScreen = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true);
  const [influencer, setInfluencer] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    // Simulate API call to fetch influencer profile
    const fetchInfluencerProfile = async () => {
      try {
        // In a real app, this would be an API call using the influencerId from route.params
        setTimeout(() => {
          setInfluencer(MOCK_INFLUENCER);
          setIsFollowing(MOCK_INFLUENCER.isFollowing);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching influencer profile:', error);
        setLoading(false);
      }
    };

    fetchInfluencerProfile();
  }, [route.params]);

  const toggleFollow = () => {
    // In a real app, this would make an API call to follow/unfollow the influencer
    setIsFollowing(!isFollowing);
  };

  const openSocialMedia = (platform, username) => {
    let url;

    switch (platform) {
      case 'instagram':
        url = `https://instagram.com/${username}`;
        break;
      case 'youtube':
        url = `https://youtube.com/@${username}`;
        break;
      case 'tiktok':
        url = `https://tiktok.com/@${username}`;
        break;
      case 'website':
        url = username; // For website, the username is the full URL
        break;
      default:
        return;
    }

    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  };

  const renderMealItem = ({ item }) => (
    <TouchableOpacity
      style={styles.mealCard}
      onPress={() => navigation.navigate('MealDetail', { mealId: item.id })}
    >
      <Image source={{ uri: item.image }} style={styles.mealImage} />
      <View style={styles.mealContent}>
        <Text style={styles.mealTitle}>{item.title}</Text>
        <Text style={styles.mealDescription}>{item.description}</Text>

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

        <View style={styles.mealActions}>
          <View style={styles.actionItem}>
            <Ionicons name="heart" size={16} color={THEME.COLORS.ERROR} />
            <Text style={styles.actionText}>{item.likes}</Text>
          </View>
          <View style={styles.actionItem}>
            <Ionicons name="chatbubble-outline" size={16} color={THEME.COLORS.TEXT_SECONDARY} />
            <Text style={styles.actionText}>{item.comments}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.coverContainer}>
          <Image source={{ uri: influencer.coverImage }} style={styles.coverImage} />
          <View style={styles.overlay} />

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.profileContainer}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: influencer.avatar }} style={styles.avatar} />
          </View>

          <View style={styles.nameContainer}>
            <Text style={styles.name}>{influencer.name}</Text>
            {influencer.isVerified && (
              <Ionicons name="checkmark-circle" size={20} color={THEME.COLORS.PRIMARY} style={styles.verifiedIcon} />
            )}
          </View>

          <Text style={styles.username}>{influencer.username}</Text>
          <Text style={styles.specialty}>{influencer.specialty}</Text>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{influencer.posts}</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{influencer.followers.toLocaleString()}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{influencer.following.toLocaleString()}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.followButton,
              isFollowing && styles.followingButton
            ]}
            onPress={toggleFollow}
          >
            <Text style={[
              styles.followButtonText,
              isFollowing && styles.followingButtonText
            ]}>
              {isFollowing ? 'Following' : 'Follow'}
            </Text>
          </TouchableOpacity>

          <Text style={styles.bio}>{influencer.bio}</Text>

          <View style={styles.socialContainer}>
            {influencer.socialMedia.instagram && (
              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => openSocialMedia('instagram', influencer.socialMedia.instagram)}
              >
                <Ionicons name="logo-instagram" size={24} color={THEME.COLORS.TEXT} />
              </TouchableOpacity>
            )}

            {influencer.socialMedia.youtube && (
              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => openSocialMedia('youtube', influencer.socialMedia.youtube)}
              >
                <Ionicons name="logo-youtube" size={24} color={THEME.COLORS.TEXT} />
              </TouchableOpacity>
            )}

            {influencer.socialMedia.tiktok && (
              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => openSocialMedia('tiktok', influencer.socialMedia.tiktok)}
              >
                <Ionicons name="logo-tiktok" size={24} color={THEME.COLORS.TEXT} />
              </TouchableOpacity>
            )}

            {influencer.socialMedia.website && (
              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => openSocialMedia('website', influencer.socialMedia.website)}
              >
                <Ionicons name="globe-outline" size={24} color={THEME.COLORS.TEXT} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.mealsContainer}>
          <Text style={styles.sectionTitle}>Featured Meals</Text>

          <FlatList
            data={influencer.meals}
            renderItem={renderMealItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={styles.mealSeparator} />}
          />
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
  coverContainer: {
    height: 200,
    position: 'relative',
  },
  coverImage: {
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
  profileContainer: {
    padding: 16,
    backgroundColor: THEME.COLORS.CARD,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    alignItems: 'center',
  },
  avatarContainer: {
    marginTop: -50,
    borderWidth: 4,
    borderColor: THEME.COLORS.CARD,
    borderRadius: 50,
    overflow: 'hidden',
  },
  avatar: {
    width: 100,
    height: 100,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  name: {
    fontSize: THEME.SIZES.TITLE,
    fontWeight: 'bold',
    color: THEME.COLORS.TEXT,
  },
  verifiedIcon: {
    marginLeft: 8,
  },
  username: {
    fontSize: THEME.SIZES.MEDIUM,
    color: THEME.COLORS.TEXT_SECONDARY,
    marginTop: 4,
  },
  specialty: {
    fontSize: THEME.SIZES.MEDIUM,
    color: THEME.COLORS.PRIMARY,
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#EEEEEE',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: THEME.SIZES.LARGE,
    fontWeight: 'bold',
    color: THEME.COLORS.TEXT,
  },
  statLabel: {
    fontSize: THEME.SIZES.SMALL,
    color: THEME.COLORS.TEXT_SECONDARY,
    marginTop: 4,
  },
  followButton: {
    backgroundColor: THEME.COLORS.PRIMARY,
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: THEME.BORDER_RADIUS.MEDIUM,
    marginTop: 16,
  },
  followingButton: {
    backgroundColor: '#F0F0F0',
    borderWidth: 1,
    borderColor: THEME.COLORS.PRIMARY,
  },
  followButtonText: {
    fontSize: THEME.SIZES.MEDIUM,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  followingButtonText: {
    color: THEME.COLORS.PRIMARY,
  },
  bio: {
    fontSize: THEME.SIZES.MEDIUM,
    color: THEME.COLORS.TEXT,
    lineHeight: 22,
    textAlign: 'center',
    marginTop: 16,
  },
  socialContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  socialButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  mealsContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: THEME.SIZES.LARGE,
    fontWeight: 'bold',
    color: THEME.COLORS.TEXT,
    marginBottom: 16,
  },
  mealCard: {
    backgroundColor: THEME.COLORS.CARD,
    borderRadius: THEME.BORDER_RADIUS.MEDIUM,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  mealImage: {
    width: '100%',
    height: 180,
  },
  mealContent: {
    padding: 12,
  },
  mealTitle: {
    fontSize: THEME.SIZES.LARGE,
    fontWeight: 'bold',
    color: THEME.COLORS.TEXT,
    marginBottom: 4,
  },
  mealDescription: {
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
  mealActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingTop: 12,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  actionText: {
    fontSize: THEME.SIZES.SMALL,
    color: THEME.COLORS.TEXT_SECONDARY,
    marginLeft: 4,
  },
  mealSeparator: {
    height: 16,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
});

export default InfluencerProfileScreen;
