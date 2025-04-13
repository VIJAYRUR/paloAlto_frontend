# Influencers Feature Documentation

## Overview
The Influencers feature allows users to discover and follow fitness influencers who share meal plans and recipes. Users can browse influencers, view their profiles, and follow them to stay updated with their content.

## Components

### 1. InfluencerCard
A reusable component for displaying influencer information in a card format.

**Features:**
- Displays influencer avatar, name, verification badge, and specialty
- Shows follower count
- Provides a follow/unfollow button
- Supports compact mode for different display contexts

**Props:**
- `influencer`: Object containing influencer data
- `onPress`: Function to call when the card is pressed
- `onFollowPress`: Function to call when the follow button is pressed
- `compact`: Boolean to toggle compact display mode (optional)

### 2. SearchBar
A reusable search component for filtering influencers.

**Features:**
- Text input for search queries
- Clear button to reset search
- Search icon for visual indication

**Props:**
- `value`: Current search text
- `onChangeText`: Function to call when text changes
- `onSubmit`: Function to call when search is submitted
- `placeholder`: Placeholder text for the search input
- `onClear`: Function to call when the clear button is pressed

### 3. InfluencerService
A service module for handling API calls related to influencers.

**Functions:**
- `getInfluencers(options)`: Get a list of influencers with filtering options
- `getInfluencerById(id)`: Get a specific influencer by ID
- `followInfluencer(id)`: Follow an influencer
- `unfollowInfluencer(id)`: Unfollow an influencer
- `toggleFollowInfluencer(id)`: Toggle follow status for an influencer
- `getInfluencerSpecialties()`: Get a list of influencer specialties for filtering

## Screens

### 1. InfluencerFeedScreen
The main screen for browsing influencers and their content.

**Features:**
- List of influencers with their latest posts
- Search functionality to find influencers by name, username, or specialty
- Filter by specialty using horizontal scrolling chips
- Sort by followers count
- Pull-to-refresh to update the feed
- Error handling with retry option
- Empty state when no influencers match the search/filter criteria

### 2. InfluencerProfileScreen
Detailed view of an influencer's profile.

**Features:**
- Cover image and profile picture
- Influencer name, username, verification badge, and specialty
- Stats (posts, followers, following)
- Follow/unfollow button
- Bio and social media links
- List of featured meals with macros
- Error handling with retry option
- Empty state when no meals are available

## Implementation Status

- [x] Basic influencer feed display
- [x] Influencer profile view
- [x] Follow/unfollow functionality
- [x] Search and filtering
- [x] Error handling
- [ ] Real API integration (currently using mock data)
- [ ] Pagination for large lists
- [ ] Caching for offline access
- [ ] Analytics for tracking user engagement

## Future Enhancements

1. **Advanced Filtering**
   - Filter by meal type (breakfast, lunch, dinner)
   - Filter by dietary preferences (vegan, keto, etc.)
   - Filter by macro ranges

2. **Social Features**
   - Comment on influencer posts
   - Share influencer profiles or meals
   - Rate meals

3. **Personalization**
   - Recommended influencers based on user preferences
   - Personalized feed based on following list
   - Notification system for new posts from followed influencers

## Testing Instructions

1. **Launch the app**
   ```
   cd FitFoodie
   npm start
   ```

2. **Testing the Influencer Feed**
   - The app should open to the Influencer Feed screen by default
   - Try searching for influencers using the search bar
   - Test filtering by specialty by tapping on the specialty chips
   - Test sorting by followers by tapping the sort button
   - Pull down to refresh the feed
   - Tap on an influencer card to view their profile

3. **Testing the Influencer Profile**
   - Verify that the profile displays correctly with all information
   - Test the follow/unfollow button
   - Try opening social media links (these will open in the device browser)
   - Tap on a meal to view its details
   - Test the back button to return to the feed

4. **Error Handling**
   - The app should handle network errors gracefully
   - Empty states should be displayed when appropriate
   - Retry buttons should work as expected

## Known Issues

- Social media links may not work in the Expo Go environment due to deep linking restrictions
- Some images may not load if the remote server is unavailable
- The "View All" button for meals is currently a placeholder
