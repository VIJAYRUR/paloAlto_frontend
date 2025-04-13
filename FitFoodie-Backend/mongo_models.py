from pymongo import MongoClient
from pymongo.collection import Collection
from pymongo.database import Database
from datetime import datetime
import json
import os
from werkzeug.security import generate_password_hash, check_password_hash

# Initialize MongoDB client
client = MongoClient(os.getenv('MONGODB_URI', 'mongodb://localhost:27017/fitfoodie'))
db = client.get_database()

# Define ObjectId class for compatibility
class ObjectId:
    @staticmethod
    def is_valid(id_str):
        """Check if a string is a valid ObjectId"""
        if not isinstance(id_str, str):
            return False
        return len(id_str) == 24 and all(c in '0123456789abcdefABCDEF' for c in id_str)

    def __init__(self, id_str=None):
        """Initialize an ObjectId from a string"""
        self.id = id_str

    def __str__(self):
        return self.id

    def __eq__(self, other):
        if isinstance(other, ObjectId):
            return self.id == other.id
        return self.id == other

class User:
    @staticmethod
    def create(username, email, password, name=None, bio=None, height=None,
               weight=None, age=None, activity_level=None, dietary_preferences=None):
        """Create a new user"""
        user = {
            "username": username,
            "email": email,
            "password_hash": generate_password_hash(password),
            "name": name,
            "bio": bio,
            "height": height,
            "weight": weight,
            "age": age,
            "activity_level": activity_level,
            "dietary_preferences": dietary_preferences.split(',') if dietary_preferences else [],
            "is_influencer": False,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }

        result = db.users.insert_one(user)
        user['_id'] = str(result.inserted_id)
        return user

    @staticmethod
    def get_by_id(user_id):
        """Get user by ID"""
        if isinstance(user_id, str):
            user_id = ObjectId(user_id)
        return db.users.find_one({"_id": user_id})

    @staticmethod
    def get_by_username(username):
        """Get user by username"""
        return db.users.find_one({"username": username})

    @staticmethod
    def get_by_email(email):
        """Get user by email"""
        return db.users.find_one({"email": email})

    @staticmethod
    def update(user_id, **kwargs):
        """Update user fields"""
        if isinstance(user_id, str):
            user_id = ObjectId(user_id)

        # Handle dietary preferences special case
        if 'dietary_preferences' in kwargs and isinstance(kwargs['dietary_preferences'], str):
            kwargs['dietary_preferences'] = kwargs['dietary_preferences'].split(',')

        kwargs['updated_at'] = datetime.utcnow()

        db.users.update_one(
            {"_id": user_id},
            {"$set": kwargs}
        )
        return User.get_by_id(user_id)

    @staticmethod
    def check_password(user, password):
        """Check if password matches"""
        if not user or 'password_hash' not in user:
            return False
        return check_password_hash(user['password_hash'], password)

    @staticmethod
    def to_dict(user):
        """Convert user document to dictionary"""
        if not user:
            return None

        # Create a copy to avoid modifying the original
        user_dict = dict(user)

        # Convert ObjectId to string
        if '_id' in user_dict:
            user_dict['id'] = str(user_dict['_id'])
            del user_dict['_id']

        # Convert datetime objects to ISO format strings
        for key in ['created_at', 'updated_at']:
            if key in user_dict and isinstance(user_dict[key], datetime):
                user_dict[key] = user_dict[key].isoformat()

        # Remove password hash
        if 'password_hash' in user_dict:
            del user_dict['password_hash']

        return user_dict

    @staticmethod
    def add_to_favorites(user_id, meal_id):
        """Add a meal to user's favorites"""
        if isinstance(user_id, str):
            user_id = ObjectId(user_id)
        if isinstance(meal_id, str):
            meal_id = ObjectId(meal_id)

        db.users.update_one(
            {"_id": user_id},
            {"$addToSet": {"favorite_meals": meal_id}}
        )

    @staticmethod
    def remove_from_favorites(user_id, meal_id):
        """Remove a meal from user's favorites"""
        if isinstance(user_id, str):
            user_id = ObjectId(user_id)
        if isinstance(meal_id, str):
            meal_id = ObjectId(meal_id)

        db.users.update_one(
            {"_id": user_id},
            {"$pull": {"favorite_meals": meal_id}}
        )

    @staticmethod
    def follow_influencer(user_id, influencer_id):
        """Follow an influencer"""
        if isinstance(user_id, str):
            user_id = ObjectId(user_id)
        if isinstance(influencer_id, str):
            influencer_id = ObjectId(influencer_id)

        db.users.update_one(
            {"_id": user_id},
            {"$addToSet": {"following": influencer_id}}
        )

    @staticmethod
    def unfollow_influencer(user_id, influencer_id):
        """Unfollow an influencer"""
        if isinstance(user_id, str):
            user_id = ObjectId(user_id)
        if isinstance(influencer_id, str):
            influencer_id = ObjectId(influencer_id)

        db.users.update_one(
            {"_id": user_id},
            {"$pull": {"following": influencer_id}}
        )

    @staticmethod
    def get_following(user_id):
        """Get list of influencers a user is following"""
        if isinstance(user_id, str):
            user_id = ObjectId(user_id)

        user = db.users.find_one({"_id": user_id})
        if not user or 'following' not in user:
            return []

        following_ids = user['following']
        following = []

        for inf_id in following_ids:
            influencer = Influencer.get_by_id(inf_id)
            if influencer:
                following.append(Influencer.to_dict(influencer))

        return following


