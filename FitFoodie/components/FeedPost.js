import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../config';
import DefaultAvatar from './DefaultAvatar';

const FeedPost = ({ post, onPostPress, onLikePress, onCommentPress, onSavePress, onSharePress, onUserPress }) => {
  return (
    <View style={styles.container}>
      {/* Post Header */}
      <TouchableOpacity
        style={styles.header}
        onPress={() => onUserPress(post.user.id)}
      >
        {post.user.avatar ? (
          <Image
            source={{ uri: post.user.avatar }}
            style={styles.avatar}
          />
        ) : (
          <DefaultAvatar name={post.user.name} size={36} style={styles.avatar} />
        )}
        <View style={styles.headerInfo}>
          <Text style={styles.username}>{post.user.name}</Text>
          <Text style={styles.location}>{post.location || post.user.specialty}</Text>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <Ionicons name="ellipsis-horizontal" size={20} color={THEME.COLORS.TEXT} />
        </TouchableOpacity>
      </TouchableOpacity>

      {/* Post Image */}
      <TouchableOpacity activeOpacity={0.95} onPress={() => onPostPress(post.id)}>
        <Image
          source={{ uri: post.image_url }}
          style={styles.postImage}
          resizeMode="cover"
        />
      </TouchableOpacity>

      {/* Post Actions */}
      <View style={styles.actions}>
        <View style={styles.leftActions}>
          <TouchableOpacity style={styles.actionButton} onPress={() => onLikePress(post.id)}>
            <Ionicons
              name={post.isLiked ? "heart" : "heart-outline"}
              size={24}
              color={post.isLiked ? THEME.COLORS.ERROR : THEME.COLORS.TEXT}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => onCommentPress(post.id)}>
            <Ionicons name="chatbubble-outline" size={22} color={THEME.COLORS.TEXT} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => onSharePress(post.id)}>
            <Ionicons name="paper-plane-outline" size={22} color={THEME.COLORS.TEXT} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => onSavePress(post.id)}>
          <Ionicons
            name={post.isSaved ? "bookmark" : "bookmark-outline"}
            size={24}
            color={THEME.COLORS.TEXT}
          />
        </TouchableOpacity>
      </View>

      {/* Likes */}
      <Text style={styles.likes}>{post.likes} likes</Text>

      {/* Caption */}
      <View style={styles.captionContainer}>
        <Text style={styles.captionUsername}>{post.user.name}</Text>
        <Text style={styles.caption}>{post.description}</Text>
      </View>

      {/* Comments */}
      {post.comments && post.comments.length > 0 && (
        <TouchableOpacity onPress={() => onCommentPress(post.id)}>
          <Text style={styles.viewComments}>
            View all {post.comments.length} comments
          </Text>
        </TouchableOpacity>
      )}

      {/* Macros - Only show for food posts, not workout posts */}
      {(post.calories || post.protein || post.carbs || post.fat) && (
        <View style={styles.macrosContainer}>
          <View style={styles.macrosHeader}>
            <Ionicons name="nutrition-outline" size={16} color={THEME.COLORS.PRIMARY} />
            <Text style={styles.macrosTitle}>Nutrition Facts</Text>
          </View>
          <View style={styles.macrosContent}>
            {post.calories && (
              <View style={styles.macroItem}>
                <Text style={styles.macroValue}>{post.calories}</Text>
                <Text style={styles.macroLabel}>Calories</Text>
              </View>
            )}
            {post.protein && (
              <View style={styles.macroItem}>
                <Text style={styles.macroValue}>{post.protein}g</Text>
                <Text style={styles.macroLabel}>Protein</Text>
              </View>
            )}
            {post.carbs && (
              <View style={styles.macroItem}>
                <Text style={styles.macroValue}>{post.carbs}g</Text>
                <Text style={styles.macroLabel}>Carbs</Text>
              </View>
            )}
            {post.fat && (
              <View style={styles.macroItem}>
                <Text style={styles.macroValue}>{post.fat}g</Text>
                <Text style={styles.macroLabel}>Fat</Text>
              </View>
            )}
          </View>
        </View>
      )}

      {/* Timestamp */}
      <Text style={styles.timestamp}>{post.timestamp || '2 hours ago'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.COLORS.CARD,
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
  },
  username: {
    fontWeight: 'bold',
    fontSize: THEME.SIZES.MEDIUM,
    color: THEME.COLORS.TEXT,
  },
  location: {
    fontSize: THEME.SIZES.SMALL,
    color: THEME.COLORS.TEXT_SECONDARY,
  },
  moreButton: {
    padding: 4,
  },
  postImage: {
    width: '100%',
    height: 400,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  leftActions: {
    flexDirection: 'row',
  },
  actionButton: {
    marginRight: 16,
  },
  likes: {
    fontWeight: 'bold',
    paddingHorizontal: 12,
    marginBottom: 6,
    color: THEME.COLORS.TEXT,
  },
  captionContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    marginBottom: 6,
  },
  captionUsername: {
    fontWeight: 'bold',
    marginRight: 6,
    color: THEME.COLORS.TEXT,
  },
  caption: {
    flex: 1,
    color: THEME.COLORS.TEXT,
  },
  viewComments: {
    color: THEME.COLORS.TEXT_SECONDARY,
    paddingHorizontal: 12,
    marginBottom: 6,
  },
  macrosContainer: {
    backgroundColor: '#F9F9F9',
    borderRadius: THEME.BORDER_RADIUS.SMALL,
    padding: 12,
    margin: 12,
  },
  macrosHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    paddingBottom: 8,
  },
  macrosTitle: {
    fontSize: THEME.SIZES.MEDIUM,
    fontWeight: 'bold',
    color: THEME.COLORS.PRIMARY,
    marginLeft: 6,
  },
  macrosContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 4,
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
  timestamp: {
    fontSize: THEME.SIZES.SMALL - 2,
    color: THEME.COLORS.TEXT_SECONDARY,
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
});

export default FeedPost;
