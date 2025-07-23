import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CometChatUIKit, UIKitSettingsBuilder } from "@cometchat/chat-uikit-react";
import { COMETCHAT_APP_ID, COMETCHAT_REGION, COMETCHAT_AUTH_KEY } from '@env';
import { ConversationsScreen, UsersScreen, GroupsScreen } from './components';

interface User {
  uid: string;
  name: string;
}

/**
 * CometChat Constants from environment variables
 */
const COMETCHAT_CONSTANTS = {
  APP_ID: COMETCHAT_APP_ID,
  REGION: COMETCHAT_REGION,
  AUTH_KEY: COMETCHAT_AUTH_KEY,
};

/**
 * Sample users for demonstration
 */
const SAMPLE_USERS: User[] = [
  { uid: "user1", name: "Alice Johnson" },
  { uid: "user2", name: "Bob Smith" },
  { uid: "user3", name: "Charlie Brown" },
];

const Tab = createBottomTabNavigator();

// Auth Screen Component
const AuthScreen: React.FC<{
  onLogin: (user: User) => void;
  isLoading: boolean;
}> = ({ onLogin, isLoading }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>CometChat React Native</Text>
        <Text style={styles.headerSubtitle}>Please select a user to login</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Choose a User to Login:</Text>
        {SAMPLE_USERS.map((user) => (
          <TouchableOpacity
            key={user.uid}
            style={[styles.userButton, isLoading && styles.disabledButton]}
            onPress={() => !isLoading && onLogin(user)}
            disabled={isLoading}
          >
            <Text style={styles.userButtonText}>{user.name}</Text>
            <Text style={styles.userButtonSubtext}>ID: {user.uid}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

// Main App Tabs Component
const AppTabs: React.FC<{
  currentUser: User;
  onLogout: () => void;
}> = ({ currentUser, onLogout }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#3f51b5',
        tabBarInactiveTintColor: '#666',
        headerStyle: {
          backgroundColor: '#3f51b5',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: () => (
          <TouchableOpacity
            style={styles.logoutHeaderButton}
            onPress={onLogout}
          >
            <Text style={styles.logoutHeaderText}>Logout</Text>
          </TouchableOpacity>
        ),
      }}
    >
      <Tab.Screen 
        name="Conversations" 
        component={ConversationsScreen}
        options={{
          title: `Chats - ${currentUser.name}`,
        }}
      />
      <Tab.Screen 
        name="Users" 
        component={UsersScreen}
        options={{
          title: 'Users',
        }}
      />
      <Tab.Screen 
        name="Groups" 
        component={GroupsScreen}
        options={{
          title: 'Groups',
        }}
      />
    </Tab.Navigator>
  );
};

export default function AppWithNavigation() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  /**
   * Configure the CometChat UI Kit using the UIKitSettingsBuilder
   */
  const UIKitSettings = new UIKitSettingsBuilder()
    .setAppId(COMETCHAT_CONSTANTS.APP_ID)
    .setRegion(COMETCHAT_CONSTANTS.REGION)
    .setAuthKey(COMETCHAT_CONSTANTS.AUTH_KEY)
    .subscribePresenceForAllUsers()
    .build();

  /**
   * Initialize CometChat UI Kit
   */
  useEffect(() => {
    initializeCometChat();
  }, []);

  const initializeCometChat = async () => {
    try {
      setIsLoading(true);
      setError(null);

      await CometChatUIKit.init(UIKitSettings);
      console.log("CometChat UI Kit initialized successfully.");
      setIsInitialized(true);
    } catch (error) {
      console.error("CometChat UI Kit initialization failed:", error);
      setError("Failed to initialize CometChat. Please check your configuration.");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Login user to CometChat
   */
  const loginUser = async (user: User) => {
    if (!isInitialized) {
      Alert.alert("Error", "CometChat is not initialized yet.");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      await CometChatUIKit.login(user.uid);
      console.log(`User ${user.name} logged in successfully.`);
      setCurrentUser(user);
    } catch (error) {
      console.error("Login failed:", error);
      setError(`Failed to login ${user.name}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Logout current user
   */
  const logoutUser = async () => {
    try {
      setIsLoading(true);
      await CometChatUIKit.logout();
      console.log("User logged out successfully.");
      setCurrentUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
      Alert.alert("Error", "Failed to logout. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Render loading state
   */
  if (isLoading && !currentUser) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3f51b5" />
          <Text style={styles.loadingText}>
            {isInitialized ? "Connecting..." : "Initializing CometChat..."}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  /**
   * Render error state
   */
  if (error && !currentUser) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Something went wrong</Text>
          <Text style={styles.errorMessage}>{error}</Text>
          <TouchableOpacity 
            style={styles.retryButton} 
            onPress={initializeCometChat}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  /**
   * Render main application
   */
  return (
    <NavigationContainer>
      {currentUser ? (
        <AppTabs currentUser={currentUser} onLogout={logoutUser} />
      ) : (
        <AuthScreen onLogin={loginUser} isLoading={isLoading} />
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#d32f2f',
    marginBottom: 12,
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  retryButton: {
    backgroundColor: '#3f51b5',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    backgroundColor: '#3f51b5',
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#e3f2fd',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  userButton: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  disabledButton: {
    opacity: 0.6,
  },
  userButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  userButtonSubtext: {
    fontSize: 14,
    color: '#666',
  },
  tabBar: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingBottom: 5,
    paddingTop: 5,
  },
  logoutHeaderButton: {
    marginRight: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 6,
  },
  logoutHeaderText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
