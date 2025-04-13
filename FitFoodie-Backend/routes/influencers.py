from flask import Blueprint, request, jsonify
from mongo_models import User, Influencer
from flask_jwt_extended import jwt_required, get_jwt_identity
from bson.objectid import ObjectId
import json

influencers_bp = Blueprint('influencers', __name__)

@influencers_bp.route('/', methods=['GET'])
def get_influencers():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    specialty = request.args.get('specialty')
    sort_by = request.args.get('sort_by')

    # Get influencers with pagination and filtering
    result = Influencer.get_all(
        page=page,
        per_page=per_page,
        specialty=specialty,
        sort_by=sort_by
    )

    return jsonify(result), 200

@influencers_bp.route('/<influencer_id>', methods=['GET'])
def get_influencer(influencer_id):
    try:
        # Convert string ID to ObjectId
        if not ObjectId.is_valid(influencer_id):
            return jsonify({'error': 'Invalid influencer ID format'}), 400

        influencer = Influencer.get_by_id(influencer_id)

        if not influencer:
            return jsonify({'error': 'Influencer not found'}), 404

        # Get user data
        user = User.get_by_id(influencer['user_id'])

        # Create response with combined data
        influencer_dict = Influencer.to_dict(influencer)
        influencer_dict['user'] = User.to_dict(user)

        # Get followers count
        influencer_dict['followers_count'] = Influencer.get_followers_count(influencer['_id'])

        return jsonify(influencer_dict), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@influencers_bp.route('/specialties', methods=['GET'])
def get_specialties():
    try:
        specialties = Influencer.get_specialties()
        return jsonify(specialties), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@influencers_bp.route('/profile', methods=['POST'])
@jwt_required()
def create_influencer_profile():
    try:
        user_id = get_jwt_identity()
        user = User.get_by_id(user_id)

        if not user:
            return jsonify({'error': 'User not found'}), 404

        # Check if influencer profile already exists
        existing = Influencer.get_by_user_id(user_id)
        if existing:
            return jsonify({'error': 'Influencer profile already exists'}), 400

        data = request.get_json()

        # Process social media links
        social_media_links = data.get('social_media_links')
        if social_media_links and isinstance(social_media_links, dict):
            social_media_links = json.dumps(social_media_links)

        # Create influencer profile
        influencer = Influencer.create(
            user_id=user_id,
            specialty=data.get('specialty', ''),
            social_media_links=social_media_links
        )

        # Get the created influencer with user data
        influencer_dict = Influencer.to_dict(influencer)
        influencer_dict['user'] = User.to_dict(user)

        return jsonify({
            'message': 'Influencer profile created successfully',
            'influencer': influencer_dict
        }), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@influencers_bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_influencer_profile():
    try:
        user_id = get_jwt_identity()

        # Get influencer profile
        influencer = Influencer.get_by_user_id(user_id)

        if not influencer:
            return jsonify({'error': 'Influencer profile not found'}), 404

        data = request.get_json()
        update_data = {}

        # Update influencer fields
        if 'specialty' in data:
            update_data['specialty'] = data['specialty']

        if 'social_media_links' in data:
            social_media_links = data['social_media_links']
            if isinstance(social_media_links, dict):
                social_media_links = json.dumps(social_media_links)
            update_data['social_media_links'] = social_media_links

        # Update the influencer
        updated = Influencer.update(influencer['_id'], **update_data)

        # Get user data
        user = User.get_by_id(updated['user_id'])

        # Create response
        influencer_dict = Influencer.to_dict(updated)
        influencer_dict['user'] = User.to_dict(user)

        return jsonify({
            'message': 'Influencer profile updated successfully',
            'influencer': influencer_dict
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@influencers_bp.route('/follow/<influencer_id>', methods=['POST'])
@jwt_required()
def follow_influencer(influencer_id):
    try:
        user_id = get_jwt_identity()

        # Validate IDs
        if not ObjectId.is_valid(influencer_id):
            return jsonify({'error': 'Invalid influencer ID format'}), 400

        # Get user and influencer
        user = User.get_by_id(user_id)
        influencer = Influencer.get_by_id(influencer_id)

        if not user:
            return jsonify({'error': 'User not found'}), 404

        if not influencer:
            return jsonify({'error': 'Influencer not found'}), 404

        # Check if already following
        if 'following' in user and ObjectId(influencer_id) in user['following']:
            return jsonify({'error': 'Already following this influencer'}), 400

        # Follow the influencer
        User.follow_influencer(user_id, influencer_id)

        # Get updated followers count
        followers_count = Influencer.get_followers_count(influencer_id)

        return jsonify({
            'message': 'Now following influencer',
            'followers_count': followers_count
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@influencers_bp.route('/unfollow/<influencer_id>', methods=['DELETE'])
@jwt_required()
def unfollow_influencer(influencer_id):
    try:
        user_id = get_jwt_identity()

        # Validate IDs
        if not ObjectId.is_valid(influencer_id):
            return jsonify({'error': 'Invalid influencer ID format'}), 400

        # Get user and influencer
        user = User.get_by_id(user_id)
        influencer = Influencer.get_by_id(influencer_id)

        if not user:
            return jsonify({'error': 'User not found'}), 404

        if not influencer:
            return jsonify({'error': 'Influencer not found'}), 404

        # Check if not following
        if 'following' not in user or ObjectId(influencer_id) not in user['following']:
            return jsonify({'error': 'Not following this influencer'}), 400

        # Unfollow the influencer
        User.unfollow_influencer(user_id, influencer_id)

        # Get updated followers count
        followers_count = Influencer.get_followers_count(influencer_id)

        return jsonify({
            'message': 'Unfollowed influencer',
            'followers_count': followers_count
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
