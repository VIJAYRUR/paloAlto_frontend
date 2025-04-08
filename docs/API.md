# FitFoodie API Documentation

This document provides detailed information about the FitFoodie API endpoints, request/response formats, and authentication requirements.

## Base URL

```
http://localhost:5000/api
```

For production, the base URL will be:

```
https://api.fitfoodie.com/api
```

## Authentication

Most API endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

### Getting a Token

To get a token, use the login endpoint:

```
POST /auth/login
```

## API Endpoints

### Authentication

#### Register a new user

```
POST /auth/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "username": "johndoe"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "60d21b4667d0d8992e610c85",
    "name": "John Doe",
    "email": "john@example.com",
    "username": "johndoe"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Login

```
POST /auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "60d21b4667d0d8992e610c85",
    "name": "John Doe",
    "email": "john@example.com",
    "username": "johndoe"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Users

#### Get User Profile

```
GET /users/:id
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "60d21b4667d0d8992e610c85",
    "name": "John Doe",
    "email": "john@example.com",
    "username": "johndoe",
    "avatar": "https://example.com/avatar.jpg",
    "bio": "Fitness enthusiast",
    "isInfluencer": false,
    "physicalProfile": {
      "height": 178,
      "weight": 75,
      "age": 28,
      "activityLevel": "Moderate"
    },
    "dietaryPreferences": ["High Protein", "Low Carb"],
    "allergies": ["Peanuts"],
    "healthGoals": ["Weight Management", "Muscle Gain"]
  }
}
```

#### Update User Profile

```
PUT /users/:id
```

**Request Body:**
```json
{
  "bio": "Fitness enthusiast and healthy food lover",
  "physicalProfile": {
    "weight": 73
  },
  "dietaryPreferences": ["High Protein", "Low Carb", "Gluten Free"]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "user": {
    "id": "60d21b4667d0d8992e610c85",
    "name": "John Doe",
    "bio": "Fitness enthusiast and healthy food lover",
    "physicalProfile": {
      "height": 178,
      "weight": 73,
      "age": 28,
      "activityLevel": "Moderate"
    },
    "dietaryPreferences": ["High Protein", "Low Carb", "Gluten Free"]
  }
}
```

#### Get User Favorites

```
GET /users/:id/favorites
```

**Response:**
```json
{
  "success": true,
  "favorites": {
    "meals": [
      {
        "id": "60d21b4667d0d8992e610c86",
        "title": "Protein-Packed Breakfast Bowl",
        "image": "https://example.com/meal.jpg",
        "macros": {
          "calories": 450,
          "protein": 30,
          "carbs": 45,
          "fat": 15
        },
        "influencer": {
          "id": "60d21b4667d0d8992e610c87",
          "name": "Fitness Chef",
          "avatar": "https://example.com/chef.jpg"
        }
      }
    ],
    "influencers": [
      {
        "id": "60d21b4667d0d8992e610c87",
        "name": "Fitness Chef",
        "avatar": "https://example.com/chef.jpg",
        "isVerified": true
      }
    ]
  }
}
```

### Meals

#### Get All Meals

```
GET /meals
```

**Query Parameters:**
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of meals per page (default: 10)
- `influencerId` (optional): Filter by influencer
- `tags` (optional): Filter by tags (comma-separated)

**Response:**
```json
{
  "success": true,
  "meals": [
    {
      "id": "60d21b4667d0d8992e610c86",
      "title": "Protein-Packed Breakfast Bowl",
      "description": "Start your day with this protein-rich breakfast bowl",
      "image": "https://example.com/meal.jpg",
      "macros": {
        "calories": 450,
        "protein": 30,
        "carbs": 45,
        "fat": 15
      },
      "influencer": {
        "id": "60d21b4667d0d8992e610c87",
        "name": "Fitness Chef",
        "avatar": "https://example.com/chef.jpg"
      },
      "likes": 120,
      "comments": 15
    }
  ],
  "pagination": {
    "total": 45,
    "page": 1,
    "limit": 10,
    "pages": 5
  }
}
```

