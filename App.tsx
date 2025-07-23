import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppConstants } from "./src/utils/AppConstants";
import RootStackNavigator from "./src/navigation/RootStackNavigator";

const App = (): React.ReactElement => {
  const [isInitializing, setIsInitializing] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasValidAppCredentials, setHasValidAppCredentials] = useState(true); // Set to true for now

  useEffect(() => {
    // Simulate initialization without CometChat for now
    const initApp = async () => {
      try {
        console.log("App initializing...");
        
        // Simulate some initialization delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        console.log("App initialized successfully");
      } catch (error) {
        console.log("Initialization error", error);
      } finally {
        setIsInitializing(false);
      }
    };

    initApp();
  }, []);

  if (isInitializing) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#3f51b5" />
        <Text style={styles.loadingText}>Initializing App...</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1 }}>
        <RootStackNavigator
          isLoggedIn={isLoggedIn}
          hasValidAppCredentials={hasValidAppCredentials}
          setIsLoggedIn={setIsLoggedIn}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default App;
