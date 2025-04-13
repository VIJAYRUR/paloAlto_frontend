from flask import Blueprint, request, jsonify
from mongo_models import User, Meal, Influencer
from flask_jwt_extended import jwt_required, get_jwt_identity

users_bp = Blueprint('users', __name__)

@users_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    user_id = get_jwt_identity()
    user = User.get_by_id(user_id)

    if not user:
        return jsonify({'error': 'User not found'}), 404

    return jsonify(User.to_dict(user)), 200

@users_bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    user_id = get_jwt_identity()
    user = User.get_by_id(user_id)

    if not user:
        return jsonify({'error': 'User not found'}), 404

    data = request.get_json()
    update_data = {}

    # Collect fields to update
    if 'name' in data:
        update_data['name'] = data['name']
    if 'bio' in data:
        update_data['bio'] = data['bio']
    if 'height' in data:
        update_data['height'] = data['height']
    if 'weight' in data:
        update_data['weight'] = data['weight']
    if 'age' in data:
        update_data['age'] = data['age']
    if 'activity_level' in data:
        update_data['activity_level'] = data['activity_level']
    if 'dietary_preferences' in data:
        update_data['dietary_preferences'] = ','.join(data['dietary_preferences'])

    # Update user
    updated_user = User.update(user_id, **update_data)

    return jsonify({
        'message': 'Profile updated successfully',
        'user': User.to_dict(updated_user)
    }), 200

@users_bp.route('/favorites', methods=['GET'])
@jwt_required()
def get_favorites():
    user_id = get_jwt_identity()
    user = User.get_by_id(user_id)

    if not user:
        return jsonify({'error': 'User not found'}), 404

    # Get favorite meals
    favorites = []
    if 'favorite_meals' in user:
        for meal_id in user['favorite_meals']:
            meal = Meal.get_by_id(meal_id)
            if meal:
                favorites.append(Meal.to_dict(meal))

    return jsonify({
        'favorites': favorites
    }), 200

@users_bp.route('/following', methods=['GET'])
@jwt_required()
def get_following():
    user_id = get_jwt_identity()
    user = User.get_by_id(user_id)

    if not user:
        return jsonify({'error': 'User not found'}), 404

    # Get following influencers
    following = User.get_following(user_id)

    return jsonify({
        'following': following
    }), 200

@users_bp.route('/change-password', methods=['PUT'])
@jwt_required()
def change_password():
    user_id = get_jwt_identity()
    user = User.get_by_id(user_id)

    if not user:
        return jsonify({'error': 'User not found'}), 404

    data = request.get_json()

    if not all(k in data for k in ('current_password', 'new_password')):
        return jsonify({'error': 'Missing required fields'}), 400

    if not User.check_password(user, data['current_password']):
        return jsonify({'error': 'Current password is incorrect'}), 401

    # Update password
    from werkzeug.security import generate_password_hash
    password_hash = generate_password_hash(data['new_password'])
    User.update(user_id, password_hash=password_hash)

    return jsonify({
        'message': 'Password changed successfully'
    }), 200
