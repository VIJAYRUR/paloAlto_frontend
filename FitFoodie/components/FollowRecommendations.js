import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../config';
import DefaultAvatar from './DefaultAvatar';

const FollowRecommendations = ({ recommendations, onFollowPress, onProfilePress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Suggested for you</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {recommendations.map((influencer) => (
          <View key={influencer.id} style={styles.card}>
            <TouchableOpacity
              style={styles.profileSection}
              onPress={() => onProfilePress(influencer.id)}
            >
              {influencer.avatar ? (
                <Image
                  source={{ uri: influencer.avatar }}
                  style={styles.avatar}
                />
              ) : (
                <DefaultAvatar name={influencer.name} size={80} style={styles.avatar} />
              )}
              <Text style={styles.name} numberOfLines={1}>{influencer.name}</Text>
              <Text style={styles.specialty} numberOfLines={1}>{influencer.specialty}</Text>
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{influencer.followers}</Text>
                  <Text style={styles.statLabel}>Followers</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{influencer.posts?.length || 0}</Text>
                  <Text style={styles.statLabel}>Posts</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.followButton}
              onPress={() => onFollowPress(influencer.id)}
            >
              <Text style={styles.followButtonText}>Follow</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    backgroundColor: THEME.COLORS.CARD,
    paddingVertical: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  title: {
    fontSize: THEME.SIZES.MEDIUM,
    fontWeight: 'bold',
    color: THEME.COLORS.TEXT,
  },
  seeAllText: {
    fontSize: THEME.SIZES.SMALL,
    color: THEME.COLORS.PRIMARY,
    fontWeight: '500',
  },
  scrollContent: {
    paddingHorizontal: 8,
  },
  card: {
    width: 160,
    backgroundColor: THEME.COLORS.CARD,
    borderRadius: THEME.BORDER_RADIUS.MEDIUM,
    marginHorizontal: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  profileSection: {
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  name: {
    fontSize: THEME.SIZES.MEDIUM,
    fontWeight: 'bold',
    color: THEME.COLORS.TEXT,
    textAlign: 'center',
  },
  specialty: {
    fontSize: THEME.SIZES.SMALL,
    color: THEME.COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    marginBottom: 8,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: THEME.SIZES.SMALL,
    fontWeight: 'bold',
    color: THEME.COLORS.TEXT,
  },
  statLabel: {
    fontSize: THEME.SIZES.SMALL - 2,
    color: THEME.COLORS.TEXT_SECONDARY,
  },
  followButton: {
    backgroundColor: THEME.COLORS.PRIMARY,
    paddingVertical: 8,
    borderRadius: THEME.BORDER_RADIUS.SMALL,
    alignItems: 'center',
  },
  followButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: THEME.SIZES.SMALL,
  },
});

export default FollowRecommendations;
