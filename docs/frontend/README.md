# FitFoodie Frontend Documentation

This documentation covers the frontend architecture, components, and implementation details of the FitFoodie mobile application.

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Project Structure](#project-structure)
- [Key Components](#key-components)
- [Navigation](#navigation)
- [State Management](#state-management)
- [API Integration](#api-integration)
- [UI/UX Design](#uiux-design)
- [Testing](#testing)
- [Performance Considerations](#performance-considerations)

## Architecture Overview

The FitFoodie frontend is built with React Native using the Expo framework. It follows a component-based architecture with a focus on reusability and maintainability.

### Technology Stack

- **React Native**: Core framework for building the mobile app
- **Expo**: Development platform for React Native
- **React Navigation**: Navigation library for screen management
- **Expo Vector Icons**: Icon library
- **React Native Async Storage**: Local storage solution

## Project Structure

```
FitFoodie/
├── assets/              # Static assets (images, fonts)
├── components/          # Reusable UI components
│   ├── common/          # Shared components used across screens
│   └── specific/        # Components specific to certain screens
├── config/              # Configuration files
├── hooks/               # Custom React hooks
├── navigation/          # Navigation configuration
├── screens/             # Screen components
├── services/            # API service functions
├── styles/              # Global styles and themes
├── utils/               # Utility functions
├── App.js               # Main application component
└── package.json         # Project dependencies
```

## Key Components

### UI Components

The app uses a set of reusable components to maintain consistency across the UI:

- **FeedPost**: Displays posts in the influencer feed
- **StoryCircle**: Circular component for user stories
- **InfluencerCard**: Card displaying influencer information
- **SearchBar**: Reusable search input component
- **ReelsSection**: Horizontal scrolling section for video reels
- **FollowRecommendations**: Horizontal cards for follow suggestions
- **DefaultAvatar**: Fallback for missing profile images

### Screen Components

The main screens of the application:

- **InfluencerFeedScreen**: Home feed with influencer content
- **MealPlansScreen**: Browse and purchase meal plans
- **FoodLogScreen**: Track daily food intake
- **ProfileScreen**: User profile information
- **AuthScreen**: Login and registration

## Navigation

The app uses React Navigation with a combination of stack and tab navigators:

```javascript
// Main navigation structure
const MainNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="Main" component={BottomTabNavigator} />
      <Stack.Screen name="InfluencerProfile" component={InfluencerProfileScreen} />
      <Stack.Screen name="MealDetail" component={MealDetailScreen} />
      {/* Other modal screens */}
    </Stack.Navigator>
  </NavigationContainer>
);

// Bottom tab navigation
const BottomTabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Feed" component={InfluencerFeedScreen} />
    <Tab.Screen name="MealPlans" component={MealPlansScreen} />
    <Tab.Screen name="FoodLog" component={FoodLogScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);
```

## State Management

The app uses React's built-in state management with hooks:

- **useState**: For component-level state
- **useEffect**: For side effects and data fetching
- **useContext**: For sharing state across components (when needed)

Example of state management in the InfluencerFeedScreen:

```javascript
// State variables
const [influencers, setInfluencers] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

// Data fetching with useEffect
useEffect(() => {
  const fetchInfluencers = async () => {
    try {
      const data = await influencerService.getInfluencers();
      setInfluencers(data);
    } catch (error) {
      setError('Failed to fetch influencers');
    } finally {
      setLoading(false);
    }
  };
  
  fetchInfluencers();
}, []);
```

## API Integration

The frontend communicates with the backend API through service modules:

```javascript
// Example of an API service function
export const getInfluencers = async (options = {}) => {
  try {
    const queryParams = new URLSearchParams();
    if (options.page) queryParams.append('page', options.page);
    if (options.per_page) queryParams.append('per_page', options.per_page);
    
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.INFLUENCERS.LIST}?${queryParams.toString()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
    
    if (!response.ok) {
      throw new Error('API request failed');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching influencers:', error);
    throw error;
  }
};
```

## UI/UX Design

The app follows a design system inspired by popular social media platforms:

### Theme

The app uses a consistent theme defined in `config.js`:

```javascript
export const THEME = {
  COLORS: {
    PRIMARY: '#FF5A5F',
    SECONDARY: '#00A699',
    BACKGROUND: '#F7F7F7',
    CARD: '#FFFFFF',
    TEXT: '#333333',
    TEXT_SECONDARY: '#767676',
    ERROR: '#FF0000',
  },
  SIZES: {
    SMALL: 12,
    MEDIUM: 16,
    LARGE: 20,
    TITLE: 24,
  },
  BORDER_RADIUS: {
    SMALL: 4,
    MEDIUM: 8,
    LARGE: 16,
  },
};
```

### Layout Patterns

- **Feed Layout**: Vertical scrolling list with cards
- **Story Bar**: Horizontal scrolling circles at the top
- **Grid Layout**: For displaying meal plans and gallery items
- **Modal Overlays**: For detailed views and forms

## Testing

The frontend uses Jest for unit testing and React Native Testing Library for component testing.

```javascript
// Example test for a component
import { render, fireEvent } from '@testing-library/react-native';
import InfluencerCard from '../components/InfluencerCard';

describe('InfluencerCard', () => {
  it('renders correctly', () => {
    const mockInfluencer = {
      id: '1',
      name: 'Test Influencer',
      specialty: 'Fitness',
      followers: 1000,
    };
    
    const { getByText } = render(<InfluencerCard influencer={mockInfluencer} />);
    
    expect(getByText('Test Influencer')).toBeTruthy();
    expect(getByText('Fitness')).toBeTruthy();
    expect(getByText('1000')).toBeTruthy();
  });
});
```

## Performance Considerations

To ensure optimal performance, the app implements:

- **List Virtualization**: Using FlatList for efficient rendering of long lists
- **Image Optimization**: Proper sizing and caching of images
- **Memoization**: Using React.memo and useMemo for expensive computations
- **Lazy Loading**: Loading data as needed rather than all at once

## Additional Resources

- [Component Documentation](./components.md)
- [Screen Documentation](./screens.md)
- [Navigation Flow](./navigation.md)
- [Styling Guide](./styling.md)
