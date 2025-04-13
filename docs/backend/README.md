# FitFoodie Backend Documentation

This documentation covers the backend architecture, API endpoints, and implementation details of the FitFoodie application.

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Error Handling](#error-handling)
- [Data Validation](#data-validation)
- [Testing](#testing)
- [Deployment](#deployment)

## Architecture Overview

The FitFoodie backend is built with Flask, a lightweight Python web framework, and uses MongoDB for data storage. It follows a RESTful API design pattern and implements JWT-based authentication.

### Technology Stack

- **Flask**: Web framework
- **PyMongo**: MongoDB driver for Python
- **Flask-JWT-Extended**: JWT authentication
- **Flask-CORS**: Cross-Origin Resource Sharing
- **Python-dotenv**: Environment variable management

## Project Structure

```
FitFoodie-Backend/
├── routes/              # API route definitions
│   ├── auth.py          # Authentication routes
│   ├── influencers.py   # Influencer-related routes
│   ├── meals.py         # Meal-related routes
│   └── users.py         # User-related routes
├── mongo_models.py      # MongoDB data models
├── app.py               # Main application file
├── run.py               # Application entry point
├── config.py            # Configuration settings
├── tests/               # Test files
├── requirements.txt     # Project dependencies
└── .env                 # Environment variables (not in version control)
```

## Database Schema

The application uses MongoDB with the following collections:

### Users Collection

```json
{
  "_id": ObjectId,
  "username": String,
  "email": String,
  "password_hash": String,
  "name": String,
  "bio": String,
  "height": Number,
  "weight": Number,
  "age": Number,
  "activity_level": String,
  "dietary_preferences": Array,
  "is_influencer": Boolean,
  "following": Array,
  "favorite_meals": Array,
  "created_at": DateTime,
  "updated_at": DateTime
}
```

### Influencers Collection

```json
{
  "_id": ObjectId,
  "user_id": ObjectId,
  "specialty": String,
  "social_media_links": String,
  "verified": Boolean,
  "created_at": DateTime,
  "updated_at": DateTime
}
```

### Meals Collection

```json
{
  "_id": ObjectId,
  "influencer_id": ObjectId,
  "title": String,
  "description": String,
  "image_url": String,
  "ingredients": String,
  "instructions": String,
  "prep_time": Number,
  "cook_time": Number,
  "servings": Number,
  "calories": Number,
  "protein": Number,
  "carbs": Number,
  "fat": Number,
  "tags": Array,
  "affiliate_links": String,
  "created_at": DateTime,
  "updated_at": DateTime
}
```

## API Endpoints

### Authentication

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Authenticate a user and get JWT token
- `GET /api/auth/me`: Get current user information

### Users

- `GET /api/users/profile`: Get user profile
- `PUT /api/users/profile`: Update user profile
- `GET /api/users/favorites`: Get user's favorite meals
- `GET /api/users/following`: Get list of influencers user is following
- `PUT /api/users/change-password`: Change user password

### Influencers

- `GET /api/influencers`: Get list of influencers
- `GET /api/influencers/<id>`: Get specific influencer
- `GET /api/influencers/specialties`: Get list of influencer specialties
- `POST /api/influencers/profile`: Create influencer profile
- `PUT /api/influencers/profile`: Update influencer profile
- `POST /api/influencers/follow/<id>`: Follow an influencer
- `DELETE /api/influencers/unfollow/<id>`: Unfollow an influencer

### Meals

- `GET /api/meals`: Get list of meals
- `GET /api/meals/<id>`: Get specific meal
- `POST /api/meals`: Create a new meal
- `PUT /api/meals/<id>`: Update a meal
- `DELETE /api/meals/<id>`: Delete a meal
- `POST /api/meals/favorite/<id>`: Add meal to favorites
- `DELETE /api/meals/favorite/<id>`: Remove meal from favorites

## Authentication

The backend uses JWT (JSON Web Tokens) for authentication:

1. User logs in with username/password
2. Server validates credentials and issues a JWT token
3. Client includes token in Authorization header for subsequent requests
4. Server validates token for protected routes

Example implementation:

```python
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    # Find user by username
    user = User.get_by_username(data['username'])
    
    # Check if user exists and password is correct
    if not user or not User.check_password(user, data['password']):
        return jsonify({'error': 'Invalid username or password'}), 401
    
    # Create access token
    access_token = create_access_token(
        identity=str(user['_id']),
        expires_delta=timedelta(days=1)
    )
    
    return jsonify({
        'message': 'Login successful',
        'user': User.to_dict(user),
        'access_token': access_token
    }), 200
```

Protected routes use the `@jwt_required()` decorator:

```python
@users_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    user_id = get_jwt_identity()
    user = User.get_by_id(user_id)
    
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    return jsonify(User.to_dict(user)), 200
```

## Error Handling

The backend implements consistent error handling:

```python
try:
    # Operation that might fail
    result = some_operation()
    return jsonify(result), 200
except Exception as e:
    return jsonify({'error': str(e)}), 500
```

Common HTTP status codes used:

- `200 OK`: Successful request
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid input
- `401 Unauthorized`: Authentication required
- `403 Forbidden`: Permission denied
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server-side error

## Data Validation

Input validation is performed on all API endpoints:

```python
@meals_bp.route('/', methods=['POST'])
@jwt_required()
def create_meal():
    try:
        # Validate required fields
        data = request.get_json()
        if not all(k in data for k in ('title', 'description')):
            return jsonify({'error': 'Missing required fields'}), 400
        
        # Process and create meal
        # ...
    except Exception as e:
        return jsonify({'error': str(e)}), 500
```

## Testing

The backend uses Python's unittest framework for testing:

```python
import unittest
from app import app

class AuthTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True
    
    def test_register(self):
        response = self.app.post('/api/auth/register', json={
            'username': 'testuser',
            'email': 'test@example.com',
            'password': 'password123'
        })
        self.assertEqual(response.status_code, 201)
        data = response.get_json()
        self.assertEqual(data['message'], 'User registered successfully')
```

## Deployment

The backend can be deployed to various platforms:

### Heroku Deployment

1. Create a Procfile:
   ```
   web: gunicorn run:app
   ```

2. Set environment variables in Heroku dashboard:
   - `MONGODB_URI`
   - `JWT_SECRET_KEY`

3. Deploy using Heroku CLI:
   ```bash
   heroku create fitfoodie-api
   git push heroku main
   ```

### Docker Deployment

1. Create a Dockerfile:
   ```dockerfile
   FROM python:3.9-slim
   
   WORKDIR /app
   
   COPY requirements.txt .
   RUN pip install --no-cache-dir -r requirements.txt
   
   COPY . .
   
   CMD ["gunicorn", "--bind", "0.0.0.0:$PORT", "run:app"]
   ```

2. Build and run the Docker image:
   ```bash
   docker build -t fitfoodie-api .
   docker run -p 5000:5000 fitfoodie-api
   ```

## Additional Resources

- [API Documentation](../api/README.md)
- [Database Schema Details](./database.md)
- [Authentication Flow](./auth.md)
- [Deployment Guide](./deployment.md)