class Influencer:
    @staticmethod
    def create(user_id, specialty=None, social_media_links=None):
        """Create a new influencer profile"""
        if isinstance(user_id, str):
            user_id = ObjectId(user_id)

        # First, update the user to mark as influencer
        User.update(user_id, is_influencer=True)

        # Create the influencer profile
        influencer = {
            "user_id": user_id,
            "specialty": specialty,
            "social_media_links": social_media_links,
            "verified": False,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }

        result = db.influencers.insert_one(influencer)
        influencer['_id'] = str(result.inserted_id)
        return influencer

    @staticmethod
    def get_by_id(influencer_id):
        """Get influencer by ID"""
        if isinstance(influencer_id, str):
            influencer_id = ObjectId(influencer_id)
        return db.influencers.find_one({"_id": influencer_id})

    @staticmethod
    def get_by_user_id(user_id):
        """Get influencer by user ID"""
        if isinstance(user_id, str):
            user_id = ObjectId(user_id)
        return db.influencers.find_one({"user_id": user_id})

    @staticmethod
    def get_all(page=1, per_page=10, specialty=None, sort_by=None):
        """Get all influencers with pagination and filtering"""
        query = {}

        if specialty:
            query["specialty"] = {"$regex": specialty, "$options": "i"}

        # Define sort order
        sort_order = [("created_at", -1)]  # Default: newest first
        if sort_by == "followers":
            sort_order = [("followers_count", -1)]

        # Calculate skip value for pagination
        skip = (page - 1) * per_page

        # Get total count for pagination
        total = db.influencers.count_documents(query)

        # Get influencers with pagination
        cursor = db.influencers.find(query).sort(sort_order).skip(skip).limit(per_page)

        # Convert cursor to list of dictionaries
        influencers = []
        for inf in cursor:
            # Get user data
            user = User.get_by_id(inf['user_id'])
            if user:
                inf_dict = Influencer.to_dict(inf)
                inf_dict['user'] = User.to_dict(user)
                influencers.append(inf_dict)

        return {
            "influencers": influencers,
            "total": total,
            "pages": (total + per_page - 1) // per_page,  # Ceiling division
            "current_page": page
        }

    @staticmethod
    def update(influencer_id, **kwargs):
        """Update influencer fields"""
        if isinstance(influencer_id, str):
            influencer_id = ObjectId(influencer_id)

        kwargs['updated_at'] = datetime.utcnow()

        db.influencers.update_one(
            {"_id": influencer_id},
            {"$set": kwargs}
        )
        return Influencer.get_by_id(influencer_id)

    @staticmethod
    def to_dict(influencer):
        """Convert influencer document to dictionary"""
        if not influencer:
            return None

        # Create a copy to avoid modifying the original
        inf_dict = dict(influencer)

        # Convert ObjectId to string
        if '_id' in inf_dict:
            inf_dict['id'] = str(inf_dict['_id'])
            del inf_dict['_id']

        if 'user_id' in inf_dict:
            inf_dict['user_id'] = str(inf_dict['user_id'])

        # Convert datetime objects to ISO format strings
        for key in ['created_at', 'updated_at']:
            if key in inf_dict and isinstance(inf_dict[key], datetime):
                inf_dict[key] = inf_dict[key].isoformat()

        # Parse social media links if it's a JSON string
        if 'social_media_links' in inf_dict and isinstance(inf_dict['social_media_links'], str):
            try:
                inf_dict['social_media_links'] = json.loads(inf_dict['social_media_links'])
            except:
                pass

        return inf_dict

    @staticmethod
    def get_followers(influencer_id):
        """Get list of users following this influencer"""
        if isinstance(influencer_id, str):
            influencer_id = ObjectId(influencer_id)

        followers = db.users.find({"following": influencer_id})
        return [User.to_dict(user) for user in followers]

    @staticmethod
    def get_followers_count(influencer_id):
        """Get count of followers for an influencer"""
        if isinstance(influencer_id, str):
            influencer_id = ObjectId(influencer_id)

        return db.users.count_documents({"following": influencer_id})

    @staticmethod
    def get_specialties():
        """Get list of unique specialties"""
        return db.influencers.distinct("specialty")


