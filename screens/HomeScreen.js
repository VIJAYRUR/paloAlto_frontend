import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import LoadingIndicator from '../components/LoadingIndicator';
import ActivityIndicatorExample from '../components/ActivityIndicatorExample';

const HomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

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
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>FitFoodie</Text>
        <Text style={styles.subtitle}>Discover influencer meals and nutrition</Text>
      </View>

      <View style={styles.featuredSection}>
        <Text style={styles.sectionTitle}>Featured Meals</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.featuredScroll}>
          {[1, 2, 3].map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.featuredItem}
              onPress={() => console.log('Meal details')}
            >
              <View style={styles.imagePlaceholder}>
                <Text style={styles.placeholderText}>Meal Image</Text>
              </View>
              <Text style={styles.mealTitle}>Healthy Breakfast Bowl</Text>
              <Text style={styles.influencerName}>by FitChef</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Trending Influencers</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.influencerScroll}>
          {[1, 2, 3, 4].map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.influencerItem}
              onPress={() => console.log('Influencer profile')}
            >
              <View style={styles.influencerAvatar}>
                <Text style={styles.avatarText}>Profile</Text>
              </View>
              <Text style={styles.influencerName}>FitChef</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Recommendations</Text>
        <TouchableOpacity
          style={styles.recommendationBanner}
          onPress={() => navigation.navigate('Recommendations')}
        >
          <Text style={styles.bannerText}>View your personalized meal plan</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  featuredSection: {
    padding: 20,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  featuredScroll: {
    marginLeft: -10,
  },
  featuredItem: {
    width: 250,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
  mealTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
    paddingBottom: 5,
  },
  influencerName: {
    fontSize: 14,
    color: '#666',
    padding: 10,
    paddingTop: 0,
  },
  influencerScroll: {
    marginLeft: -10,
  },
  influencerItem: {
    alignItems: 'center',
    marginHorizontal: 10,
    width: 80,
  },
  influencerAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  avatarText: {
    color: '#999',
  },
  recommendationBanner: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  bannerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default HomeScreen;
