# CometChat React Native Assignment

A React Native application integrated with CometChat UI Kit for real-time messaging.

## Features

- ✅ CometChat UI Kit integration
- ✅ Environment variables configuration
- ✅ User authentication
- ✅ Real-time messaging capabilities
- ✅ Clean and modern UI
- ✅ Error handling and loading states

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- CometChat account and app credentials

## Setup Instructions

### 1. CometChat Configuration

1. Create a CometChat account at [https://www.cometchat.com/](https://www.cometchat.com/)
2. Create a new app in the CometChat dashboard
3. Note down your:
   - App ID
   - Region
   - Auth Key

### 2. Environment Variables

The `.env` file contains your CometChat credentials:

```env
COMETCHAT_APP_ID=your_app_id_here
COMETCHAT_REGION=your_region_here
COMETCHAT_AUTH_KEY=your_auth_key_here
```

**Important:** The current `.env` file contains sample credentials. Replace them with your actual CometChat app credentials.

### 3. Installation

```bash
# Install dependencies
npm install

# Start the Expo development server
npm start
```

### 4. Running the App

```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## Project Structure

```
comet-assingment/
├── App.tsx                 # Main application component
├── babel.config.js         # Babel configuration for env vars
├── .env                    # Environment variables
├── components/             # Reusable components
│   ├── ConversationsScreen.tsx
│   ├── UsersScreen.tsx
│   ├── GroupsScreen.tsx
│   └── index.ts
├── types/
│   └── env.d.ts           # TypeScript declarations for env vars
└── assets/                # App assets
```

## Usage

1. **Initialize**: The app automatically initializes CometChat on startup
2. **Login**: Select a sample user to login (you can modify the sample users in `App.tsx`)
3. **Chat**: Once logged in, you can access various CometChat features

## Sample Users

The app includes three sample users for testing:
- Alice Johnson (user1)
- Bob Smith (user2)  
- Charlie Brown (user3)

## CometChat Features Integrated

- ✅ **Initialization**: Automatic CometChat SDK initialization
- ✅ **Authentication**: User login/logout functionality
- ✅ **Presence**: Real-time user presence updates
- 🔄 **Conversations**: Ready for CometChatConversations component
- 🔄 **Users List**: Ready for CometChatUsers component
- 🔄 **Groups**: Ready for CometChatGroups component
- 🔄 **Messages**: Ready for CometChatMessages component

## Extending the App

To add more CometChat components:

1. Import the desired component from `@cometchat/chat-uikit-react`
2. Add it to your screen components
3. Handle navigation between different screens

Example:
```tsx
import { CometChatConversations } from '@cometchat/chat-uikit-react';

// Use in your component
<CometChatConversations />
```

## Troubleshooting

### Common Issues

1. **Environment Variables Not Loading**
   - Make sure you've restarted the Metro bundler after adding/changing `.env`
   - Check that variable names in `.env` match those in `types/env.d.ts`

2. **CometChat Initialization Failed**
   - Verify your App ID, Region, and Auth Key are correct
   - Check your internet connection
   - Ensure your CometChat app is active

3. **Login Failed**
   - Make sure the user exists in your CometChat app
   - Check that Auth Key has the correct permissions

### Getting Help

- [CometChat Documentation](https://www.cometchat.com/docs)
- [CometChat React Native UI Kit](https://www.cometchat.com/docs/react-native-uikit/overview)
- [Expo Documentation](https://docs.expo.dev/)

## License

This project is for assignment/educational purposes.
