import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CometChatGroups } from '@cometchat/chat-uikit-react';

export const GroupsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <CometChatGroups />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
