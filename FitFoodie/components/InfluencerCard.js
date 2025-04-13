import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../config';

/**
 * InfluencerCard - A reusable component for displaying influencer information
 * 
 * @param {Object} influencer - The influencer data object
 * @param {Function} onPress - Function to call when the card is pressed
 * @param {Function} onFollowPress - Function to call when the follow button is pressed
 * @param {Boolean} compact - Whether to show a compact version of the card (optional)
 */
const InfluencerCard = ({ influencer, onPress, onFollowPress, compact = false }) => {
  if (!influencer) return null;
  
  return (
    <TouchableOpacity 
      style={[styles.container, compact && styles.compactContainer]} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image 
        source={{ uri: influencer.avatar }} 
        style={[styles.avatar, compact && styles.compactAvatar]} 
      />
      
      <View style={styles.infoContainer}>
        <View style={styles.nameContainer}>
          <Text style={styles.name} numberOfLines={1}>{influencer.name}</Text>
          {influencer.isVerified && (
            <Ionicons 
              name="checkmark-circle" 
              size={compact ? 14 : 16} 
              color={THEME.COLORS.PRIMARY} 
              style={styles.verifiedIcon} 
            />
          )}
        </View>
        
        <Text style={styles.username} numberOfLines={1}>{influencer.username}</Text>
        
        {!compact && (
          <Text style={styles.specialty} numberOfLines={1}>{influencer.specialty}</Text>
        )}
        
        {!compact && (
          <Text style={styles.followers} numberOfLines={1}>
            {influencer.followers.toLocaleString()} followers
          </Text>
        )}
      </View>
      
      <TouchableOpacity 
        style={[
          styles.followButton, 
          influencer.isFollowing && styles.followingButton,
          compact && styles.compactFollowButton
        ]} 
        onPress={() => onFollowPress(influencer.id)}
      >
        <Text 
          style={[
            styles.followButtonText, 
            influencer.isFollowing && styles.followingButtonText
          ]}
        >
          {influencer.isFollowing ? 'Following' : 'Follow'}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.COLORS.CARD,
    borderRadius: THEME.BORDER_RADIUS.MEDIUM,
    padding: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  compactContainer: {
    padding: 8,
    marginBottom: 8,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  compactAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
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
  followers: {
    fontSize: THEME.SIZES.SMALL,
    color: THEME.COLORS.TEXT_SECONDARY,
    marginTop: 2,
  },
  followButton: {
    backgroundColor: THEME.COLORS.PRIMARY,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: THEME.BORDER_RADIUS.MEDIUM,
  },
  followingButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: THEME.COLORS.PRIMARY,
  },
  compactFollowButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  followButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: THEME.SIZES.SMALL,
  },
  followingButtonText: {
    color: THEME.COLORS.PRIMARY,
  },
});

export default InfluencerCard;
