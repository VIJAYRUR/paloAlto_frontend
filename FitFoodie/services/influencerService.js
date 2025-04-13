import { API_CONFIG } from '../config';

// Mock data for development
const MOCK_INFLUENCERS = [
  {
    id: '1',
    name: 'Fitness Chef',
    username: '@fitnesschef',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    isVerified: true,
    specialty: 'High Protein Meals',
    followers: 125000,
    following: 850,
    posts: 342,
    isFollowing: false,
    bio: 'Certified nutritionist and fitness coach specializing in high-protein meals for muscle building and recovery. Author of "Eat for Performance" cookbook.',
    coverImage: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061',
    socialMedia: {
      instagram: 'fitnesschef',
      youtube: 'fitnesschef',
      tiktok: 'fitnesschef',
      website: 'https://fitnesschef.com'
    },
    meals: [
      {
        id: '101',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
        title: 'Protein-Packed Breakfast Bowl',
        description: 'Start your day with this nutrient-dense breakfast bowl!',
        likes: 3240,
        comments: 128,
        macros: {
          calories: 450,
          protein: 30,
          carbs: 45,
          fat: 15
        }
      },
      {
        id: '102',
        image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061',
        title: 'Grilled Chicken Salad',
        description: 'A perfect post-workout meal with lean protein and veggies.',
        likes: 2890,
        comments: 95,
        macros: {
          calories: 380,
          protein: 35,
          carbs: 20,
          fat: 18
        }
      },
      {
        id: '103',
        image: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55',
        title: 'Protein Smoothie Bowl',
        description: 'Refreshing and packed with nutrients for recovery.',
        likes: 2150,
        comments: 87,
        macros: {
          calories: 320,
          protein: 25,
          carbs: 40,
          fat: 8
        }
      }
    ]
  },
  {
    id: '2',
    name: 'Nutrition Guru',
    username: '@nutritionguru',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    isVerified: true,
    specialty: 'Plant-Based Nutrition',
    followers: 98000,
    following: 450,
    posts: 215,
    isFollowing: true,
    bio: 'Plant-based nutritionist helping you transition to a healthier lifestyle through delicious and easy-to-make vegan recipes.',
    coverImage: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
    socialMedia: {
      instagram: 'nutritionguru',
      youtube: 'nutritionguru',
      website: 'https://nutritionguru.com'
    },
    meals: [
      {
        id: '201',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
        title: 'Green Smoothie Bowl',
        description: 'Packed with vitamins and antioxidants to boost your immune system.',
        likes: 2150,
        comments: 95,
        macros: {
          calories: 320,
          protein: 12,
          carbs: 60,
          fat: 8
        }
      },
      {
        id: '202',
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999',
        title: 'Avocado Toast with Microgreens',
        description: 'The perfect breakfast to start your day with healthy fats and fiber.',
        likes: 1890,
        comments: 73,
        macros: {
          calories: 350,
          protein: 10,
          carbs: 35,
          fat: 22
        }
      }
    ]
  },
  {
    id: '3',
    name: 'Healthy Eats',
    username: '@healthyeats',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    isVerified: false,
    specialty: 'Quick & Healthy Meals',
    followers: 75000,
    following: 320,
    posts: 178,
    isFollowing: false,
    bio: 'Busy mom of three sharing quick and nutritious meals that can be prepared in under 30 minutes. Focusing on balanced nutrition for the whole family.',
    coverImage: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061',
    socialMedia: {
      instagram: 'healthyeats',
      tiktok: 'healthyeats',
      website: 'https://healthyeats.com'
    },
    meals: [
      {
        id: '301',
        image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061',
        title: '15-Minute Salmon Bowl',
        description: 'A quick and nutritious meal for busy weeknights.',
        likes: 1890,
        comments: 73,
        macros: {
          calories: 480,
          protein: 35,
          carbs: 30,
          fat: 22
        }
      },
      {
        id: '302',
        image: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2',
        title: 'Veggie-Packed Pasta',
        description: 'A colorful pasta dish loaded with seasonal vegetables.',
        likes: 1650,
        comments: 62,
        macros: {
          calories: 420,
          protein: 15,
          carbs: 65,
          fat: 12
        }
      }
    ]
  },
  {
    id: '4',
    name: 'Muscle Meals',
    username: '@musclemeals',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    isVerified: true,
    specialty: 'Bodybuilding Nutrition',
    followers: 210000,
    following: 195,
    posts: 412,
    isFollowing: false,
    bio: 'Professional bodybuilder sharing my meal plans and nutrition tips. Specializing in high-protein, muscle-building recipes that taste great.',
    coverImage: 'https://images.unsplash.com/photo-1547592180-85f173990554',
    socialMedia: {
      instagram: 'musclemeals',
      youtube: 'musclemeals',
      website: 'https://musclemeals.com'
    },
    meals: [
      {
        id: '401',
        image: 'https://images.unsplash.com/photo-1547592180-85f173990554',
        title: 'Protein Power Bowl',
        description: 'The ultimate post-workout meal to maximize muscle recovery.',
        likes: 3450,
        comments: 142,
        macros: {
          calories: 650,
          protein: 50,
          carbs: 60,
          fat: 20
        }
      }
    ]
  },
  {
    id: '5',
    name: 'Keto Kitchen',
    username: '@ketokitchen',
    avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
    isVerified: true,
    specialty: 'Ketogenic Diet',
    followers: 185000,
    following: 310,
    posts: 267,
    isFollowing: false,
    bio: 'Nutritionist specializing in ketogenic diet plans. Helping people achieve their weight loss goals through delicious low-carb recipes.',
    coverImage: 'https://images.unsplash.com/photo-1559847844-5315695dadae',
    socialMedia: {
      instagram: 'ketokitchen',
      youtube: 'ketokitchen',
      website: 'https://ketokitchen.com'
    },
    meals: [
      {
        id: '501',
        image: 'https://images.unsplash.com/photo-1559847844-5315695dadae',
        title: 'Avocado & Bacon Breakfast',
        description: 'A high-fat, low-carb breakfast to keep you in ketosis.',
        likes: 2780,
        comments: 105,
        macros: {
          calories: 520,
          protein: 25,
          carbs: 5,
          fat: 45
        }
      }
    ]
  }
];

