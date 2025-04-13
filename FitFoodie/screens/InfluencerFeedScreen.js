import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Alert,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../config';
import LoadingIndicator from '../components/LoadingIndicator';
import SearchBar from '../components/SearchBar';
import InfluencerCard from '../components/InfluencerCard';
import StoriesSection from '../components/StoriesSection';
import FollowRecommendations from '../components/FollowRecommendations';
import ReelsSection from '../components/ReelsSection';
import FeedPost from '../components/FeedPost';
import SearchModal from '../components/SearchModal';
import { getInfluencers, toggleFollowInfluencer, getInfluencerSpecialties } from '../services/influencerService';

const InfluencerFeedScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [influencers, setInfluencers] = useState([]);
  const [followedInfluencers, setFollowedInfluencers] = useState([]);
  const [recommendedInfluencers, setRecommendedInfluencers] = useState([]);
  const [stories, setStories] = useState([]);
  const [reels, setReels] = useState([]);
  const [feedPosts, setFeedPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [specialties, setSpecialties] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [sortByFollowers, setSortByFollowers] = useState(false);
  const [error, setError] = useState(null);
  const [followLoading, setFollowLoading] = useState(false);
  const [searchModalVisible, setSearchModalVisible] = useState(false);

  useEffect(() => {
    fetchInfluencers();
    fetchSpecialties();
    fetchMockData();
  }, []);

  // This function is temporary to generate mock data for UI demonstration
  const fetchMockData = () => {
    // Real influencer names and specialties
    const influencerProfiles = [
      { name: 'Emma Wilson', specialty: 'Nutrition Coach', gender: 'women', num: 1 },
      { name: 'Alex Rodriguez', specialty: 'CrossFit Trainer', gender: 'men', num: 2 },
      { name: 'Sophia Chen', specialty: 'Yoga Instructor', gender: 'women', num: 3 },
      { name: 'Marcus Johnson', specialty: 'Bodybuilding', gender: 'men', num: 4 },
      { name: 'Olivia Taylor', specialty: 'Plant-Based Diet', gender: 'women', num: 5 },
      { name: 'James Wilson', specialty: 'HIIT Specialist', gender: 'men', num: 6 },
      { name: 'Ava Martinez', specialty: 'Pilates Instructor', gender: 'women', num: 7 },
      { name: 'Daniel Kim', specialty: 'Strength Coach', gender: 'men', num: 8 },
      { name: 'Mia Johnson', specialty: 'Meal Prep Expert', gender: 'women', num: 9 },
      { name: 'Ethan Brown', specialty: 'Calisthenics', gender: 'men', num: 10 },
    ];

    // High-quality fitness and food images
    const fitnessImages = [
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1535914254981-b5012eebbd15?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1518310383802-640c2de311b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1599058917212-d750089bc07e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80',
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80',
    ];

    const foodImages = [
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80',
      'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1153&q=80',
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1606756790138-261d2b21cd75?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1494390248081-4e521a5940db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1106&q=80',
      'https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1081&q=80',
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
    ];

    // Video thumbnails with play button overlay (these are actually images but represent video thumbnails)
    const videoThumbnails = [
      'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80',
      'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1607962837359-5e7e89f86776?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1565992441121-4367c2967103?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=627&q=80',
      'https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      'https://images.unsplash.com/photo-1604480132736-44c188fe4d20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    ];

    // Realistic captions
    const workoutCaptions = [
      'Just finished this killer HIIT session! 20 minutes, full body burn 🔥',
      'Morning yoga flow to start the day right. Who else loves morning workouts?',
      'Try this 15-minute ab circuit - no equipment needed! Swipe for all exercises.',
      'Back day! Building strength with these 5 essential moves.',
      'Recovery is just as important as the workout. Stretching routine in my stories!',
      'This bodyweight routine is perfect for travel. No excuses!',
      'Leg day never gets easier, you just get stronger 💪',
      'Quick arm burnout to finish today\'s session. Try 3 sets of these moves!',
    ];

    const mealCaptions = [
      'Protein-packed breakfast bowl: 35g protein, 45g carbs, 12g fat. Recipe in bio!',
      'Meal prep Sunday! These containers have saved me this week.',
      'Simple post-workout smoothie with 30g protein and all the antioxidants.',
      'Balanced dinner plate: lean protein, complex carbs, and lots of veggies.',
      'Healthy swaps that don\'t sacrifice flavor! Which would you try?',
      'Plant-based protein sources that keep me full all day.',
      'Homemade energy bars - perfect pre-workout fuel and no artificial ingredients.',
      'Hydration is key! My favorite infused water combinations for summer.',
    ];

    // Mock stories data with real influencer profiles
    const mockStories = influencerProfiles.map((profile, i) => ({
      id: `story-${i}`,
      user: {
        id: `user-${i}`,
        name: profile.name,
        avatar: `https://randomuser.me/api/portraits/${profile.gender}/${profile.num}.jpg`,
      },
      hasUnseenContent: i % 3 === 0,
    }));

    // Mock reels data with video thumbnails
    const mockReels = videoThumbnails.map((thumbnail, i) => {
      const profile = influencerProfiles[i % influencerProfiles.length];
      const isWorkout = i % 2 === 0;
      return {
        id: `reel-${i}`,
        thumbnail: thumbnail,
        views: Math.floor(Math.random() * 10000) + 1000,
        likes: Math.floor(Math.random() * 1000) + 100,
        caption: isWorkout ? workoutCaptions[i % workoutCaptions.length] : mealCaptions[i % mealCaptions.length],
        user: {
          id: `user-${i}`,
          name: profile.name,
          avatar: `https://randomuser.me/api/portraits/${profile.gender}/${profile.num}.jpg`,
        },
      };
    });

    // Mock feed posts with fitness and food images
    const mockPosts = [];

    for (let i = 0; i < 15; i++) {
      const profile = influencerProfiles[i % influencerProfiles.length];
      const isWorkout = i % 2 === 0;
      const image = isWorkout ?
        fitnessImages[i % fitnessImages.length] :
        foodImages[i % foodImages.length];
      const caption = isWorkout ?
        workoutCaptions[i % workoutCaptions.length] :
        mealCaptions[i % mealCaptions.length];

      mockPosts.push({
        id: `post-${i}`,
        image_url: image,
        description: caption,
        likes: Math.floor(Math.random() * 500) + 50,
        comments: Array.from({ length: Math.floor(Math.random() * 10) + 1 }, (_, j) => ({
          id: `comment-${i}-${j}`,
          text: j % 3 === 0 ? 'This looks amazing! Definitely trying it.' :
                j % 3 === 1 ? 'Thanks for sharing! What\'s your favorite part of this routine?' :
                'Just what I needed today! 🙌',
          user: {
            id: `commenter-${j}`,
            name: influencerProfiles[(i + j) % influencerProfiles.length].name
          },
        })),
        isLiked: i % 5 === 0,
        isSaved: i % 7 === 0,
        timestamp: `${Math.floor(Math.random() * 23) + 1}h ago`,
        user: {
          id: `user-${i % 10}`,
          name: profile.name,
          avatar: `https://randomuser.me/api/portraits/${profile.gender}/${profile.num}.jpg`,
          specialty: profile.specialty,
        },
        calories: isWorkout ? null : Math.floor(Math.random() * 600) + 200,
        protein: isWorkout ? null : Math.floor(Math.random() * 40) + 10,
        carbs: isWorkout ? null : Math.floor(Math.random() * 50) + 20,
        fat: isWorkout ? null : Math.floor(Math.random() * 30) + 5,
      });
    }

    setStories(mockStories);
    setReels(mockReels);
    setFeedPosts(mockPosts);

    // Create mock influencer data if API hasn't loaded yet
    if (influencers.length === 0) {
      const mockInfluencers = influencerProfiles.map((profile, i) => ({
        id: `inf-${i}`,
        name: profile.name,
        username: `@${profile.name.toLowerCase().replace(' ', '')}`,
        avatar: `https://randomuser.me/api/portraits/${profile.gender}/${profile.num}.jpg`,
        isVerified: i < 3, // First 3 are verified
        specialty: profile.specialty,
        followers: Math.floor(Math.random() * 50000) + 1000,
        following: Math.floor(Math.random() * 500) + 100,
        posts: Math.floor(Math.random() * 100) + 10,
        isFollowing: i < 5, // First 5 are followed
        bio: `${profile.specialty} | Fitness enthusiast | Sharing my journey and tips for a healthier lifestyle`,
        coverImage: fitnessImages[i % fitnessImages.length],
        socialMedia: {
          instagram: `@${profile.name.toLowerCase().replace(' ', '')}`,
          twitter: `@${profile.name.toLowerCase().replace(' ', '')}_fit`,
          website: `https://www.${profile.name.toLowerCase().replace(' ', '')}.com`
        },
        meals: []
      }));

      // Split mock influencers into followed and recommended
      const followed = mockInfluencers.filter(inf => inf.isFollowing);
      const recommended = mockInfluencers.filter(inf => !inf.isFollowing);

      setInfluencers(mockInfluencers);
      setFollowedInfluencers(followed);
      setRecommendedInfluencers(recommended);
    } else {
      // Split real influencers into followed and recommended
      const followed = influencers.filter(inf => inf.isFollowing);
      const recommended = influencers.filter(inf => !inf.isFollowing).slice(0, 10);

      setFollowedInfluencers(followed);
      setRecommendedInfluencers(recommended);
    }
  };

  const fetchInfluencers = async (options = {}) => {
    try {
      setError(null);
      const response = await getInfluencers({
        search: searchQuery,
        specialty: selectedSpecialty,
        sortBy: sortByFollowers ? 'followers' : undefined,
        ...options
      });
      setInfluencers(response.influencers);

      // Split influencers into followed and recommended
      const followed = response.influencers.filter(inf => inf.isFollowing);
      const recommended = response.influencers.filter(inf => !inf.isFollowing).slice(0, 10);

      setFollowedInfluencers(followed);
      setRecommendedInfluencers(recommended);
    } catch (error) {
      console.error('Error fetching influencers:', error);
      setError('Failed to load influencers. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const fetchSpecialties = async () => {
    try {
      const specialtiesList = await getInfluencerSpecialties();
      setSpecialties(specialtiesList);
    } catch (error) {
      console.error('Error fetching specialties:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    fetchInfluencers();
  };

  const handleSearch = () => {
    setLoading(true);
    fetchInfluencers();
  };

  const clearSearch = () => {
    setSearchQuery('');
    setLoading(true);
    fetchInfluencers({ search: '' });
  };

  const handleSpecialtyFilter = (specialty) => {
    setSelectedSpecialty(selectedSpecialty === specialty ? null : specialty);
    setLoading(true);
    fetchInfluencers({
      specialty: selectedSpecialty === specialty ? null : specialty
    });
  };

  const toggleSort = () => {
    setSortByFollowers(!sortByFollowers);
    setLoading(true);
    fetchInfluencers({ sortBy: !sortByFollowers ? 'followers' : undefined });
  };

  const handleFollowPress = async (influencerId) => {
    if (followLoading) return;

    setFollowLoading(true);
    try {
      await toggleFollowInfluencer(influencerId);

      // Update the local state to reflect the change
      const updateInfluencerList = (list) => {
        return list.map(inf => {
          if (inf.id === influencerId) {
            const isNowFollowing = !inf.isFollowing;
            return {
              ...inf,
              isFollowing: isNowFollowing,
              followers: isNowFollowing ? inf.followers + 1 : inf.followers - 1
            };
          }
          return inf;
        });
      };

      setInfluencers(updateInfluencerList);
      setFollowedInfluencers(updateInfluencerList(followedInfluencers));
      setRecommendedInfluencers(updateInfluencerList(recommendedInfluencers));

      // If now following, move from recommended to followed
      const influencer = influencers.find(inf => inf.id === influencerId);
      if (influencer && !influencer.isFollowing) {
        setFollowedInfluencers(prev => [...prev, {...influencer, isFollowing: true, followers: influencer.followers + 1}]);
        setRecommendedInfluencers(prev => prev.filter(inf => inf.id !== influencerId));
      }
    } catch (error) {
      console.error('Error toggling follow status:', error);
      Alert.alert('Error', 'Failed to update follow status. Please try again.');
    } finally {
      setFollowLoading(false);
    }
  };

  // Handle story press
  const handleStoryPress = (story) => {
    Alert.alert('Story', `Viewing story from ${story.user.name}`);
    // In a real app, navigate to a story viewer screen
  };

  // Handle add story press
  const handleAddStoryPress = () => {
    Alert.alert('Add Story', 'Create your own story');
    // In a real app, navigate to a story creation screen
  };

  // Handle reel press
  const handleReelPress = (reel) => {
    Alert.alert('Reel', `Viewing reel: ${reel.caption}`);
    // In a real app, navigate to a reel viewer screen
  };

  // Handle post interactions
  const handlePostPress = (postId) => {
    navigation.navigate('MealDetail', { mealId: postId });
  };

  const handleLikePress = (postId) => {
    setFeedPosts(prev =>
      prev.map(post => {
        if (post.id === postId) {
          const isNowLiked = !post.isLiked;
          return {
            ...post,
            isLiked: isNowLiked,
            likes: isNowLiked ? post.likes + 1 : post.likes - 1
          };
        }
        return post;
      })
    );
  };

  const handleCommentPress = (postId) => {
    Alert.alert('Comments', 'View all comments');
    // In a real app, navigate to a comments screen
  };

  const handleSavePress = (postId) => {
    setFeedPosts(prev =>
      prev.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            isSaved: !post.isSaved
          };
        }
        return post;
      })
    );
  };

  const handleSharePress = (postId) => {
    Alert.alert('Share', 'Share this post');
    // In a real app, show a share dialog
  };

  const handleUserPress = (userId) => {
    navigation.navigate('InfluencerProfile', { influencerId: userId });
  };

  // Render feed post
  const renderFeedPost = ({ item }) => (
    <FeedPost
      post={item}
      onPostPress={handlePostPress}
      onLikePress={handleLikePress}
      onCommentPress={handleCommentPress}
      onSavePress={handleSavePress}
      onSharePress={handleSharePress}
      onUserPress={handleUserPress}
    />
  );

  const renderSpecialtyFilter = () => (
    <View style={styles.filtersContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.specialtyFiltersContent}
      >
        {specialties.map((specialty) => (
          <TouchableOpacity
            key={specialty}
            style={[
              styles.specialtyChip,
              selectedSpecialty === specialty && styles.selectedSpecialtyChip
            ]}
            onPress={() => handleSpecialtyFilter(specialty)}
          >
            <Text
              style={[
                styles.specialtyChipText,
                selectedSpecialty === specialty && styles.selectedSpecialtyChipText
              ]}
            >
              {specialty}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={[styles.sortButton, sortByFollowers && styles.sortButtonActive]}
        onPress={toggleSort}
      >
        <Ionicons
          name={sortByFollowers ? "trending-down" : "trending-up"}
          size={18}
          color={sortByFollowers ? THEME.COLORS.PRIMARY : THEME.COLORS.TEXT_SECONDARY}
        />
      </TouchableOpacity>
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
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => {
              Alert.alert(
                'Create New',
                'What would you like to create?',
                [
                  { text: 'Post', onPress: () => Alert.alert('New Post', 'Create a new post') },
                  { text: 'Reel', onPress: () => Alert.alert('New Reel', 'Create a new reel') },
                  { text: 'Story', onPress: () => Alert.alert('New Story', 'Create a new story') },
                  { text: 'Cancel', style: 'cancel' }
                ]
              );
            }}
          >
            <Ionicons name="add" size={28} color={THEME.COLORS.TEXT} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => setSearchModalVisible(true)}
          >
            <Ionicons name="search-outline" size={24} color={THEME.COLORS.TEXT} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => Alert.alert('Notifications', 'View your notifications')}
          >
            <Ionicons name="notifications-outline" size={24} color={THEME.COLORS.TEXT} />
          </TouchableOpacity>
        </View>
      </View>

      {error ? (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={24} color={THEME.COLORS.ERROR} />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={() => fetchInfluencers()}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={feedPosts}
          renderItem={renderFeedPost}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.feedContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[THEME.COLORS.PRIMARY]}
            />
          }
          ListHeaderComponent={
            <>
              {/* Stories Section */}
              <StoriesSection
                stories={stories}
                onStoryPress={handleStoryPress}
                onAddStoryPress={handleAddStoryPress}
              />

              {/* Search Bar removed from here and moved to header */}

              {/* Specialty Filters */}
              {renderSpecialtyFilter()}

              {/* Follow Recommendations if available */}
              {recommendedInfluencers.length > 0 && (
                <FollowRecommendations
                  recommendations={recommendedInfluencers}
                  onFollowPress={handleFollowPress}
                  onProfilePress={(id) => navigation.navigate('InfluencerProfile', { influencerId: id })}
                />
              )}

              {/* Reels Section */}
              {reels.length > 0 && (
                <ReelsSection
                  reels={reels}
                  onReelPress={handleReelPress}
                />
              )}
            </>
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="images-outline" size={48} color={THEME.COLORS.TEXT_SECONDARY} />
              <Text style={styles.emptyText}>No posts found</Text>
              <Text style={styles.emptySubtext}>Follow some influencers to see their posts</Text>
            </View>
          }
        />
      )}

      {followLoading && (
        <View style={styles.followLoadingOverlay}>
          <ActivityIndicator size="small" color={THEME.COLORS.PRIMARY} />
        </View>
      )}

      {/* Search Modal */}
      <SearchModal
        visible={searchModalVisible}
        onClose={() => setSearchModalVisible(false)}
        onSearchSubmit={(query) => {
          setSearchQuery(query);
          setSearchModalVisible(false);
          fetchInfluencers({ search: query });
        }}
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
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    padding: 8,
    marginLeft: 8,
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
  filtersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  specialtyFiltersContent: {
    paddingRight: 16,
    flexGrow: 1,
  },
  specialtyChip: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  selectedSpecialtyChip: {
    backgroundColor: THEME.COLORS.PRIMARY + '10', // 10% opacity
    borderColor: THEME.COLORS.PRIMARY,
  },
  specialtyChipText: {
    fontSize: THEME.SIZES.SMALL,
    color: THEME.COLORS.TEXT_SECONDARY,
  },
  selectedSpecialtyChipText: {
    color: THEME.COLORS.PRIMARY,
    fontWeight: 'bold',
  },
  sortButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sortButtonActive: {
    backgroundColor: THEME.COLORS.PRIMARY + '10', // 10% opacity
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
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: THEME.SIZES.MEDIUM,
    color: THEME.COLORS.ERROR,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: THEME.COLORS.PRIMARY,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: THEME.BORDER_RADIUS.MEDIUM,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: THEME.SIZES.LARGE,
    fontWeight: 'bold',
    color: THEME.COLORS.TEXT,
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: THEME.SIZES.MEDIUM,
    color: THEME.COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    marginTop: 8,
  },
  followLoadingOverlay: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default InfluencerFeedScreen;
