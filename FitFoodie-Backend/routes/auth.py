from flask import Blueprint, request, jsonify
from mongo_models import User
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from datetime import timedelta

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    # Check if required fields are present
    if not all(k in data for k in ('username', 'email', 'password')):
        return jsonify({'error': 'Missing required fields'}), 400

    # Check if user already exists
    if User.get_by_username(data['username']):
        return jsonify({'error': 'Username already exists'}), 400

    if User.get_by_email(data['email']):
        return jsonify({'error': 'Email already exists'}), 400

    # Create new user
    user = User.create(
        username=data['username'],
        email=data['email'],
        password=data['password'],
        name=data.get('name', ''),
        bio=data.get('bio', ''),
        height=data.get('height'),
        weight=data.get('weight'),
        age=data.get('age'),
        activity_level=data.get('activity_level', ''),
        dietary_preferences=','.join(data.get('dietary_preferences', [])) if data.get('dietary_preferences') else None
    )

    # Update user to be an influencer if requested
    if data.get('is_influencer', False):
        User.update(user['_id'], is_influencer=True)

    # Create access token
    access_token = create_access_token(
        identity=str(user['_id']),
        expires_delta=timedelta(days=1)
    )

    return jsonify({
        'message': 'User registered successfully',
        'user': User.to_dict(user),
        'access_token': access_token
    }), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    # Check if required fields are present
    if not all(k in data for k in ('username', 'password')):
        return jsonify({'error': 'Missing required fields'}), 400

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

@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def get_current_user():
    user_id = get_jwt_identity()
    user = User.get_by_id(user_id)

    if not user:
        return jsonify({'error': 'User not found'}), 404

    return jsonify(User.to_dict(user)), 200
