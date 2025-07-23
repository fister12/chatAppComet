import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createStackNavigator();

interface RootStackNavigatorProps {
  isLoggedIn: boolean;
  hasValidAppCredentials: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const RootStackNavigator: React.FC<RootStackNavigatorProps> = ({
  isLoggedIn,
  hasValidAppCredentials,
  setIsLoggedIn,
}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!hasValidAppCredentials ? (
          <Stack.Screen name="Settings" component={SettingsScreen} />
        ) : !isLoggedIn ? (
          <Stack.Screen 
            name="Login" 
            children={() => <LoginScreen setIsLoggedIn={setIsLoggedIn} />}
          />
        ) : (
          <Stack.Screen 
            name="Home" 
            children={() => <HomeScreen setIsLoggedIn={setIsLoggedIn} />}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStackNavigator;
