import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CometChatUsers } from '@cometchat/chat-uikit-react';

export const UsersScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <CometChatUsers />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
