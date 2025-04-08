# FitFoodie Architecture Overview

This document provides an overview of the FitFoodie application architecture, including the frontend and backend components, data flow, and key design decisions.

## System Architecture

FitFoodie follows a client-server architecture with:

1. **Mobile Client**: React Native with Expo
2. **Backend API**: Flask RESTful API
3. **Database**: MongoDB Atlas

```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│                 │      │                 │      │                 │
│  Mobile Client  │◄────►│   Backend API   │◄────►│    Database     │
│  (React Native) │      │     (Flask)     │      │ (MongoDB Atlas) │
│                 │      │                 │      │                 │
└─────────────────┘      └─────────────────┘      └─────────────────┘
```

## Frontend Architecture

The frontend is built with React Native and follows a component-based architecture.

### Key Components

- **Navigation**: React Navigation for handling screen transitions and tab navigation
- **State Management**: React's built-in useState and useEffect hooks
- **UI Components**: Custom components with inline styles
- **API Integration**: Fetch API for communicating with the backend

### Screen Structure

```
App
├── AuthScreen (Login/Register)
├── MainTabNavigator
│   ├── InfluencerFeedScreen (Home)
│   ├── MealPlansScreen
│   ├── FoodLogScreen
│   ├── OrderIngredientsScreen
│   └── ProfileScreen
├── MealDetailScreen
├── InfluencerProfileScreen
└── ConfigScreen
```

### Data Flow

1. User interacts with the UI
2. Component state is updated
3. API requests are made to the backend when necessary
4. UI is updated based on the response

## Backend Architecture

The backend is built with Flask and follows a RESTful API architecture.

### Key Components

- **API Routes**: Organized by resource (auth, users, meals, influencers)
- **Models**: MongoDB document schemas
- **Authentication**: JWT-based authentication
- **Error Handling**: Comprehensive error handling with appropriate HTTP status codes

### API Structure

```
/api
├── /auth
│   ├── POST /register
│   └── POST /login
├── /users
│   ├── GET /:id
│   ├── PUT /:id
│   └── GET /:id/favorites
├── /meals
│   ├── GET /
│   ├── GET /:id
│   ├── POST /
│   └── PUT /:id
├── /influencers
│   ├── GET /
│   ├── GET /:id
│   └── GET /:id/meals
└── /orders
    ├── POST /
    └── GET /:id
```

## Database Schema

MongoDB collections and their relationships:

### Users Collection

```json
{
  "_id": "ObjectId",
  "name": "String",
  "email": "String",
  "password": "String (hashed)",
  "username": "String",
  "avatar": "String (URL)",
  "bio": "String",
  "isInfluencer": "Boolean",
  "physicalProfile": {
    "height": "Number",
    "weight": "Number",
    "age": "Number",
    "activityLevel": "String"
  },
  "dietaryPreferences": ["String"],
  "allergies": ["String"],
  "healthGoals": ["String"],
  "favoriteMeals": ["ObjectId (references Meals)"],
  "favoriteInfluencers": ["ObjectId (references Users)"],
  "settings": {
    "notifications": "Boolean",
    "darkMode": "Boolean",
    "metricUnits": "Boolean",
    "privacyMode": "Boolean"
  },
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Meals Collection

```json
{
  "_id": "ObjectId",
  "title": "String",
  "description": "String",
  "image": "String (URL)",
  "influencerId": "ObjectId (references Users)",
  "macros": {
    "calories": "Number",
    "protein": "Number",
    "carbs": "Number",
    "fat": "Number"
  },
  "ingredients": [
    {
      "name": "String",
      "amount": "String",
      "affiliateLink": "String (URL)"
    }
  ],
  "instructions": ["String"],
  "tags": ["String"],
  "likes": "Number",
  "comments": "Number",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Orders Collection

```json
{
  "_id": "ObjectId",
  "userId": "ObjectId (references Users)",
  "items": [
    {
      "ingredientName": "String",
      "amount": "String",
      "price": "Number",
      "affiliateLink": "String (URL)"
    }
  ],
  "totalPrice": "Number",
  "status": "String",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## Authentication Flow

1. User registers or logs in through the AuthScreen
2. Backend validates credentials and returns a JWT token
3. Token is stored in the app's state
4. Token is included in the Authorization header for subsequent API requests
5. Protected routes on the backend verify the token before processing requests

## Error Handling

- Frontend: Try-catch blocks around API calls with user-friendly error messages
- Backend: Custom error handlers for different types of errors (validation, authentication, not found)
- Global error boundary in React to catch unexpected errors

## Performance Considerations

- Lazy loading of images
- Pagination for feed and list views
- Caching of frequently accessed data
- Optimized MongoDB queries with proper indexing

## Security Considerations

- JWT for authentication
- Password hashing with bcrypt
- Input validation on both frontend and backend
- HTTPS for all API communications
- MongoDB Atlas security features (encryption at rest, network isolation)

## Scalability Considerations

- Stateless backend for horizontal scaling
- MongoDB Atlas for database scaling
- Potential for implementing a CDN for static assets
- Containerization for easy deployment and scaling
