import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../config';
import AppIcon from '../assets/icon.js';

const AuthScreen = ({ navigation }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isInfluencer, setIsInfluencer] = useState(false);

  const handleAuth = () => {
    if (isLogin) {
      // Handle login
      if (!username || !password) {
        Alert.alert('Error', 'Please fill in all fields');
        return;
      }

      // In a real app, this would make an API call to authenticate the user
      Alert.alert('Success', 'Login successful!');
    } else {
      // Handle registration
      if (!username || !email || !password || !confirmPassword) {
        Alert.alert('Error', 'Please fill in all fields');
        return;
      }

      if (password !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match');
        return;
      }

      // In a real app, this would make an API call to register the user
      Alert.alert('Success', 'Registration successful!');
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setShowPassword(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <View style={styles.appIconContainer}>
                <Text style={styles.appIconText}>FF</Text>
              </View>
            </View>
            <Text style={styles.appName}>FitFoodie</Text>
            <Text style={styles.tagline}>Discover influencer meals with macros</Text>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>{isLogin ? 'Login' : 'Create Account'}</Text>

            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color={THEME.COLORS.TEXT_SECONDARY} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
            </View>

            {!isLogin && (
              <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={20} color={THEME.COLORS.TEXT_SECONDARY} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>
            )}

            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color={THEME.COLORS.TEXT_SECONDARY} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={styles.passwordToggle}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color={THEME.COLORS.TEXT_SECONDARY}
                />
              </TouchableOpacity>
            </View>

            {!isLogin && (
              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color={THEME.COLORS.TEXT_SECONDARY} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showPassword}
                />
              </View>
            )}

            {!isLogin && (
              <View style={styles.checkboxContainer}>
                <TouchableOpacity
                  style={styles.checkbox}
                  onPress={() => setIsInfluencer(!isInfluencer)}
                >
                  {isInfluencer && (
                    <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                  )}
                </TouchableOpacity>
                <Text style={styles.checkboxLabel}>Register as an Influencer</Text>
              </View>
            )}

            <TouchableOpacity
              style={styles.authButton}
              onPress={handleAuth}
            >
              <Text style={styles.authButtonText}>{isLogin ? 'Login' : 'Register'}</Text>
            </TouchableOpacity>

            {isLogin && (
              <TouchableOpacity style={styles.forgotPasswordButton}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.socialAuthContainer}>
            <Text style={styles.socialAuthText}>Or continue with</Text>

            <View style={styles.socialButtonsContainer}>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-google" size={24} color="#DB4437" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-apple" size={24} color="#000000" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-facebook" size={24} color="#4267B2" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.toggleContainer}>
            <Text style={styles.toggleText}>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
            </Text>
            <TouchableOpacity onPress={toggleAuthMode}>
              <Text style={styles.toggleButtonText}>
                {isLogin ? 'Register' : 'Login'}
              </Text>
            </TouchableOpacity>
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
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  logo: {
    marginBottom: 16,
  },
  appIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: THEME.COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appIconText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: THEME.COLORS.PRIMARY,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: THEME.COLORS.TEXT_SECONDARY,
  },
  formContainer: {
    backgroundColor: THEME.COLORS.CARD,
    borderRadius: THEME.BORDER_RADIUS.MEDIUM,
    padding: 20,
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: THEME.COLORS.TEXT,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: THEME.BORDER_RADIUS.SMALL,
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: THEME.COLORS.TEXT,
  },
  passwordToggle: {
    padding: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: THEME.COLORS.PRIMARY,
    backgroundColor: isInfluencer => isInfluencer ? THEME.COLORS.PRIMARY : 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkboxLabel: {
    fontSize: 14,
    color: THEME.COLORS.TEXT,
  },
  authButton: {
    backgroundColor: THEME.COLORS.PRIMARY,
    borderRadius: THEME.BORDER_RADIUS.MEDIUM,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  authButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  forgotPasswordButton: {
    alignSelf: 'center',
  },
  forgotPasswordText: {
    fontSize: 14,
    color: THEME.COLORS.PRIMARY,
  },
  socialAuthContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  socialAuthText: {
    fontSize: 14,
    color: THEME.COLORS.TEXT_SECONDARY,
    marginBottom: 16,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  toggleText: {
    fontSize: 14,
    color: THEME.COLORS.TEXT_SECONDARY,
  },
  toggleButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: THEME.COLORS.PRIMARY,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
});

export default AuthScreen;
