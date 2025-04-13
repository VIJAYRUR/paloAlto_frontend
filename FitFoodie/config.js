// App Configuration

// API Configuration
export const API_CONFIG = {
  // Base URL for the backend API
  BASE_URL: 'http://localhost:5000/api',

  // Endpoints
  ENDPOINTS: {
    // Auth endpoints
    AUTH: {
      REGISTER: '/auth/register',
      LOGIN: '/auth/login',
      ME: '/auth/me',
    },
    // User endpoints
    USERS: {
      PROFILE: '/users/profile',
      FAVORITES: '/users/favorites',
      FOLLOWING: '/users/following',
      CHANGE_PASSWORD: '/users/change-password',
    },
    // Meals endpoints
    MEALS: {
      LIST: '/meals',
      DETAIL: '/meals/', // Append meal ID
      FAVORITE: '/meals/favorite/', // Append meal ID
      UNFAVORITE: '/meals/favorite/', // Append meal ID
    },
    // Influencers endpoints
    INFLUENCERS: {
      LIST: '/influencers',
      DETAIL: '/influencers/', // Append influencer ID
      PROFILE: '/influencers/profile',
      FOLLOW: '/influencers/follow/', // Append influencer ID
      UNFOLLOW: '/influencers/unfollow/', // Append influencer ID
    },
    // Food logging endpoints (to be implemented)
    FOOD_LOG: {
      LIST: '/food-log',
      ADD: '/food-log/add',
      DELETE: '/food-log/delete/', // Append log ID
    },
  },

  // Request timeout in milliseconds
  TIMEOUT: 10000,
};

// MongoDB Atlas Configuration
export const MONGODB_CONFIG = {
  // MongoDB Atlas connection string
  CONNECTION_STRING: 'mongodb+srv://vijay:admin123@main.hcxxamr.mongodb.net/fitfoodie?retryWrites=true&w=majority',
  // Database name
  DATABASE_NAME: 'fitfoodie',
};

// Nutritionix API Configuration for food logging
export const NUTRITIONIX_CONFIG = {
  APP_ID: 'your_nutritionix_app_id',
  API_KEY: 'your_nutritionix_api_key',
  BASE_URL: 'https://trackapi.nutritionix.com/v2',
  ENDPOINTS: {
    NATURAL_NUTRIENTS: '/natural/nutrients',
    SEARCH: '/search/instant',
  },
};

// App Theme Configuration
export const THEME = {
  COLORS: {
    PRIMARY: '#4CAF50',
    SECONDARY: '#2196F3',
    ACCENT: '#FF9800',
    BACKGROUND: '#F5F5F5',
    CARD: '#FFFFFF',
    TEXT: '#212121',
    TEXT_SECONDARY: '#757575',
    ERROR: '#F44336',
    SUCCESS: '#4CAF50',
    WARNING: '#FFC107',
    INFO: '#2196F3',
  },
  FONTS: {
    REGULAR: 'System',
    BOLD: 'System',
  },
  SIZES: {
    SMALL: 12,
    MEDIUM: 14,
    LARGE: 16,
    XLARGE: 18,
    XXLARGE: 20,
    TITLE: 24,
  },
  SPACING: {
    SMALL: 8,
    MEDIUM: 16,
    LARGE: 24,
    XLARGE: 32,
  },
  BORDER_RADIUS: {
    SMALL: 4,
    MEDIUM: 8,
    LARGE: 12,
    XLARGE: 16,
  },
};

// Feature Flags
export const FEATURES = {
  ENABLE_FOOD_LOGGING: true,
  ENABLE_MEAL_ORDERING: true,
  ENABLE_INFLUENCER_MODE: true,
  ENABLE_PUSH_NOTIFICATIONS: false,
};
