# FitFoodie API Documentation

This document provides detailed information about the FitFoodie REST API endpoints, request/response formats, and authentication requirements.

## Base URL

All API endpoints are relative to the base URL:

```
http://localhost:5000/api
```

For production, the base URL will be:

```
https://fitfoodie-api.example.com/api
```

## Authentication

Most API endpoints require authentication using JWT (JSON Web Tokens).

### Obtaining a Token

To obtain a JWT token, make a POST request to the login endpoint:

```
POST /auth/login
```

Request body:
```json
{
  "username": "your_username",
  "password": "your_password"
}
```

Response:
```json
{
  "message": "Login successful",
  "user": {
    "id": "user_id",
    "username": "your_username",
    "email": "your_email@example.com",
    "name": "Your Name",
    "is_influencer": false
  },
  "access_token": "your_jwt_token"
}
```

### Using the Token

Include the token in the Authorization header for all protected requests:

```
Authorization: Bearer your_jwt_token
```

## API Endpoints

### Authentication

#### Register a new user

```
POST /auth/register
```

Request body:
```json
{
  "username": "newuser",
  "email": "newuser@example.com",
  "password": "password123",
  "name": "New User",
  "bio": "I love fitness!",
  "height": 175,
  "weight": 70,
  "age": 30,
  "activity_level": "moderate",
  "dietary_preferences": ["vegetarian", "low-carb"]
}
```

