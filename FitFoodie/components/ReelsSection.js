import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../config';
import DefaultAvatar from './DefaultAvatar';

const { width } = Dimensions.get('window');
const REEL_WIDTH = width * 0.6;
const REEL_HEIGHT = REEL_WIDTH * 1.7;

const ReelsSection = ({ reels, onReelPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Reels</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {reels.map((reel) => (
          <TouchableOpacity
            key={reel.id}
            style={styles.reelCard}
            onPress={() => onReelPress(reel)}
            activeOpacity={0.9}
          >
            <Image
              source={{ uri: reel.thumbnail }}
              style={styles.thumbnail}
              resizeMode="cover"
            />
            <View style={styles.overlay}>
              <View style={styles.userInfo}>
                {reel.user.avatar ? (
                  <Image
                    source={{ uri: reel.user.avatar }}
                    style={styles.avatar}
                  />
                ) : (
                  <DefaultAvatar name={reel.user.name} size={24} style={styles.avatar} />
                )}
                <Text style={styles.username} numberOfLines={1}>{reel.user.name}</Text>
              </View>

              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Ionicons name="play" size={16} color="#FFFFFF" />
                  <Text style={styles.statText}>{reel.views}</Text>
                </View>
                <View style={styles.statItem}>
                  <Ionicons name="heart" size={16} color="#FFFFFF" />
                  <Text style={styles.statText}>{reel.likes}</Text>
                </View>
              </View>

              <Text style={styles.caption} numberOfLines={2}>{reel.caption}</Text>
            </View>

            <View style={styles.playButton}>
              <Ionicons name="play" size={24} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
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
  reelCard: {
    width: REEL_WIDTH,
    height: REEL_HEIGHT,
    marginHorizontal: 8,
    borderRadius: THEME.BORDER_RADIUS.MEDIUM,
    overflow: 'hidden',
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  username: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: THEME.SIZES.SMALL,
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  statText: {
    color: '#FFFFFF',
    fontSize: THEME.SIZES.SMALL - 2,
    marginLeft: 4,
  },
  caption: {
    color: '#FFFFFF',
    fontSize: THEME.SIZES.SMALL,
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -25,
    marginTop: -25,
  },
});

export default ReelsSection;
