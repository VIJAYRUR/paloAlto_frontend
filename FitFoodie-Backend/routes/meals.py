from flask import Blueprint, request, jsonify
from mongo_models import Meal, User, Influencer, ObjectId
from flask_jwt_extended import jwt_required, get_jwt_identity
import json

meals_bp = Blueprint('meals', __name__)

@meals_bp.route('/', methods=['GET'])
def get_meals():
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        tag = request.args.get('tag')
        influencer_id = request.args.get('influencer_id')

        # Build query
        query = {}

        if tag:
            query['tags'] = tag

        if influencer_id:
            if ObjectId.is_valid(influencer_id):
                query['influencer_id'] = ObjectId(influencer_id)
            else:
                return jsonify({'error': 'Invalid influencer ID format'}), 400

        # Get meals with pagination
        skip = (page - 1) * per_page
        total = db.meals.count_documents(query)

        cursor = db.meals.find(query).sort('created_at', -1).skip(skip).limit(per_page)
        meals_list = [Meal.to_dict(meal) for meal in cursor]

        return jsonify({
            'meals': meals_list,
            'total': total,
            'pages': (total + per_page - 1) // per_page,  # Ceiling division
            'current_page': page
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@meals_bp.route('/<meal_id>', methods=['GET'])
def get_meal(meal_id):
    try:
        if not ObjectId.is_valid(meal_id):
            return jsonify({'error': 'Invalid meal ID format'}), 400

        meal = Meal.get_by_id(meal_id)

        if not meal:
            return jsonify({'error': 'Meal not found'}), 404

        return jsonify(Meal.to_dict(meal)), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@meals_bp.route('/', methods=['POST'])
@jwt_required()
def create_meal():
    try:
        user_id = get_jwt_identity()
        user = User.get_by_id(user_id)

        if not user or not user.get('is_influencer', False):
            return jsonify({'error': 'Only influencers can create meals'}), 403

        influencer = Influencer.get_by_user_id(user_id)

        if not influencer:
            return jsonify({'error': 'Influencer profile not found'}), 404

        data = request.get_json()

        # Check if required fields are present
        if not all(k in data for k in ('title', 'description')):
            return jsonify({'error': 'Missing required fields'}), 400

        # Process ingredients and affiliate links if they're objects
        ingredients = data.get('ingredients', '[]')
        if isinstance(ingredients, dict) or isinstance(ingredients, list):
            ingredients = json.dumps(ingredients)

        affiliate_links = data.get('affiliate_links', '[]')
        if isinstance(affiliate_links, dict) or isinstance(affiliate_links, list):
            affiliate_links = json.dumps(affiliate_links)

        # Create new meal
        meal = Meal.create(
            influencer_id=influencer['_id'],
            title=data['title'],
            description=data['description'],
            image_url=data.get('image_url', ''),
            ingredients=ingredients,
            instructions=data.get('instructions', ''),
            prep_time=data.get('prep_time'),
            cook_time=data.get('cook_time'),
            servings=data.get('servings'),
            calories=data.get('calories'),
            protein=data.get('protein'),
            carbs=data.get('carbs'),
            fat=data.get('fat'),
            tags=data.get('tags', []),
            affiliate_links=affiliate_links
        )

        return jsonify({
            'message': 'Meal created successfully',
            'meal': Meal.to_dict(meal)
        }), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@meals_bp.route('/<meal_id>', methods=['PUT'])
@jwt_required()
def update_meal(meal_id):
    try:
        if not ObjectId.is_valid(meal_id):
            return jsonify({'error': 'Invalid meal ID format'}), 400

        user_id = get_jwt_identity()
        user = User.get_by_id(user_id)

        if not user or not user.get('is_influencer', False):
            return jsonify({'error': 'Only influencers can update meals'}), 403

        meal = Meal.get_by_id(meal_id)

        if not meal:
            return jsonify({'error': 'Meal not found'}), 404

        influencer = Influencer.get_by_user_id(user_id)

        if not influencer or str(meal['influencer_id']) != str(influencer['_id']):
            return jsonify({'error': 'You can only update your own meals'}), 403

        data = request.get_json()
        update_data = {}

        # Collect fields to update
        if 'title' in data:
            update_data['title'] = data['title']
        if 'description' in data:
            update_data['description'] = data['description']
        if 'image_url' in data:
            update_data['image_url'] = data['image_url']
        if 'ingredients' in data:
            ingredients = data['ingredients']
            if isinstance(ingredients, dict) or isinstance(ingredients, list):
                ingredients = json.dumps(ingredients)
            update_data['ingredients'] = ingredients
        if 'instructions' in data:
            update_data['instructions'] = data['instructions']
        if 'prep_time' in data:
            update_data['prep_time'] = data['prep_time']
        if 'cook_time' in data:
            update_data['cook_time'] = data['cook_time']
        if 'servings' in data:
            update_data['servings'] = data['servings']
        if 'calories' in data:
            update_data['calories'] = data['calories']
        if 'protein' in data:
            update_data['protein'] = data['protein']
        if 'carbs' in data:
            update_data['carbs'] = data['carbs']
        if 'fat' in data:
            update_data['fat'] = data['fat']
        if 'tags' in data:
            update_data['tags'] = data['tags']
        if 'affiliate_links' in data:
            affiliate_links = data['affiliate_links']
            if isinstance(affiliate_links, dict) or isinstance(affiliate_links, list):
                affiliate_links = json.dumps(affiliate_links)
            update_data['affiliate_links'] = affiliate_links

        # Update meal
        updated_meal = Meal.update(meal_id, **update_data)

        return jsonify({
            'message': 'Meal updated successfully',
            'meal': Meal.to_dict(updated_meal)
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@meals_bp.route('/<meal_id>', methods=['DELETE'])
@jwt_required()
def delete_meal(meal_id):
    try:
        if not ObjectId.is_valid(meal_id):
            return jsonify({'error': 'Invalid meal ID format'}), 400

        user_id = get_jwt_identity()
        user = User.get_by_id(user_id)

        if not user or not user.get('is_influencer', False):
            return jsonify({'error': 'Only influencers can delete meals'}), 403

        meal = Meal.get_by_id(meal_id)

        if not meal:
            return jsonify({'error': 'Meal not found'}), 404

        influencer = Influencer.get_by_user_id(user_id)

        if not influencer or str(meal['influencer_id']) != str(influencer['_id']):
            return jsonify({'error': 'You can only delete your own meals'}), 403

        # Delete meal
        Meal.delete(meal_id)

        return jsonify({
            'message': 'Meal deleted successfully'
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@meals_bp.route('/favorite/<meal_id>', methods=['POST'])
@jwt_required()
def favorite_meal(meal_id):
    try:
        if not ObjectId.is_valid(meal_id):
            return jsonify({'error': 'Invalid meal ID format'}), 400

        user_id = get_jwt_identity()
        user = User.get_by_id(user_id)

        if not user:
            return jsonify({'error': 'User not found'}), 404

        meal = Meal.get_by_id(meal_id)

        if not meal:
            return jsonify({'error': 'Meal not found'}), 404

        # Check if meal is already favorited
        if 'favorite_meals' in user and ObjectId(meal_id) in user['favorite_meals']:
            return jsonify({'error': 'Meal already favorited'}), 400

        # Add meal to favorites
        User.add_to_favorites(user_id, meal_id)

        return jsonify({
            'message': 'Meal favorited successfully'
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@meals_bp.route('/favorite/<meal_id>', methods=['DELETE'])
@jwt_required()
def unfavorite_meal(meal_id):
    try:
        if not ObjectId.is_valid(meal_id):
            return jsonify({'error': 'Invalid meal ID format'}), 400

        user_id = get_jwt_identity()
        user = User.get_by_id(user_id)

        if not user:
            return jsonify({'error': 'User not found'}), 404

        meal = Meal.get_by_id(meal_id)

        if not meal:
            return jsonify({'error': 'Meal not found'}), 404

        # Check if meal is in favorites
        if 'favorite_meals' not in user or ObjectId(meal_id) not in user['favorite_meals']:
            return jsonify({'error': 'Meal not in favorites'}), 400

        # Remove meal from favorites
        User.remove_from_favorites(user_id, meal_id)

        return jsonify({
            'message': 'Meal unfavorited successfully'
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