/**
 * Get all influencers
 * @param {Object} options - Options for filtering and pagination
 * @returns {Promise} Promise that resolves to an array of influencers
 */
export const getInfluencers = async (options = {}) => {
  try {
    // Build query parameters
    const queryParams = new URLSearchParams();
    if (options.page) queryParams.append('page', options.page);
    if (options.per_page) queryParams.append('per_page', options.per_page);
    if (options.specialty) queryParams.append('specialty', options.specialty);
    if (options.sortBy) queryParams.append('sort_by', options.sortBy);
    if (options.search) queryParams.append('search', options.search);

    // Make API call
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.INFLUENCERS.LIST}?${queryParams.toString()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization header if user is logged in
          ...(localStorage.getItem('token') ? { 'Authorization': `Bearer ${localStorage.getItem('token')}` } : {})
        }
      }
    );

    // Check if response is ok
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch influencers');
    }

    // Parse response
    const data = await response.json();

    // For development fallback, use mock data if API fails
    if (!data || !data.influencers) {
      console.warn('API returned invalid data, falling back to mock data');
      return getMockInfluencers(options);
    }

    // Process the data to match our frontend structure
    const processedInfluencers = data.influencers.map(inf => ({
      id: inf.id,
      name: inf.user?.name || 'Unknown',
      username: inf.user?.username ? `@${inf.user.username}` : '@unknown',
      avatar: inf.user?.avatar || 'https://randomuser.me/api/portraits/lego/1.jpg',
      isVerified: inf.verified || false,
      specialty: inf.specialty || 'General Fitness',
      followers: inf.followers_count || 0,
      following: 0, // This might not be available from the API
      posts: inf.meals?.length || 0,
      isFollowing: inf.is_following || false,
      bio: inf.user?.bio || 'No bio available',
      coverImage: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061',
      socialMedia: inf.social_media_links ?
        (typeof inf.social_media_links === 'string' ?
          JSON.parse(inf.social_media_links) : inf.social_media_links) : {},
      meals: inf.meals || []
    }));

    return {
      influencers: processedInfluencers,
      total: data.total || processedInfluencers.length,
      pages: data.pages || 1,
      current_page: data.current_page || 1
    };
  } catch (error) {
    console.error('Error fetching influencers:', error);
    // Fallback to mock data in case of error
    console.warn('Falling back to mock data due to API error');
    return getMockInfluencers(options);
  }
};

