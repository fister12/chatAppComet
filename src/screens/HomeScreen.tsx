import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

type TabType = 'conversations' | 'users' | 'groups';

interface HomeScreenProps {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ setIsLoggedIn }) => {
  const [activeTab, setActiveTab] = useState<TabType>('conversations');

  const logout = async () => {
    try {
      // Simulate logout process
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Set the user as logged out
      setIsLoggedIn(false);
      
      Alert.alert('Success', 'Logged out successfully');
      console.log('User logged out');
    } catch (error: any) {
      Alert.alert('Logout Failed', error.message);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'conversations':
        return (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>Conversations will be here</Text>
            <Text style={styles.placeholderSubtext}>CometChat UI components loading...</Text>
          </View>
        );
      case 'users':
        return (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>Users will be here</Text>
            <Text style={styles.placeholderSubtext}>CometChat UI components loading...</Text>
          </View>
        );
      case 'groups':
        return (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>Groups will be here</Text>
            <Text style={styles.placeholderSubtext}>CometChat UI components loading...</Text>
          </View>
        );
      default:
        return (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>Welcome to CometChat</Text>
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>CometChat</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'conversations' && styles.activeTab]}
          onPress={() => setActiveTab('conversations')}
        >
          <Text style={[styles.tabText, activeTab === 'conversations' && styles.activeTabText]}>
            Chats
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'users' && styles.activeTab]}
          onPress={() => setActiveTab('users')}
        >
          <Text style={[styles.tabText, activeTab === 'users' && styles.activeTabText]}>
            Users
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'groups' && styles.activeTab]}
          onPress={() => setActiveTab('groups')}
        >
          <Text style={[styles.tabText, activeTab === 'groups' && styles.activeTabText]}>
            Groups
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {renderContent()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#3f51b5',
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  logoutButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 4,
  },
  logoutText: {
    color: '#fff',
    fontSize: 14,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#3f51b5',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  placeholderText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  placeholderSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default HomeScreen;