Response:
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "user_id",
    "username": "newuser",
    "email": "newuser@example.com",
    "name": "New User"
  },
  "access_token": "jwt_token"
}
```

#### Get current user

```
GET /auth/me
```

Headers:
```
Authorization: Bearer your_jwt_token
```

Response:
```json
{
  "id": "user_id",
  "username": "your_username",
  "email": "your_email@example.com",
  "name": "Your Name",
  "bio": "Your bio",
  "height": 175,
  "weight": 70,
  "age": 30,
  "activity_level": "moderate",
  "dietary_preferences": ["vegetarian", "low-carb"],
  "is_influencer": false,
  "created_at": "2023-01-01T00:00:00Z",
  "updated_at": "2023-01-01T00:00:00Z"
}
```

### Users

#### Get user profile

```
GET /users/profile
```

Headers:
```
Authorization: Bearer your_jwt_token
```

Response:
```json
{
  "id": "user_id",
  "username": "your_username",
  "email": "your_email@example.com",
  "name": "Your Name",
  "bio": "Your bio",
  "height": 175,
  "weight": 70,
  "age": 30,
  "activity_level": "moderate",
  "dietary_preferences": ["vegetarian", "low-carb"],
  "is_influencer": false,
  "created_at": "2023-01-01T00:00:00Z",
  "updated_at": "2023-01-01T00:00:00Z"
}
```

#### Update user profile

```
PUT /users/profile
```

Headers:
```
Authorization: Bearer your_jwt_token
```

Request body:
```json
{
  "name": "Updated Name",
  "bio": "Updated bio",
  "height": 180,
  "weight": 75,
  "age": 31,
  "activity_level": "high",
  "dietary_preferences": ["vegetarian", "low-carb", "gluten-free"]
}
```

Response:
```json
{
  "message": "Profile updated successfully",
  "user": {
    "id": "user_id",
    "username": "your_username",
    "email": "your_email@example.com",
    "name": "Updated Name",
    "bio": "Updated bio",
    "height": 180,
    "weight": 75,
    "age": 31,
    "activity_level": "high",
    "dietary_preferences": ["vegetarian", "low-carb", "gluten-free"],
    "is_influencer": false,
    "created_at": "2023-01-01T00:00:00Z",
    "updated_at": "2023-01-02T00:00:00Z"
  }
}
```

#### Get user's favorite meals

```
GET /users/favorites
```

Headers:
```
Authorization: Bearer your_jwt_token
```

Response:
```json
{
  "favorites": [
    {
      "id": "meal_id_1",
      "title": "Protein Pancakes",
      "description": "High protein breakfast option",
      "image_url": "https://example.com/image1.jpg",
      "calories": 350,
      "protein": 25,
      "carbs": 30,
      "fat": 10,
      "influencer": "Fitness Pro"
    },
    {
      "id": "meal_id_2",
      "title": "Avocado Toast",
      "description": "Healthy breakfast option",
      "image_url": "https://example.com/image2.jpg",
      "calories": 280,
      "protein": 15,
      "carbs": 25,
      "fat": 15,
      "influencer": "Nutrition Expert"
    }
  ]
}
```

#### Get list of influencers user is following

```
GET /users/following
```

Headers:
```
Authorization: Bearer your_jwt_token
```

Response:
```json
{
  "following": [
    {
      "id": "influencer_id_1",
      "name": "Fitness Pro",
      "specialty": "HIIT Workouts",
      "followers_count": 5000,
      "verified": true
    },
    {
      "id": "influencer_id_2",
      "name": "Nutrition Expert",
      "specialty": "Plant-Based Diet",
      "followers_count": 3500,
      "verified": false
    }
  ]
}
```

#### Change user password

```
PUT /users/change-password
```

Headers:
```
Authorization: Bearer your_jwt_token
```

Request body:
```json
{
  "current_password": "old_password",
  "new_password": "new_password"
}
```

Response:
```json
{
  "message": "Password changed successfully"
}
```

### Influencers

#### Get list of influencers

```
GET /influencers
```

Query parameters:
- `page`: Page number (default: 1)
- `per_page`: Items per page (default: 10)
- `specialty`: Filter by specialty
- `sort_by`: Sort field (default: created_at, options: followers)

Response:
```json
{
  "influencers": [
    {
      "id": "influencer_id_1",
      "user": {
        "id": "user_id_1",
        "name": "Fitness Pro",
        "username": "fitnesspro",
        "avatar": "https://example.com/avatar1.jpg"
      },
      "specialty": "HIIT Workouts",
      "followers_count": 5000,
      "verified": true,
      "social_media_links": {
        "instagram": "@fitnesspro",
        "twitter": "@fitnesspro_fit",
        "website": "https://www.fitnesspro.com"
      }
    },
    {
      "id": "influencer_id_2",
      "user": {
        "id": "user_id_2",
        "name": "Nutrition Expert",
        "username": "nutritionexpert",
        "avatar": "https://example.com/avatar2.jpg"
      },
      "specialty": "Plant-Based Diet",
      "followers_count": 3500,
      "verified": false,
      "social_media_links": {
        "instagram": "@nutritionexpert",
        "twitter": "@nutritionexpert_fit",
        "website": "https://www.nutritionexpert.com"
      }
    }
  ],
  "total": 50,
  "pages": 5,
  "current_page": 1
}
```

#### Get specific influencer

```
GET /influencers/{influencer_id}
```

Response:
```json
{
  "id": "influencer_id_1",
  "user": {
    "id": "user_id_1",
    "name": "Fitness Pro",
    "username": "fitnesspro",
    "avatar": "https://example.com/avatar1.jpg",
    "bio": "Certified personal trainer specializing in HIIT workouts"
  },
  "specialty": "HIIT Workouts",
  "followers_count": 5000,
  "verified": true,
  "social_media_links": {
    "instagram": "@fitnesspro",
    "twitter": "@fitnesspro_fit",
    "website": "https://www.fitnesspro.com"
  },
  "created_at": "2023-01-01T00:00:00Z",
  "updated_at": "2023-01-01T00:00:00Z"
}
```

#### Get list of influencer specialties

```
GET /influencers/specialties
```

Response:
```json
[
  "HIIT Workouts",
  "Plant-Based Diet",
  "Strength Training",
  "Yoga",
  "Calisthenics",
  "Meal Prep",
  "CrossFit",
  "Pilates"
]
```

#### Create influencer profile

```
POST /influencers/profile
```

Headers:
```
Authorization: Bearer your_jwt_token
```

Request body:
```json
{
  "specialty": "Strength Training",
  "social_media_links": {
    "instagram": "@yourhandle",
    "twitter": "@yourhandle_fit",
    "website": "https://www.yourwebsite.com"
  }
}
```

Response:
```json
{
  "message": "Influencer profile created successfully",
  "influencer": {
    "id": "influencer_id",
    "user": {
      "id": "user_id",
      "name": "Your Name",
      "username": "your_username",
      "avatar": "https://example.com/avatar.jpg"
    },
    "specialty": "Strength Training",
    "followers_count": 0,
    "verified": false,
    "social_media_links": {
      "instagram": "@yourhandle",
      "twitter": "@yourhandle_fit",
      "website": "https://www.yourwebsite.com"
    },
    "created_at": "2023-01-01T00:00:00Z",
    "updated_at": "2023-01-01T00:00:00Z"
  }
}
```

#### Update influencer profile

```
PUT /influencers/profile
```

Headers:
```
Authorization: Bearer your_jwt_token
```

Request body:
```json
{
  "specialty": "Updated Specialty",
  "social_media_links": {
    "instagram": "@updated_handle",
    "twitter": "@updated_handle_fit",
    "website": "https://www.updatedwebsite.com"
  }
}
```

Response:
```json
{
  "message": "Influencer profile updated successfully",
  "influencer": {
    "id": "influencer_id",
    "user": {
      "id": "user_id",
      "name": "Your Name",
      "username": "your_username",
      "avatar": "https://example.com/avatar.jpg"
    },
    "specialty": "Updated Specialty",
    "followers_count": 0,
    "verified": false,
    "social_media_links": {
      "instagram": "@updated_handle",
      "twitter": "@updated_handle_fit",
      "website": "https://www.updatedwebsite.com"
    },
    "created_at": "2023-01-01T00:00:00Z",
    "updated_at": "2023-01-02T00:00:00Z"
  }
}
```

#### Follow an influencer

```
POST /influencers/follow/{influencer_id}
```

Headers:
```
Authorization: Bearer your_jwt_token
```

Response:
```json
{
  "message": "Now following influencer",
  "followers_count": 5001
}
```

#### Unfollow an influencer

```
DELETE /influencers/unfollow/{influencer_id}
```

Headers:
```
Authorization: Bearer your_jwt_token
```

Response:
```json
{
  "message": "Unfollowed influencer",
  "followers_count": 5000
}
```

### Meals

#### Get list of meals

```
GET /meals
```

Query parameters:
- `page`: Page number (default: 1)
- `per_page`: Items per page (default: 10)
- `tag`: Filter by tag
- `influencer_id`: Filter by influencer

Response:
```json
{
  "meals": [
    {
      "id": "meal_id_1",
      "title": "Protein Pancakes",
      "description": "High protein breakfast option",
      "image_url": "https://example.com/image1.jpg",
      "calories": 350,
      "protein": 25,
      "carbs": 30,
      "fat": 10,
      "influencer": "Fitness Pro",
      "influencer_id": "influencer_id_1",
      "created_at": "2023-01-01T00:00:00Z"
    },
    {
      "id": "meal_id_2",
      "title": "Avocado Toast",
      "description": "Healthy breakfast option",
      "image_url": "https://example.com/image2.jpg",
      "calories": 280,
      "protein": 15,
      "carbs": 25,
      "fat": 15,
      "influencer": "Nutrition Expert",
      "influencer_id": "influencer_id_2",
      "created_at": "2023-01-02T00:00:00Z"
    }
  ],
  "total": 50,
  "pages": 5,
  "current_page": 1
}
```

#### Get specific meal

```
GET /meals/{meal_id}
```

Response:
```json
{
  "id": "meal_id_1",
  "title": "Protein Pancakes",
  "description": "High protein breakfast option",
  "image_url": "https://example.com/image1.jpg",
  "ingredients": [
    {"name": "Oats", "amount": "1 cup"},
    {"name": "Protein powder", "amount": "1 scoop"},
    {"name": "Egg whites", "amount": "3"},
    {"name": "Banana", "amount": "1"},
    {"name": "Baking powder", "amount": "1 tsp"}
  ],
  "instructions": "1. Blend all ingredients.\n2. Cook on a non-stick pan.\n3. Serve with berries and honey.",
  "prep_time": 5,
  "cook_time": 10,
  "servings": 2,
  "calories": 350,
  "protein": 25,
  "carbs": 30,
  "fat": 10,
  "tags": ["breakfast", "high-protein", "quick"],
  "affiliate_links": [
    {"name": "Protein powder", "url": "https://example.com/protein", "price": 29.99},
    {"name": "Non-stick pan", "url": "https://example.com/pan", "price": 24.99}
  ],
  "influencer": {
    "id": "influencer_id_1",
    "name": "Fitness Pro",
    "avatar": "https://example.com/avatar1.jpg"
  },
  "created_at": "2023-01-01T00:00:00Z",
  "updated_at": "2023-01-01T00:00:00Z"
}
```

#### Create a new meal

```
POST /meals
```

Headers:
```
Authorization: Bearer your_jwt_token
```

Request body:
```json
{
  "title": "Green Smoothie Bowl",
  "description": "Nutrient-packed breakfast bowl",
  "image_url": "https://example.com/smoothie.jpg",
  "ingredients": [
    {"name": "Spinach", "amount": "2 cups"},
    {"name": "Banana", "amount": "1"},
    {"name": "Protein powder", "amount": "1 scoop"},
    {"name": "Almond milk", "amount": "1 cup"},
    {"name": "Chia seeds", "amount": "1 tbsp"}
  ],
  "instructions": "1. Blend spinach, banana, protein powder, and almond milk.\n2. Pour into a bowl.\n3. Top with chia seeds and fruit.",
  "prep_time": 5,
  "cook_time": 0,
  "servings": 1,
  "calories": 300,
  "protein": 20,
  "carbs": 40,
  "fat": 8,
  "tags": ["breakfast", "smoothie", "vegan"],
  "affiliate_links": [
    {"name": "Protein powder", "url": "https://example.com/protein", "price": 29.99},
    {"name": "Blender", "url": "https://example.com/blender", "price": 49.99}
  ]
}
```

Response:
```json
{
  "message": "Meal created successfully",
  "meal": {
    "id": "meal_id",
    "title": "Green Smoothie Bowl",
    "description": "Nutrient-packed breakfast bowl",
    "image_url": "https://example.com/smoothie.jpg",
    "calories": 300,
    "protein": 20,
    "carbs": 40,
    "fat": 8,
    "influencer": "Your Name",
    "influencer_id": "influencer_id",
    "created_at": "2023-01-01T00:00:00Z"
  }
}
```

#### Update a meal

```
PUT /meals/{meal_id}
```

Headers:
```
Authorization: Bearer your_jwt_token
```

Request body:
```json
{
  "title": "Updated Green Smoothie Bowl",
  "description": "Updated description",
  "calories": 320,
  "protein": 22,
  "carbs": 42,
  "fat": 9
}
```

Response:
```json
{
  "message": "Meal updated successfully",
  "meal": {
    "id": "meal_id",
    "title": "Updated Green Smoothie Bowl",
    "description": "Updated description",
    "image_url": "https://example.com/smoothie.jpg",
    "calories": 320,
    "protein": 22,
    "carbs": 42,
    "fat": 9,
    "influencer": "Your Name",
    "influencer_id": "influencer_id",
    "created_at": "2023-01-01T00:00:00Z",
    "updated_at": "2023-01-02T00:00:00Z"
  }
}
```

#### Delete a meal

```
DELETE /meals/{meal_id}
```

Headers:
```
Authorization: Bearer your_jwt_token
```

Response:
```json
{
  "message": "Meal deleted successfully"
}
```

#### Add meal to favorites

```
POST /meals/favorite/{meal_id}
```

Headers:
```
Authorization: Bearer your_jwt_token
```

Response:
```json
{
  "message": "Meal favorited successfully"
}
```

#### Remove meal from favorites

```
DELETE /meals/favorite/{meal_id}
```

Headers:
```
Authorization: Bearer your_jwt_token
```

Response:
```json
{
  "message": "Meal unfavorited successfully"
}
```

## Error Responses

All API endpoints return appropriate HTTP status codes and error messages in case of failure:

```json
{
  "error": "Error message describing what went wrong"
}
```

Common error status codes:

- `400 Bad Request`: Invalid input
- `401 Unauthorized`: Authentication required
- `403 Forbidden`: Permission denied
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server-side error

## Rate Limiting

The API implements rate limiting to prevent abuse:

- 100 requests per minute for authenticated users
- 20 requests per minute for unauthenticated users

When rate limit is exceeded, the API returns a 429 Too Many Requests status code:

```json
{
  "error": "Rate limit exceeded. Please try again later."
}
```

## Versioning

The API uses URL versioning. The current version is v1:

```
/api/v1/resource
```

Future versions will be available at:

```
/api/v2/resource
```

## Additional Resources

- [Postman Collection](./postman-collection.json)
- [OpenAPI Specification](./openapi.yaml)
- [API Changelog](./changelog.md)