#### Get Meal by ID

```
GET /meals/:id
```

**Response:**
```json
{
  "success": true,
  "meal": {
    "id": "60d21b4667d0d8992e610c86",
    "title": "Protein-Packed Breakfast Bowl",
    "description": "Start your day with this protein-rich breakfast bowl",
    "image": "https://example.com/meal.jpg",
    "macros": {
      "calories": 450,
      "protein": 30,
      "carbs": 45,
      "fat": 15
    },
    "ingredients": [
      {
        "name": "Greek Yogurt",
        "amount": "1 cup",
        "affiliateLink": "https://example.com/greek-yogurt"
      },
      {
        "name": "Granola",
        "amount": "1/4 cup",
        "affiliateLink": "https://example.com/granola"
      }
    ],
    "instructions": [
      "Add Greek yogurt to a bowl",
      "Top with granola and fresh fruits",
      "Drizzle with honey"
    ],
    "tags": ["breakfast", "high-protein", "quick"],
    "influencer": {
      "id": "60d21b4667d0d8992e610c87",
      "name": "Fitness Chef",
      "avatar": "https://example.com/chef.jpg"
    },
    "likes": 120,
    "comments": 15,
    "createdAt": "2023-06-15T10:30:00Z"
  }
}
```

#### Create a Meal (Influencer Only)

```
POST /meals
```

**Request Body:**
```json
{
  "title": "Green Smoothie Bowl",
  "description": "Nutrient-packed smoothie bowl with spinach and fruits",
  "image": "https://example.com/smoothie.jpg",
  "macros": {
    "calories": 320,
    "protein": 12,
    "carbs": 60,
    "fat": 8
  },
  "ingredients": [
    {
      "name": "Spinach",
      "amount": "1 cup",
      "affiliateLink": "https://example.com/spinach"
    },
    {
      "name": "Banana",
      "amount": "1 medium",
      "affiliateLink": "https://example.com/banana"
    }
  ],
  "instructions": [
    "Blend spinach and banana with almond milk",
    "Pour into a bowl",
    "Top with granola and berries"
  ],
  "tags": ["breakfast", "vegan", "smoothie"]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Meal created successfully",
  "meal": {
    "id": "60d21b4667d0d8992e610c88",
    "title": "Green Smoothie Bowl",
    "description": "Nutrient-packed smoothie bowl with spinach and fruits",
    "image": "https://example.com/smoothie.jpg",
    "macros": {
      "calories": 320,
      "protein": 12,
      "carbs": 60,
      "fat": 8
    }
  }
}
```

### Influencers

#### Get All Influencers

```
GET /influencers
```

**Query Parameters:**
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of influencers per page (default: 10)

**Response:**
```json
{
  "success": true,
  "influencers": [
    {
      "id": "60d21b4667d0d8992e610c87",
      "name": "Fitness Chef",
      "username": "@fitnesschef",
      "avatar": "https://example.com/chef.jpg",
      "bio": "Healthy recipes for fitness enthusiasts",
      "isVerified": true,
      "specialty": "High-protein meals",
      "followers": 15000,
      "posts": [
        {
          "id": "60d21b4667d0d8992e610c86",
          "title": "Protein-Packed Breakfast Bowl",
          "image": "https://example.com/meal.jpg",
          "macros": {
            "calories": 450,
            "protein": 30,
            "carbs": 45,
            "fat": 15
          },
          "likes": 120,
          "comments": 15
        }
      ]
    }
  ],
  "pagination": {
    "total": 25,
    "page": 1,
    "limit": 10,
    "pages": 3
  }
}
```

#### Get Influencer by ID

```
GET /influencers/:id
```

**Response:**
```json
{
  "success": true,
  "influencer": {
    "id": "60d21b4667d0d8992e610c87",
    "name": "Fitness Chef",
    "username": "@fitnesschef",
    "avatar": "https://example.com/chef.jpg",
    "bio": "Healthy recipes for fitness enthusiasts",
    "isVerified": true,
    "specialty": "High-protein meals",
    "followers": 15000,
    "stats": {
      "totalPosts": 45,
      "totalLikes": 5600,
      "totalComments": 890
    }
  }
}
```

