import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../config';
import StoryCircle from './StoryCircle';

const StoriesSection = ({ stories, onStoryPress, onAddStoryPress }) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Add Story Button */}
        <TouchableOpacity style={styles.addStoryContainer} onPress={onAddStoryPress} activeOpacity={0.8}>
          <View style={styles.addStoryCircle}>
            <Ionicons name="add" size={30} color={THEME.COLORS.PRIMARY} />
          </View>
          <Text style={styles.addStoryText}>Your Story</Text>
        </TouchableOpacity>

        {/* Stories */}
        {stories.map((story) => (
          <StoryCircle
            key={story.id}
            user={story.user}
            hasUnseenStory={story.hasUnseenContent}
            onPress={() => onStoryPress(story)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.COLORS.CARD,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  scrollContent: {
    paddingHorizontal: 8,
  },
  addStoryContainer: {
    alignItems: 'center',
    marginHorizontal: 8,
    width: 80,
  },
  addStoryCircle: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
  },
  addStoryText: {
    marginTop: 4,
    fontSize: THEME.SIZES.SMALL,
    textAlign: 'center',
    color: THEME.COLORS.TEXT,
    fontWeight: '500',
  },
});

export default StoriesSection;