class Meal:
    @staticmethod
    def create(influencer_id, title, description=None, image_url=None, ingredients=None,
               instructions=None, prep_time=None, cook_time=None, servings=None,
               calories=None, protein=None, carbs=None, fat=None, tags=None, affiliate_links=None):
        """Create a new meal"""
        if isinstance(influencer_id, str):
            influencer_id = ObjectId(influencer_id)

        # Process tags if they're a string
        if tags and isinstance(tags, str):
            tags = tags.split(',')

        meal = {
            "influencer_id": influencer_id,
            "title": title,
            "description": description,
            "image_url": image_url,
            "ingredients": ingredients,  # Should be a JSON string or dict
            "instructions": instructions,
            "prep_time": prep_time,
            "cook_time": cook_time,
            "servings": servings,
            "calories": calories,
            "protein": protein,
            "carbs": carbs,
            "fat": fat,
            "tags": tags,
            "affiliate_links": affiliate_links,  # Should be a JSON string or dict
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }

        result = db.meals.insert_one(meal)
        meal['_id'] = str(result.inserted_id)
        return meal

    @staticmethod
    def get_by_id(meal_id):
        """Get meal by ID"""
        if isinstance(meal_id, str):
            meal_id = ObjectId(meal_id)
        return db.meals.find_one({"_id": meal_id})

    @staticmethod
    def get_by_influencer(influencer_id, page=1, per_page=10):
        """Get meals by influencer ID with pagination"""
        if isinstance(influencer_id, str):
            influencer_id = ObjectId(influencer_id)

        # Calculate skip value for pagination
        skip = (page - 1) * per_page

        # Get total count for pagination
        total = db.meals.count_documents({"influencer_id": influencer_id})

        # Get meals with pagination
        cursor = db.meals.find({"influencer_id": influencer_id}).sort("created_at", -1).skip(skip).limit(per_page)

        # Convert cursor to list of dictionaries
        meals = [Meal.to_dict(meal) for meal in cursor]

        return {
            "meals": meals,
            "total": total,
            "pages": (total + per_page - 1) // per_page,  # Ceiling division
            "current_page": page
        }

    @staticmethod
    def update(meal_id, **kwargs):
        """Update meal fields"""
        if isinstance(meal_id, str):
            meal_id = ObjectId(meal_id)

        # Process tags if they're a string
        if 'tags' in kwargs and isinstance(kwargs['tags'], str):
            kwargs['tags'] = kwargs['tags'].split(',')

        kwargs['updated_at'] = datetime.utcnow()

        db.meals.update_one(
            {"_id": meal_id},
            {"$set": kwargs}
        )
        return Meal.get_by_id(meal_id)

    @staticmethod
    def delete(meal_id):
        """Delete a meal"""
        if isinstance(meal_id, str):
            meal_id = ObjectId(meal_id)

        db.meals.delete_one({"_id": meal_id})

    @staticmethod
    def to_dict(meal):
        """Convert meal document to dictionary"""
        if not meal:
            return None

        # Create a copy to avoid modifying the original
        meal_dict = dict(meal)

        # Convert ObjectId to string
        if '_id' in meal_dict:
            meal_dict['id'] = str(meal_dict['_id'])
            del meal_dict['_id']

        if 'influencer_id' in meal_dict:
            influencer_id = meal_dict['influencer_id']
            meal_dict['influencer_id'] = str(influencer_id)

            # Get influencer info
            influencer = Influencer.get_by_id(influencer_id)
            if influencer:
                user = User.get_by_id(influencer['user_id'])
                if user:
                    meal_dict['influencer'] = user.get('name', 'Unknown')

        # Convert datetime objects to ISO format strings
        for key in ['created_at', 'updated_at']:
            if key in meal_dict and isinstance(meal_dict[key], datetime):
                meal_dict[key] = meal_dict[key].isoformat()

        # Parse JSON strings
        for key in ['ingredients', 'affiliate_links']:
            if key in meal_dict and isinstance(meal_dict[key], str):
                try:
                    meal_dict[key] = json.loads(meal_dict[key])
                except:
                    pass

        return meal_dict
