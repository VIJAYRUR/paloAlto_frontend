import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { THEME } from '../config';
import DefaultAvatar from './DefaultAvatar';

const StoryCircle = ({ user, onPress, hasUnseenStory = false }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <View style={[styles.storyRing, hasUnseenStory ? styles.unseenStory : styles.seenStory]}>
        {user.avatar ? (
          <Image
            source={{ uri: user.avatar }}
            style={styles.avatar}
          />
        ) : (
          <DefaultAvatar name={user.name} size={66} style={styles.avatar} />
        )}
      </View>
      <Text style={styles.username} numberOfLines={1}>
        {user.name.split(' ')[0]}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 8,
    width: 80,
  },
  storyRing: {
    width: 74,
    height: 74,
    borderRadius: 37,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
  },
  unseenStory: {
    borderWidth: 2,
    borderColor: THEME.COLORS.PRIMARY,
  },
  seenStory: {
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  avatar: {
    width: 66,
    height: 66,
    borderRadius: 33,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  username: {
    marginTop: 4,
    fontSize: THEME.SIZES.SMALL,
    textAlign: 'center',
    color: THEME.COLORS.TEXT,
    fontWeight: '500',
  },
});

export default StoryCircle;
