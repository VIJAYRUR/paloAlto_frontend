from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
from mongo_models import User, Meal, Influencer
from routes.auth import auth_bp
from routes.meals import meals_bp
from routes.influencers import influencers_bp
from routes.users import users_bp
from flask_jwt_extended import JWTManager

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Configure app
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'dev-secret-key')

# Initialize extensions
jwt = JWTManager(app)

# Register blueprints
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(meals_bp, url_prefix='/api/meals')
app.register_blueprint(influencers_bp, url_prefix='/api/influencers')
app.register_blueprint(users_bp, url_prefix='/api/users')

@app.route('/')
def index():
    return jsonify({
        'message': 'Welcome to FitFoodie API',
        'status': 'online'
    })

@app.errorhandler(404)
def not_found(e):
    return jsonify({
        'error': 'Not found',
        'message': 'The requested resource was not found on this server'
    }), 404

@app.errorhandler(500)
def server_error(e):
    return jsonify({
        'error': 'Internal server error',
        'message': 'Something went wrong on our end'
    }), 500

# Create indexes for MongoDB collections
@app.before_request
def create_indexes():
    # Only run once
    if not hasattr(app, '_got_first_request'):
        # Create indexes for users collection
        db.users.create_index('username', unique=True)
        db.users.create_index('email', unique=True)

        # Create indexes for influencers collection
        db.influencers.create_index('user_id', unique=True)
        db.influencers.create_index('specialty')

        # Create indexes for meals collection
        db.meals.create_index('influencer_id')
        db.meals.create_index('tags')

        app._got_first_request = True

if __name__ == '__main__':
    app.run(debug=True)
