import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CometChatConversations } from '@cometchat/chat-uikit-react';

export const ConversationsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <CometChatConversations />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
