import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../config';
import SearchBar from './SearchBar';
import DefaultAvatar from './DefaultAvatar';

const SearchModal = ({ visible, onClose, onSearchSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'influencers', 'meals', 'workouts'

  // Mock data for demonstration
  const mockInfluencers = [
    { id: 'inf1', type: 'influencer', name: 'Fitness Pro', username: '@fitnesspro', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { id: 'inf2', type: 'influencer', name: 'Nutrition Expert', username: '@nutritionexpert', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
  ];

  const mockMeals = [
    { id: 'meal1', type: 'meal', title: 'Protein Pancakes', calories: 350, image: 'https://source.unsplash.com/random/300x300?pancakes' },
    { id: 'meal2', type: 'meal', title: 'Avocado Toast', calories: 280, image: 'https://source.unsplash.com/random/300x300?avocado' },
  ];

  const mockWorkouts = [
    { id: 'workout1', type: 'workout', title: 'HIIT Cardio', duration: '30 min', image: 'https://source.unsplash.com/random/300x300?workout' },
    { id: 'workout2', type: 'workout', title: 'Full Body Strength', duration: '45 min', image: 'https://source.unsplash.com/random/300x300?strength' },
  ];

  // Perform search when query changes
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      setLoading(true);

      // Simulate API call delay
      setTimeout(() => {
        const query = searchQuery.toLowerCase();
        let results = [];

        // Filter based on active tab
        if (activeTab === 'all' || activeTab === 'influencers') {
          const filteredInfluencers = mockInfluencers.filter(
            inf => inf.name.toLowerCase().includes(query) || inf.username.toLowerCase().includes(query)
          );
          results = [...results, ...filteredInfluencers];
        }

        if (activeTab === 'all' || activeTab === 'meals') {
          const filteredMeals = mockMeals.filter(
            meal => meal.title.toLowerCase().includes(query)
          );
          results = [...results, ...filteredMeals];
        }

        if (activeTab === 'all' || activeTab === 'workouts') {
          const filteredWorkouts = mockWorkouts.filter(
            workout => workout.title.toLowerCase().includes(query)
          );
          results = [...results, ...filteredWorkouts];
        }

        setSearchResults(results);
        setLoading(false);
      }, 500);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, activeTab]);

  const handleSearch = () => {
    if (searchQuery.trim().length > 0) {
      // Save to recent searches
      const newRecentSearches = [
        { id: Date.now().toString(), query: searchQuery },
        ...recentSearches.filter(item => item.query !== searchQuery).slice(0, 4)
      ];
      setRecentSearches(newRecentSearches);

      // Call the parent's search handler
      if (onSearchSubmit) {
        onSearchSubmit(searchQuery);
      }
    }
  };

  const handleClearRecents = () => {
    setRecentSearches([]);
  };

  const renderSearchResult = ({ item }) => {
    switch (item.type) {
      case 'influencer':
        return (
          <TouchableOpacity style={styles.resultItem}>
            <View style={styles.resultAvatar}>
              {item.avatar ? (
                <View style={styles.avatarContainer}>
                  <Ionicons name="person" size={16} color="#FFFFFF" style={styles.typeIcon} />
                  <Image
                    source={{ uri: item.avatar }}
                    style={styles.avatarImage}
                  />
                </View>
              ) : (
                <DefaultAvatar name={item.name} size={50} />
              )}
            </View>
            <View style={styles.resultInfo}>
              <Text style={styles.resultTitle}>{item.name}</Text>
              <Text style={styles.resultSubtitle}>{item.username}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={THEME.COLORS.TEXT_SECONDARY} />
          </TouchableOpacity>
        );

      case 'meal':
        return (
          <TouchableOpacity style={styles.resultItem}>
            <View style={styles.resultAvatar}>
              <View style={styles.avatarContainer}>
                <Ionicons name="restaurant" size={16} color="#FFFFFF" style={styles.typeIcon} />
                <Image
                  source={{ uri: item.image }}
                  style={styles.avatarImage}
                />
              </View>
            </View>
            <View style={styles.resultInfo}>
              <Text style={styles.resultTitle}>{item.title}</Text>
              <Text style={styles.resultSubtitle}>{item.calories} calories</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={THEME.COLORS.TEXT_SECONDARY} />
          </TouchableOpacity>
        );

      case 'workout':
        return (
          <TouchableOpacity style={styles.resultItem}>
            <View style={styles.resultAvatar}>
              <View style={styles.avatarContainer}>
                <Ionicons name="fitness" size={16} color="#FFFFFF" style={styles.typeIcon} />
                <Image
                  source={{ uri: item.image }}
                  style={styles.avatarImage}
                />
              </View>
            </View>
            <View style={styles.resultInfo}>
              <Text style={styles.resultTitle}>{item.title}</Text>
              <Text style={styles.resultSubtitle}>{item.duration}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={THEME.COLORS.TEXT_SECONDARY} />
          </TouchableOpacity>
        );

      default:
        return null;
    }
  };

  const renderRecentSearch = ({ item }) => (
    <TouchableOpacity
      style={styles.recentItem}
      onPress={() => setSearchQuery(item.query)}
    >
      <Ionicons name="time-outline" size={20} color={THEME.COLORS.TEXT_SECONDARY} />
      <Text style={styles.recentText}>{item.query}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="arrow-back" size={24} color={THEME.COLORS.TEXT} />
            </TouchableOpacity>

            <View style={styles.searchBarContainer}>
              <SearchBar
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmit={handleSearch}
                placeholder="Search..."
                onClear={() => setSearchQuery('')}
                autoFocus
              />
            </View>
          </View>

          {/* Filter Tabs */}
          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'all' && styles.activeTab]}
              onPress={() => setActiveTab('all')}
            >
              <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>All</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tab, activeTab === 'influencers' && styles.activeTab]}
              onPress={() => setActiveTab('influencers')}
            >
              <Text style={[styles.tabText, activeTab === 'influencers' && styles.activeTabText]}>Influencers</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tab, activeTab === 'meals' && styles.activeTab]}
              onPress={() => setActiveTab('meals')}
            >
              <Text style={[styles.tabText, activeTab === 'meals' && styles.activeTabText]}>Meals</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tab, activeTab === 'workouts' && styles.activeTab]}
              onPress={() => setActiveTab('workouts')}
            >
              <Text style={[styles.tabText, activeTab === 'workouts' && styles.activeTabText]}>Workouts</Text>
            </TouchableOpacity>
          </View>

          {/* Content */}
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={THEME.COLORS.PRIMARY} />
            </View>
          ) : searchQuery.trim().length > 0 ? (
            <FlatList
              data={searchResults}
              renderItem={renderSearchResult}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.resultsContainer}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Ionicons name="search" size={48} color={THEME.COLORS.TEXT_SECONDARY} />
                  <Text style={styles.emptyText}>No results found</Text>
                  <Text style={styles.emptySubtext}>Try a different search term</Text>
                </View>
              }
            />
          ) : (
            <View style={styles.recentsContainer}>
              <View style={styles.recentsHeader}>
                <Text style={styles.recentsTitle}>Recent Searches</Text>
                {recentSearches.length > 0 && (
                  <TouchableOpacity onPress={handleClearRecents}>
                    <Text style={styles.clearText}>Clear All</Text>
                  </TouchableOpacity>
                )}
              </View>

              <FlatList
                data={recentSearches}
                renderItem={renderRecentSearch}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.recentsList}
                ListEmptyComponent={
                  <View style={styles.emptyRecents}>
                    <Text style={styles.emptyRecentsText}>No recent searches</Text>
                  </View>
                }
              />
            </View>
          )}
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </Modal>
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
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  closeButton: {
    padding: 8,
    marginRight: 8,
  },
  searchBarContainer: {
    flex: 1,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: THEME.COLORS.PRIMARY,
  },
  tabText: {
    fontSize: THEME.SIZES.MEDIUM,
    color: THEME.COLORS.TEXT_SECONDARY,
  },
  activeTabText: {
    color: THEME.COLORS.PRIMARY,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultsContainer: {
    paddingVertical: 8,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  resultAvatar: {
    marginRight: 16,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    position: 'relative',
  },
  typeIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: THEME.COLORS.PRIMARY,
    borderRadius: 10,
    padding: 2,
    zIndex: 1,
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  resultInfo: {
    flex: 1,
  },
  resultTitle: {
    fontSize: THEME.SIZES.MEDIUM,
    fontWeight: 'bold',
    color: THEME.COLORS.TEXT,
  },
  resultSubtitle: {
    fontSize: THEME.SIZES.SMALL,
    color: THEME.COLORS.TEXT_SECONDARY,
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
  recentsContainer: {
    flex: 1,
  },
  recentsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  recentsTitle: {
    fontSize: THEME.SIZES.MEDIUM,
    fontWeight: 'bold',
    color: THEME.COLORS.TEXT,
  },
  clearText: {
    fontSize: THEME.SIZES.SMALL,
    color: THEME.COLORS.PRIMARY,
  },
  recentsList: {
    paddingHorizontal: 16,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  recentText: {
    fontSize: THEME.SIZES.MEDIUM,
    color: THEME.COLORS.TEXT,
    marginLeft: 12,
  },
  emptyRecents: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyRecentsText: {
    fontSize: THEME.SIZES.MEDIUM,
    color: THEME.COLORS.TEXT_SECONDARY,
  },
});

export default SearchModal;
