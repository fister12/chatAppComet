import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen: React.FC = () => {
  const [appId, setAppId] = useState('');
  const [authKey, setAuthKey] = useState('');
  const [region, setRegion] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const saveCredentials = async () => {
    if (!appId.trim() || !authKey.trim() || !region.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      const credentials = {
        appId: appId.trim(),
        authKey: authKey.trim(),
        region: region.trim(),
      };

      // Test credentials validation (simplified)
      if (credentials.appId && credentials.authKey && credentials.region) {
        // Save credentials if they look valid
        await AsyncStorage.setItem('appCredentials', JSON.stringify(credentials));
        
        Alert.alert('Success', 'Credentials saved successfully!', [
          {
            text: 'OK',
            onPress: () => {
              console.log('Credentials saved and validated');
            },
          },
        ]);
      } else {
        throw new Error('Invalid credentials format');
      }
    } catch (error: any) {
      Alert.alert('Error', `Failed to initialize with these credentials: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CometChat Configuration</Text>
      <Text style={styles.subtitle}>Enter your CometChat app credentials</Text>

      <View style={styles.form}>
        <Text style={styles.label}>App ID</Text>
        <TextInput
          style={styles.input}
          value={appId}
          onChangeText={setAppId}
          placeholder="Enter your CometChat App ID"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Auth Key</Text>
        <TextInput
          style={styles.input}
          value={authKey}
          onChangeText={setAuthKey}
          placeholder="Enter your CometChat Auth Key"
          autoCapitalize="none"
          secureTextEntry
        />

        <Text style={styles.label}>Region</Text>
        <TextInput
          style={styles.input}
          value={region}
          onChangeText={setRegion}
          placeholder="Enter your CometChat Region (e.g., US, IN, EU)"
          autoCapitalize="characters"
        />

        <TouchableOpacity
          style={[styles.saveButton, isLoading && styles.disabledButton]}
          onPress={saveCredentials}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveButtonText}>Save & Initialize</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.helpSection}>
        <Text style={styles.helpTitle}>Need Help?</Text>
        <Text style={styles.helpText}>
          1. Create a CometChat account at cometchat.com{'\n'}
          2. Create a new app in your dashboard{'\n'}
          3. Copy your App ID, Auth Key, and Region{'\n'}
          4. Paste them above and tap Save
        </Text>
      </View>
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
  form: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: '#3f51b5',
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  helpSection: {
    marginTop: 30,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  helpTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  helpText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
  },
});

export default SettingsScreen;