#### Get Influencer Meals

```
GET /influencers/:id/meals
```

**Query Parameters:**
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of meals per page (default: 10)

**Response:**
```json
{
  "success": true,
  "meals": [
    {
      "id": "60d21b4667d0d8992e610c86",
      "title": "Protein-Packed Breakfast Bowl",
      "description": "Start your day with this protein-rich breakfast bowl",
      "image": "https://example.com/meal.jpg",
      "macros": {
        "calories": 450,
        "protein": 30,
        "carbs": 45,
        "fat": 15
      },
      "likes": 120,
      "comments": 15,
      "createdAt": "2023-06-15T10:30:00Z"
    }
  ],
  "pagination": {
    "total": 45,
    "page": 1,
    "limit": 10,
    "pages": 5
  }
}
```

### Orders

#### Create an Order

```
POST /orders
```

**Request Body:**
```json
{
  "items": [
    {
      "ingredientName": "Greek Yogurt",
      "amount": "1 cup",
      "price": 3.99,
      "affiliateLink": "https://example.com/greek-yogurt"
    },
    {
      "ingredientName": "Granola",
      "amount": "1/4 cup",
      "price": 2.49,
      "affiliateLink": "https://example.com/granola"
    }
  ],
  "promoCode": "SUMMER10"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Order created successfully",
  "order": {
    "id": "60d21b4667d0d8992e610c89",
    "items": [
      {
        "ingredientName": "Greek Yogurt",
        "amount": "1 cup",
        "price": 3.99,
        "affiliateLink": "https://example.com/greek-yogurt"
      },
      {
        "ingredientName": "Granola",
        "amount": "1/4 cup",
        "price": 2.49,
        "affiliateLink": "https://example.com/granola"
      }
    ],
    "subtotal": 6.48,
    "discount": 0.65,
    "totalPrice": 5.83,
    "status": "pending",
    "createdAt": "2023-06-20T14:25:00Z"
  }
}
```

#### Get Order by ID

```
GET /orders/:id
```

**Response:**
```json
{
  "success": true,
  "order": {
    "id": "60d21b4667d0d8992e610c89",
    "items": [
      {
        "ingredientName": "Greek Yogurt",
        "amount": "1 cup",
        "price": 3.99,
        "affiliateLink": "https://example.com/greek-yogurt"
      },
      {
        "ingredientName": "Granola",
        "amount": "1/4 cup",
        "price": 2.49,
        "affiliateLink": "https://example.com/granola"
      }
    ],
    "subtotal": 6.48,
    "discount": 0.65,
    "totalPrice": 5.83,
    "status": "processing",
    "createdAt": "2023-06-20T14:25:00Z",
    "updatedAt": "2023-06-20T14:30:00Z"
  }
}
```

## Error Responses

All API endpoints return a consistent error format:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email is required",
    "details": {
      "field": "email",
      "value": null
    }
  }
}
```

### Common Error Codes

- `VALIDATION_ERROR`: Invalid input data
- `AUTHENTICATION_ERROR`: Authentication failed
- `AUTHORIZATION_ERROR`: User not authorized to perform the action
- `NOT_FOUND`: Resource not found
- `SERVER_ERROR`: Internal server error

## Rate Limiting

The API implements rate limiting to prevent abuse:

- 100 requests per minute for authenticated users
- 20 requests per minute for unauthenticated users

When the rate limit is exceeded, the API returns a 429 Too Many Requests response:

```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests, please try again later",
    "details": {
      "retryAfter": 30
    }
  }
}
```

## Versioning

The API uses URL versioning. The current version is v1:

```
https://api.fitfoodie.com/api/v1/meals
```

Future versions will be available at:

```
https://api.fitfoodie.com/api/v2/meals
```