/**
 * Get mock influencers (fallback function)
 * @param {Object} options - Options for filtering and pagination
 * @returns {Promise} Promise that resolves to an array of mock influencers
 */
const getMockInfluencers = (options = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredInfluencers = [...MOCK_INFLUENCERS];

      // Apply search filter if provided
      if (options.search) {
        const searchLower = options.search.toLowerCase();
        filteredInfluencers = filteredInfluencers.filter(
          influencer =>
            influencer.name.toLowerCase().includes(searchLower) ||
            influencer.username.toLowerCase().includes(searchLower) ||
            influencer.specialty.toLowerCase().includes(searchLower)
        );
      }

      // Apply specialty filter if provided
      if (options.specialty) {
        filteredInfluencers = filteredInfluencers.filter(
          influencer => influencer.specialty === options.specialty
        );
      }

      // Sort by followers count if requested
      if (options.sortBy === 'followers') {
        filteredInfluencers.sort((a, b) => b.followers - a.followers);
      }

      resolve({
        influencers: filteredInfluencers,
        total: filteredInfluencers.length,
        pages: 1,
        current_page: 1
      });
    }, 1000);
  });
};

/**
 * Get influencer by ID
 * @param {String} id - Influencer ID
 * @returns {Promise} Promise that resolves to an influencer object
 */
export const getInfluencerById = async (id) => {
  try {
    // Make API call
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.INFLUENCERS.DETAIL}${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization header if user is logged in
          ...(localStorage.getItem('token') ? { 'Authorization': `Bearer ${localStorage.getItem('token')}` } : {})
        }
      }
    );

    // Check if response is ok
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch influencer');
    }

    // Parse response
    const data = await response.json();

    // For development fallback, use mock data if API fails
    if (!data) {
      console.warn('API returned invalid data, falling back to mock data');
      return getMockInfluencerById(id);
    }

    // Process the data to match our frontend structure
    const processedInfluencer = {
      id: data.id,
      name: data.user?.name || 'Unknown',
      username: data.user?.username ? `@${data.user.username}` : '@unknown',
      avatar: data.user?.avatar || 'https://randomuser.me/api/portraits/lego/1.jpg',
      isVerified: data.verified || false,
      specialty: data.specialty || 'General Fitness',
      followers: data.followers_count || 0,
      following: 0, // This might not be available from the API
      posts: data.meals?.length || 0,
      isFollowing: data.is_following || false,
      bio: data.user?.bio || 'No bio available',
      coverImage: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061',
      socialMedia: data.social_media_links ?
        (typeof data.social_media_links === 'string' ?
          JSON.parse(data.social_media_links) : data.social_media_links) : {},
      meals: data.meals || []
    };

    return processedInfluencer;
  } catch (error) {
    console.error(`Error fetching influencer with ID ${id}:`, error);
    // Fallback to mock data in case of error
    console.warn('Falling back to mock data due to API error');
    return getMockInfluencerById(id);
  }
};

/**
 * Get mock influencer by ID (fallback function)
 * @param {String} id - Influencer ID
 * @returns {Promise} Promise that resolves to a mock influencer object
 */
const getMockInfluencerById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const influencer = MOCK_INFLUENCERS.find(inf => inf.id === id);

      if (influencer) {
        resolve(influencer);
      } else {
        reject(new Error('Influencer not found'));
      }
    }, 1000);
  });
};

/**
 * Follow an influencer
 * @param {String} id - Influencer ID
 * @returns {Promise} Promise that resolves to a success message
 */
