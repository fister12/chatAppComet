import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { AppConstants } from '../utils/AppConstants';

interface LoginScreenProps {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ setIsLoggedIn }) => {
  const [isLoading, setIsLoading] = useState(false);

  const loginUser = async (uid: string, name: string) => {
    setIsLoading(true);
    try {
      // Simulate login process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Login successful for user:', uid, name);
      
      // Set the user as logged in
      setIsLoggedIn(true);
      
      Alert.alert('Success', `Welcome ${name}!`);
    } catch (error: any) {
      console.error('Login failed:', error);
      Alert.alert('Login Failed', error.message || 'Unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const renderUserItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.userItem}
      onPress={() => loginUser(item.uid, item.name)}
      disabled={isLoading}
    >
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userUid}>UID: {item.uid}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CometChat Sample App</Text>
      <Text style={styles.subtitle}>Select a user to login</Text>
      
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#3f51b5" />
          <Text style={styles.loadingText}>Logging in...</Text>
        </View>
      )}

      <FlatList
        data={AppConstants.sampleUsers}
        renderItem={renderUserItem}
        keyExtractor={(item) => item.uid}
        style={styles.userList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  userList: {
    flex: 1,
  },
  userItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  userUid: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
  },
});

export default LoginScreen;
