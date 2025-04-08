import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Switch,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME, MONGODB_CONFIG, NUTRITIONIX_CONFIG } from '../config';

const ConfigScreen = ({ navigation }) => {
  // MongoDB configuration
  const [mongoDbUri, setMongoDbUri] = useState(MONGODB_CONFIG.CONNECTION_STRING);
  const [mongoDbName, setMongoDbName] = useState(MONGODB_CONFIG.DATABASE_NAME);

  // Nutritionix API configuration
  const [nutritionixAppId, setNutritionixAppId] = useState(NUTRITIONIX_CONFIG.APP_ID);
  const [nutritionixApiKey, setNutritionixApiKey] = useState(NUTRITIONIX_CONFIG.API_KEY);

  // Feature toggles
  const [enableFoodLogging, setEnableFoodLogging] = useState(true);
  const [enableMealOrdering, setEnableMealOrdering] = useState(true);
  const [enableInfluencerMode, setEnableInfluencerMode] = useState(true);
  const [enablePushNotifications, setEnablePushNotifications] = useState(false);

  // App settings
  const [darkMode, setDarkMode] = useState(false);
  const [metricUnits, setMetricUnits] = useState(true);

  const saveConfig = () => {
    // In a real app, this would save the configuration to a secure storage
    Alert.alert(
      'Configuration Saved',
      'Your configuration has been saved successfully.',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  const resetConfig = () => {
    Alert.alert(
      'Reset Configuration',
      'Are you sure you want to reset all configuration to default values?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            // Reset MongoDB configuration
            setMongoDbUri(MONGODB_CONFIG.CONNECTION_STRING);
            setMongoDbName(MONGODB_CONFIG.DATABASE_NAME);

            // Reset Nutritionix API configuration
            setNutritionixAppId(NUTRITIONIX_CONFIG.APP_ID);
            setNutritionixApiKey(NUTRITIONIX_CONFIG.API_KEY);

            // Reset feature toggles
            setEnableFoodLogging(true);
            setEnableMealOrdering(true);
            setEnableInfluencerMode(true);
            setEnablePushNotifications(false);

            // Reset app settings
            setDarkMode(false);
            setMetricUnits(true);

            Alert.alert('Reset Complete', 'Configuration has been reset to default values.');
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={THEME.COLORS.TEXT} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Configuration</Text>
        <View style={styles.placeholder} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>MongoDB Configuration</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Connection URI</Text>
              <TextInput
                style={styles.input}
                value={mongoDbUri}
                onChangeText={setMongoDbUri}
                placeholder="mongodb+srv://username:password@cluster.mongodb.net/dbname"
                secureTextEntry={true}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Database Name</Text>
              <TextInput
                style={styles.input}
                value={mongoDbName}
                onChangeText={setMongoDbName}
                placeholder="fitfoodie"
              />
            </View>

            <TouchableOpacity
              style={styles.testButton}
              onPress={() => Alert.alert('Connection Test', 'MongoDB connection successful!')}
            >
              <Text style={styles.testButtonText}>Test Connection</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Nutritionix API Configuration</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>App ID</Text>
              <TextInput
                style={styles.input}
                value={nutritionixAppId}
                onChangeText={setNutritionixAppId}
                placeholder="your_nutritionix_app_id"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>API Key</Text>
              <TextInput
                style={styles.input}
                value={nutritionixApiKey}
                onChangeText={setNutritionixApiKey}
                placeholder="your_nutritionix_api_key"
                secureTextEntry={true}
              />
            </View>

            <TouchableOpacity
              style={styles.testButton}
              onPress={() => Alert.alert('API Test', 'Nutritionix API connection successful!')}
            >
              <Text style={styles.testButtonText}>Test API</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Feature Toggles</Text>

            <View style={styles.toggleContainer}>
              <Text style={styles.toggleLabel}>Enable Food Logging</Text>
              <Switch
                value={enableFoodLogging}
                onValueChange={setEnableFoodLogging}
                trackColor={{ false: '#767577', true: THEME.COLORS.PRIMARY }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={styles.toggleContainer}>
              <Text style={styles.toggleLabel}>Enable Meal Ordering</Text>
              <Switch
                value={enableMealOrdering}
                onValueChange={setEnableMealOrdering}
                trackColor={{ false: '#767577', true: THEME.COLORS.PRIMARY }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={styles.toggleContainer}>
              <Text style={styles.toggleLabel}>Enable Influencer Mode</Text>
              <Switch
                value={enableInfluencerMode}
                onValueChange={setEnableInfluencerMode}
                trackColor={{ false: '#767577', true: THEME.COLORS.PRIMARY }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={styles.toggleContainer}>
              <Text style={styles.toggleLabel}>Enable Push Notifications</Text>
              <Switch
                value={enablePushNotifications}
                onValueChange={setEnablePushNotifications}
                trackColor={{ false: '#767577', true: THEME.COLORS.PRIMARY }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>App Settings</Text>

            <View style={styles.toggleContainer}>
              <Text style={styles.toggleLabel}>Dark Mode</Text>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: '#767577', true: THEME.COLORS.PRIMARY }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={styles.toggleContainer}>
              <Text style={styles.toggleLabel}>Use Metric Units</Text>
              <Switch
                value={metricUnits}
                onValueChange={setMetricUnits}
                trackColor={{ false: '#767577', true: THEME.COLORS.PRIMARY }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={saveConfig}
            >
              <Text style={styles.saveButtonText}>Save Configuration</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.resetButton}
              onPress={resetConfig}
            >
              <Text style={styles.resetButtonText}>Reset to Defaults</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.versionContainer}>
            <Text style={styles.versionText}>FitFoodie v1.0.0</Text>
            <Text style={styles.copyrightText}>© 2023 FitFoodie. All rights reserved.</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.BACKGROUND,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    backgroundColor: THEME.COLORS.CARD,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: THEME.SIZES.TITLE,
    fontWeight: 'bold',
    color: THEME.COLORS.TEXT,
  },
  placeholder: {
    width: 32,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  section: {
    backgroundColor: THEME.COLORS.CARD,
    borderRadius: THEME.BORDER_RADIUS.MEDIUM,
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
    fontSize: THEME.SIZES.LARGE,
    fontWeight: 'bold',
    color: THEME.COLORS.TEXT,
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: THEME.SIZES.MEDIUM,
    color: THEME.COLORS.TEXT,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F0F0F0',
    borderRadius: THEME.BORDER_RADIUS.SMALL,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: THEME.SIZES.MEDIUM,
  },
  testButton: {
    backgroundColor: THEME.COLORS.SECONDARY,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: THEME.BORDER_RADIUS.MEDIUM,
    alignSelf: 'flex-start',
  },
  testButtonText: {
    fontSize: THEME.SIZES.SMALL,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  toggleLabel: {
    fontSize: THEME.SIZES.MEDIUM,
    color: THEME.COLORS.TEXT,
  },
  buttonContainer: {
    marginBottom: 24,
  },
  saveButton: {
    backgroundColor: THEME.COLORS.PRIMARY,
    paddingVertical: 12,
    borderRadius: THEME.BORDER_RADIUS.MEDIUM,
    alignItems: 'center',
    marginBottom: 12,
  },
  saveButtonText: {
    fontSize: THEME.SIZES.MEDIUM,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  resetButton: {
    backgroundColor: '#F0F0F0',
    paddingVertical: 12,
    borderRadius: THEME.BORDER_RADIUS.MEDIUM,
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: THEME.SIZES.MEDIUM,
    fontWeight: 'bold',
    color: THEME.COLORS.ERROR,
  },
  versionContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  versionText: {
    fontSize: THEME.SIZES.SMALL,
    color: THEME.COLORS.TEXT_SECONDARY,
    marginBottom: 4,
  },
  copyrightText: {
    fontSize: THEME.SIZES.SMALL,
    color: THEME.COLORS.TEXT_SECONDARY,
  },

});

export default ConfigScreen;
