import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Switch,
  Alert,
  StyleSheet
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../config';
import LoadingIndicator from '../components/LoadingIndicator';
import AppIcon from '../assets/icon.js';

// Mock data for user profile
const MOCK_USER = {
  id: '1',
  name: 'Alex Johnson',
  username: '@alexjohnson',
  email: 'alex@example.com',
  avatar: 'https://randomuser.me/api/portraits/men/43.jpg',
  bio: 'Fitness enthusiast and healthy food lover. Working on building muscle and improving overall health.',
  isInfluencer: false,
  physicalProfile: {
    height: 178, // cm
    weight: 75, // kg
    age: 28,
    activityLevel: 'Moderate',
  },
  dietaryPreferences: ['High Protein', 'Low Carb', 'Gluten Free'],
  allergies: ['Peanuts', 'Shellfish'],
  healthGoals: ['Weight Management', 'Muscle Gain', 'Improved Energy'],
  favoriteInfluencers: [
    {
      id: '1',
      name: 'Fitness Chef',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      isVerified: true,
    },
    {
      id: '2',
      name: 'Nutrition Guru',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      isVerified: true,
    }
  ],
  favoriteMeals: [
    {
      id: '101',
      title: 'Protein-Packed Breakfast Bowl',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
      influencer: {
        name: 'Fitness Chef',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      },
      macros: {
        calories: 450,
        protein: 30,
        carbs: 45,
        fat: 15
      }
    },
    {
      id: '201',
      title: 'Green Smoothie Bowl',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
      influencer: {
        name: 'Nutrition Guru',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      },
      macros: {
        calories: 320,
        protein: 12,
        carbs: 60,
        fat: 8
      }
    }
  ],
  settings: {
    notifications: true,
    darkMode: false,
    metricUnits: true,
    privacyMode: false
  }
};

const ProfileScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [isInfluencer, setIsInfluencer] = useState(false);

  useEffect(() => {
    // Simulate API call to fetch user profile
    const fetchUserProfile = async () => {
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          setUser(MOCK_USER);
          setIsInfluencer(MOCK_USER.isInfluencer);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            // In a real app, this would clear the auth token and navigate to the auth screen
            Alert.alert('Success', 'You have been logged out');
          }
        }
      ]
    );
  };

  const toggleSetting = (setting) => {
    // In a real app, this would update the user settings in the database
    setUser(prevUser => ({
      ...prevUser,
      settings: {
        ...prevUser.settings,
        [setting]: !prevUser.settings[setting]
      }
    }));
  };

  const renderProfileTab = () => (
    <View style={{ padding: 16 }}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Physical Profile</Text>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Height</Text>
          <Text style={styles.infoValue}>{user.physicalProfile.height} cm</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Weight</Text>
          <Text style={styles.infoValue}>{user.physicalProfile.weight} kg</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Age</Text>
          <Text style={styles.infoValue}>{user.physicalProfile.age}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Activity Level</Text>
          <Text style={styles.infoValue}>{user.physicalProfile.activityLevel}</Text>
        </View>
        
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Physical Profile</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dietary Preferences</Text>
        
        <View style={styles.tagsContainer}>
          {user.dietaryPreferences.map((preference, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{preference}</Text>
            </View>
          ))}
        </View>
        
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Preferences</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Allergies & Restrictions</Text>
        
        <View style={styles.tagsContainer}>
          {user.allergies.map((allergy, index) => (
            <View key={index} style={[styles.tag, styles.allergyTag]}>
              <Text style={styles.tagText}>{allergy}</Text>
            </View>
          ))}
        </View>
        
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Allergies</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Health Goals</Text>
        
        <View style={styles.tagsContainer}>
          {user.healthGoals.map((goal, index) => (
            <View key={index} style={[styles.tag, styles.goalTag]}>
              <Text style={styles.tagText}>{goal}</Text>
            </View>
          ))}
        </View>
        
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Goals</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Information</Text>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoValue}>{user.email}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Username</Text>
          <Text style={styles.infoValue}>{user.username}</Text>
        </View>
        
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Account</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );

  const renderFavoritesTab = () => (
    <View style={{ padding: 16 }}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Favorite Influencers</Text>
        
        {user.favoriteInfluencers.map((influencer) => (
          <TouchableOpacity 
            key={influencer.id}
            style={styles.favoriteInfluencerItem}
            onPress={() => navigation.navigate('InfluencerProfile', { influencerId: influencer.id })}
          >
            <Image source={{ uri: influencer.avatar }} style={styles.favoriteInfluencerAvatar} />
            <View style={styles.favoriteInfluencerInfo}>
              <View style={styles.favoriteInfluencerNameContainer}>
                <Text style={styles.favoriteInfluencerName}>{influencer.name}</Text>
                {influencer.isVerified && (
                  <Ionicons name="checkmark-circle" size={16} color={THEME.COLORS.PRIMARY} style={styles.verifiedIcon} />
                )}
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={THEME.COLORS.TEXT_SECONDARY} />
          </TouchableOpacity>
        ))}
        
        {user.favoriteInfluencers.length === 0 && (
          <Text style={styles.emptyText}>You haven't followed any influencers yet</Text>
        )}
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Favorite Meals</Text>
        
        {user.favoriteMeals.map((meal) => (
          <TouchableOpacity 
            key={meal.id}
            style={styles.favoriteMealItem}
            onPress={() => navigation.navigate('MealDetail', { mealId: meal.id })}
          >
            <Image source={{ uri: meal.image }} style={styles.favoriteMealImage} />
            <View style={styles.favoriteMealInfo}>
              <Text style={styles.favoriteMealTitle}>{meal.title}</Text>
              <View style={styles.favoriteMealInfluencer}>
                <Image source={{ uri: meal.influencer.avatar }} style={styles.favoriteMealInfluencerAvatar} />
                <Text style={styles.favoriteMealInfluencerName}>{meal.influencer.name}</Text>
              </View>
              <View style={styles.favoriteMealMacros}>
                <Text style={styles.favoriteMealMacro}>{meal.macros.calories} cal</Text>
                <Text style={styles.favoriteMealMacro}>P: {meal.macros.protein}g</Text>
                <Text style={styles.favoriteMealMacro}>C: {meal.macros.carbs}g</Text>
                <Text style={styles.favoriteMealMacro}>F: {meal.macros.fat}g</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={THEME.COLORS.TEXT_SECONDARY} />
          </TouchableOpacity>
        ))}
        
        {user.favoriteMeals.length === 0 && (
          <Text style={styles.emptyText}>You haven't saved any meals yet</Text>
        )}
      </View>
    </View>
  );

  const renderSettingsTab = () => (
    <View style={{ padding: 16 }}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Settings</Text>
        
        <View style={styles.settingRow}>
          <View style={styles.settingLabelContainer}>
            <Ionicons name="notifications-outline" size={20} color={THEME.COLORS.TEXT} style={styles.settingIcon} />
            <Text style={styles.settingLabel}>Push Notifications</Text>
          </View>
          <Switch
            value={user.settings.notifications}
            onValueChange={() => toggleSetting('notifications')}
            trackColor={{ false: '#767577', true: THEME.COLORS.PRIMARY }}
            thumbColor="#FFFFFF"
          />
        </View>
        
        <View style={styles.settingRow}>
          <View style={styles.settingLabelContainer}>
            <Ionicons name="moon-outline" size={20} color={THEME.COLORS.TEXT} style={styles.settingIcon} />
            <Text style={styles.settingLabel}>Dark Mode</Text>
          </View>
          <Switch
            value={user.settings.darkMode}
            onValueChange={() => toggleSetting('darkMode')}
            trackColor={{ false: '#767577', true: THEME.COLORS.PRIMARY }}
            thumbColor="#FFFFFF"
          />
        </View>
        
        <View style={styles.settingRow}>
          <View style={styles.settingLabelContainer}>
            <Ionicons name="speedometer-outline" size={20} color={THEME.COLORS.TEXT} style={styles.settingIcon} />
            <Text style={styles.settingLabel}>Use Metric Units</Text>
          </View>
          <Switch
            value={user.settings.metricUnits}
            onValueChange={() => toggleSetting('metricUnits')}
            trackColor={{ false: '#767577', true: THEME.COLORS.PRIMARY }}
            thumbColor="#FFFFFF"
          />
        </View>
        
        <View style={styles.settingRow}>
          <View style={styles.settingLabelContainer}>
            <Ionicons name="eye-off-outline" size={20} color={THEME.COLORS.TEXT} style={styles.settingIcon} />
            <Text style={styles.settingLabel}>Privacy Mode</Text>
          </View>
          <Switch
            value={user.settings.privacyMode}
            onValueChange={() => toggleSetting('privacyMode')}
            trackColor={{ false: '#767577', true: THEME.COLORS.PRIMARY }}
            thumbColor="#FFFFFF"
          />
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Information</Text>
        
        <TouchableOpacity style={styles.infoRow}>
          <View style={styles.infoLabelContainer}>
            <Ionicons name="help-circle-outline" size={20} color={THEME.COLORS.TEXT} style={styles.infoIcon} />
            <Text style={styles.infoLabel}>Help & Support</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={THEME.COLORS.TEXT_SECONDARY} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.infoRow}>
          <View style={styles.infoLabelContainer}>
            <Ionicons name="document-text-outline" size={20} color={THEME.COLORS.TEXT} style={styles.infoIcon} />
            <Text style={styles.infoLabel}>Terms of Service</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={THEME.COLORS.TEXT_SECONDARY} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.infoRow}>
          <View style={styles.infoLabelContainer}>
            <Ionicons name="shield-checkmark-outline" size={20} color={THEME.COLORS.TEXT} style={styles.infoIcon} />
            <Text style={styles.infoLabel}>Privacy Policy</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={THEME.COLORS.TEXT_SECONDARY} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.infoRow}
          onPress={() => navigation.navigate('Config')}
        >
          <View style={styles.infoLabelContainer}>
            <Ionicons name="settings-outline" size={20} color={THEME.COLORS.TEXT} style={styles.infoIcon} />
            <Text style={styles.infoLabel}>Advanced Configuration</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={THEME.COLORS.TEXT_SECONDARY} />
        </TouchableOpacity>
        
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>FitFoodie v1.0.0</Text>
        </View>
      </View>
    </View>
  );

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: THEME.COLORS.BACKGROUND }}>
      <StatusBar barStyle="dark-content" />
      
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
        backgroundColor: THEME.COLORS.CARD
      }}>
        <Text style={{ fontSize: THEME.SIZES.TITLE, fontWeight: 'bold', color: THEME.COLORS.TEXT }}>Profile</Text>
        <TouchableOpacity
          style={{ padding: 8 }}
          onPress={() => Alert.alert('Edit Profile', 'This would open the profile editor')}
        >
          <Ionicons name="create-outline" size={24} color={THEME.COLORS.TEXT} />
        </TouchableOpacity>
      </View>
      
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{
          padding: 20,
          alignItems: 'center',
          backgroundColor: THEME.COLORS.CARD
        }}>
          {user.avatar ? (
            <Image 
              source={{ uri: user.avatar }} 
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                marginBottom: 16
              }} 
            />
          ) : (
            <AppIcon size={100} />
          )}
          <Text style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: THEME.COLORS.TEXT,
            marginBottom: 4
          }}>
            {user.name}
          </Text>
          <Text style={{
            fontSize: 16,
            color: THEME.COLORS.TEXT_SECONDARY,
            marginBottom: 8
          }}>
            {user.username}
          </Text>
          {user.bio && (
            <Text style={{
              fontSize: 14,
              color: THEME.COLORS.TEXT,
              textAlign: 'center',
              marginBottom: 8
            }}>
              {user.bio}
            </Text>
          )}
          
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <Text style={{ marginRight: 10, fontSize: 16, color: THEME.COLORS.TEXT }}>
              Influencer Mode
            </Text>
            <Switch
              value={isInfluencer}
              onValueChange={setIsInfluencer}
              trackColor={{ false: '#767577', true: THEME.COLORS.PRIMARY }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>
        
        <View style={{
          flexDirection: 'row',
          backgroundColor: THEME.COLORS.CARD,
          borderBottomWidth: 1,
          borderBottomColor: '#EEEEEE',
          marginTop: 8
        }}>
          <TouchableOpacity 
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 12,
              borderBottomWidth: 2,
              borderBottomColor: activeTab === 'profile' ? THEME.COLORS.PRIMARY : 'transparent'
            }}
            onPress={() => setActiveTab('profile')}
          >
            <Ionicons 
              name={activeTab === 'profile' ? "person" : "person-outline"} 
              size={20} 
              color={activeTab === 'profile' ? THEME.COLORS.PRIMARY : THEME.COLORS.TEXT_SECONDARY} 
            />
            <Text 
              style={{
                fontSize: 14,
                color: activeTab === 'profile' ? THEME.COLORS.PRIMARY : THEME.COLORS.TEXT_SECONDARY,
                marginLeft: 4,
                fontWeight: activeTab === 'profile' ? 'bold' : 'normal'
              }}
            >
              Profile
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 12,
              borderBottomWidth: 2,
              borderBottomColor: activeTab === 'favorites' ? THEME.COLORS.PRIMARY : 'transparent'
            }}
            onPress={() => setActiveTab('favorites')}
          >
            <Ionicons 
              name={activeTab === 'favorites' ? "heart" : "heart-outline"} 
              size={20} 
              color={activeTab === 'favorites' ? THEME.COLORS.PRIMARY : THEME.COLORS.TEXT_SECONDARY} 
            />
            <Text 
              style={{
                fontSize: 14,
                color: activeTab === 'favorites' ? THEME.COLORS.PRIMARY : THEME.COLORS.TEXT_SECONDARY,
                marginLeft: 4,
                fontWeight: activeTab === 'favorites' ? 'bold' : 'normal'
              }}
            >
              Favorites
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 12,
              borderBottomWidth: 2,
              borderBottomColor: activeTab === 'settings' ? THEME.COLORS.PRIMARY : 'transparent'
            }}
            onPress={() => setActiveTab('settings')}
          >
            <Ionicons 
              name={activeTab === 'settings' ? "settings" : "settings-outline"} 
              size={20} 
              color={activeTab === 'settings' ? THEME.COLORS.PRIMARY : THEME.COLORS.TEXT_SECONDARY} 
            />
            <Text 
              style={{
                fontSize: 14,
                color: activeTab === 'settings' ? THEME.COLORS.PRIMARY : THEME.COLORS.TEXT_SECONDARY,
                marginLeft: 4,
                fontWeight: activeTab === 'settings' ? 'bold' : 'normal'
              }}
            >
              Settings
            </Text>
          </TouchableOpacity>
        </View>
        
        {activeTab === 'profile' && renderProfileTab()}
        {activeTab === 'favorites' && renderFavoritesTab()}
        {activeTab === 'settings' && renderSettingsTab()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  section: {
    backgroundColor: THEME.COLORS.CARD,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: THEME.COLORS.TEXT,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  infoLabel: {
    fontSize: 16,
    color: THEME.COLORS.TEXT_SECONDARY,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: THEME.COLORS.TEXT,
  },
  editButton: {
    backgroundColor: '#F0F0F0',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 16,
  },
  editButtonText: {
    fontSize: 14,
    color: THEME.COLORS.PRIMARY,
    fontWeight: 'bold',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#E8F5E9',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
  },
  allergyTag: {
    backgroundColor: '#FFEBEE',
  },
  goalTag: {
    backgroundColor: '#E3F2FD',
  },
  tagText: {
    fontSize: 14,
    color: THEME.COLORS.PRIMARY,
  },
  logoutButton: {
    backgroundColor: '#F0F0F0',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: THEME.COLORS.ERROR,
  },
  favoriteInfluencerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  favoriteInfluencerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  favoriteInfluencerInfo: {
    flex: 1,
  },
  favoriteInfluencerNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  favoriteInfluencerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: THEME.COLORS.TEXT,
  },
  verifiedIcon: {
    marginLeft: 4,
  },
  favoriteMealItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  favoriteMealImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  favoriteMealInfo: {
    flex: 1,
  },
  favoriteMealTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: THEME.COLORS.TEXT,
    marginBottom: 4,
  },
  favoriteMealInfluencer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  favoriteMealInfluencerAvatar: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 4,
  },
  favoriteMealInfluencerName: {
    fontSize: 12,
    color: THEME.COLORS.TEXT_SECONDARY,
  },
  favoriteMealMacros: {
    flexDirection: 'row',
  },
  favoriteMealMacro: {
    fontSize: 12,
    color: THEME.COLORS.TEXT_SECONDARY,
    marginRight: 8,
  },
  emptyText: {
    fontSize: 14,
    color: THEME.COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    padding: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  settingLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 16,
    color: THEME.COLORS.TEXT,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  infoLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    marginRight: 12,
  },
  infoLabel: {
    fontSize: 16,
    color: THEME.COLORS.TEXT,
  },
  versionContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  versionText: {
    fontSize: 14,
    color: THEME.COLORS.TEXT_SECONDARY,
  },
});

export default ProfileScreen;