export const followInfluencer = async (id) => {
  try {
    // Check if token exists
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required to follow influencers');
    }

    // Make API call
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.INFLUENCERS.FOLLOW}${id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );

    // Check if response is ok
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to follow influencer');
    }

    // Parse response
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error following influencer with ID ${id}:`, error);

    // For development, simulate API call if there's an error
    console.warn('Falling back to mock data due to API error');
    return getMockFollowInfluencer(id);
  }
};

/**
 * Unfollow an influencer
 * @param {String} id - Influencer ID
 * @returns {Promise} Promise that resolves to a success message
 */
export const unfollowInfluencer = async (id) => {
  try {
    // Check if token exists
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required to unfollow influencers');
    }

    // Make API call
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.INFLUENCERS.UNFOLLOW}${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );

    // Check if response is ok
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to unfollow influencer');
    }

    // Parse response
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error unfollowing influencer with ID ${id}:`, error);

    // For development, simulate API call if there's an error
    console.warn('Falling back to mock data due to API error');
    return getMockUnfollowInfluencer(id);
  }
};

/**
 * Toggle follow status for an influencer
 * @param {String} id - Influencer ID
 * @returns {Promise} Promise that resolves to a success message
 */
export const toggleFollowInfluencer = async (id) => {
  try {
    // First, get the current influencer to check follow status
    const influencer = await getInfluencerById(id);

    // Call the appropriate function based on current follow status
    if (influencer.isFollowing) {
      return unfollowInfluencer(id);
    } else {
      return followInfluencer(id);
    }
  } catch (error) {
    console.error(`Error toggling follow status for influencer with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Mock follow influencer (fallback function)
 * @param {String} id - Influencer ID
 * @returns {Promise} Promise that resolves to a mock success message
 */
const getMockFollowInfluencer = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Update the mock data
      const influencerIndex = MOCK_INFLUENCERS.findIndex(inf => inf.id === id);

      if (influencerIndex !== -1) {
        MOCK_INFLUENCERS[influencerIndex].isFollowing = true;
        MOCK_INFLUENCERS[influencerIndex].followers += 1;
      }

      resolve({
        success: true,
        message: 'Successfully followed influencer',
        followers_count: MOCK_INFLUENCERS[influencerIndex]?.followers || 0
      });
    }, 500);
  });
};

/**
 * Mock unfollow influencer (fallback function)
 * @param {String} id - Influencer ID
 * @returns {Promise} Promise that resolves to a mock success message
 */
const getMockUnfollowInfluencer = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Update the mock data
      const influencerIndex = MOCK_INFLUENCERS.findIndex(inf => inf.id === id);

      if (influencerIndex !== -1) {
        MOCK_INFLUENCERS[influencerIndex].isFollowing = false;
        MOCK_INFLUENCERS[influencerIndex].followers -= 1;
      }

      resolve({
        success: true,
        message: 'Successfully unfollowed influencer',
        followers_count: MOCK_INFLUENCERS[influencerIndex]?.followers || 0
      });
    }, 500);
  });
};

/**
 * Get influencer specialties (for filtering)
 * @returns {Promise} Promise that resolves to an array of specialty strings
 */
export const getInfluencerSpecialties = async () => {
  try {
    // Make API call
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.INFLUENCERS.LIST}/specialties`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    // Check if response is ok
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch specialties');
    }

    // Parse response
    const data = await response.json();

    // For development fallback, use mock data if API fails
    if (!data || !Array.isArray(data)) {
      console.warn('API returned invalid data, falling back to mock data');
      return getMockSpecialties();
    }

    return data;
  } catch (error) {
    console.error('Error fetching influencer specialties:', error);
    // Fallback to mock data in case of error
    console.warn('Falling back to mock data due to API error');
    return getMockSpecialties();
  }
};

/**
 * Get mock specialties (fallback function)
 * @returns {Promise} Promise that resolves to an array of mock specialty strings
 */
const getMockSpecialties = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const specialties = [...new Set(MOCK_INFLUENCERS.map(inf => inf.specialty))];
      resolve(specialties);
    }, 500);
  });
};
