import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, View, ViewStyle } from "react-native";
import {
  CometChatUIKit,
  CometChatThemeProvider,
  CometChatUIEventHandler,
  CometChatUIEvents,
  CometChatIncomingCall,
} from "@cometchat/chat-uikit-react-native";
import { CometChat } from "@cometchat/chat-sdk-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppConstants } from "./src/utils/AppConstants";
import RootStackNavigator from "./src/navigation/RootStackNavigator";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Camera } from "expo-camera";
import { Audio } from "expo-av";

const listenerId = "app";

const App = (): React.ReactElement => {
  const [isInitializing, setIsInitializing] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasValidAppCredentials, setHasValidAppCredentials] = useState(false);
  const [callReceived, setCallReceived] = useState(false);
  const incomingCall = useRef<CometChat.Call | CometChat.CustomMessage | null>(null);

  useEffect(() => {
    const initCometChat = async () => {
      try {
        // Retrieve stored credentials
        const storedCredentials = JSON.parse(
          (await AsyncStorage.getItem("appCredentials")) || "{}"
        );

        // Determine final credentials
        const finalAppId = storedCredentials.appId || AppConstants.appId;
        const finalAuthKey = storedCredentials.authKey || AppConstants.authKey;
        const finalRegion = storedCredentials.region || AppConstants.region;

        // Validate credentials
        const credentialsValid = !!finalAppId && !!finalAuthKey && !!finalRegion;
        setHasValidAppCredentials(credentialsValid);

        if (!credentialsValid) {
          setIsInitializing(false);
          return;
        }

        console.log("Initializing CometChat with:", {
          appId: finalAppId,
          region: finalRegion,
          authKeyPresent: !!finalAuthKey
        });

        // Initialize CometChat
        await CometChatUIKit.init({
          appId: finalAppId,
          authKey: finalAuthKey,
          region: finalRegion,
          subscriptionType: "ALL_USERS",
        });

        console.log("CometChat initialized successfully");

        // Check if user is already logged in
        const loggedInUser = await CometChat.getLoggedinUser();
        if (loggedInUser) {
          console.log("User already logged in:", loggedInUser.getName());
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.log("Initialization error", error);
        setHasValidAppCredentials(false);
      } finally {
        setIsInitializing(false);
      }
    };

    initCometChat();
  }, []);

  /**
   * Attach CometChat login listener to handle login and logout events.
   */
  useEffect(() => {
    CometChat.addLoginListener(
      listenerId,
      new CometChat.LoginListener({
        loginSuccess: () => {
          console.log("Login successful");
          setIsLoggedIn(true);
        },
        loginFailure: (e: CometChat.CometChatException) => {
          console.log("LoginListener :: loginFailure", e.message);
        },
        logoutSuccess: () => {
          console.log("Logout successful");
          setIsLoggedIn(false);
        },
        logoutFailure: (e: CometChat.CometChatException) => {
          console.log("LoginListener :: logoutFailure", e.message);
        },
      })
    );

    return () => {
      CometChat.removeLoginListener(listenerId);
    };
  }, []);

  /**
   * Attach CometChat call listeners
   */
  useEffect(() => {
    CometChat.addCallListener(
      listenerId,
      new CometChat.CallListener({
        onIncomingCallReceived: (call: CometChat.Call) => {
          try {
            const activeCall = CometChat.getActiveCall();
            if (activeCall) {
              setTimeout(() => {
                CometChat.rejectCall(call.getSessionId(), CometChat.CALL_STATUS.BUSY)
                  .then(() => console.log("Incoming call rejected due to active call"))
                  .catch((error) => console.error("Error rejecting call:", error));
              }, 2000);
            } else {
              CometChatUIEventHandler.emitUIEvent(
                CometChatUIEvents.ccToggleBottomSheet,
                { isBottomSheetVisible: false }
              );
              incomingCall.current = call;
              setCallReceived(true);
            }
          } catch (error) {
            console.error("Error getting active call:", error);
            incomingCall.current = call;
            setCallReceived(true);
          }
        },
        onOutgoingCallRejected: () => {
          incomingCall.current = null;
          setCallReceived(false);
        },
        onIncomingCallCancelled: () => {
          incomingCall.current = null;
          setCallReceived(false);
        },
      })
    );

    CometChatUIEventHandler.addCallListener(listenerId, {
      ccCallEnded: () => {
        console.log("Call ended, clearing incoming call state");
        incomingCall.current = null;
        setCallReceived(false);
      },
    });

    return () => {
      CometChatUIEventHandler.removeCallListener(listenerId);
      CometChat.removeCallListener(listenerId);
    };
  }, [isLoggedIn]);

  useEffect(() => {
    const requestPermissions = async () => {
      try {
        const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
        const { status: micStatus } = await Audio.requestPermissionsAsync();

        if (cameraStatus !== "granted" || micStatus !== "granted") {
          console.warn("Camera or microphone permission not granted.");
        }
      } catch (error) {
        console.error("Permission request error:", error);
      }
    };

    requestPermissions();
  }, []);

  if (isInitializing) {
    return (
      <View style={[styles.fullScreen, styles.centerContent]}>
        <ActivityIndicator size="large" color="#3f51b5" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1 }}>
        <CometChatThemeProvider>
          {isLoggedIn && callReceived && incomingCall.current ? (
            <CometChatIncomingCall
              call={incomingCall.current}
              onDecline={() => {
                incomingCall.current = null;
                setCallReceived(false);
              }}
            />
          ) : null}
          <RootStackNavigator
            isLoggedIn={isLoggedIn}
            hasValidAppCredentials={hasValidAppCredentials}
          />
        </CometChatThemeProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles: { fullScreen: ViewStyle; centerContent: ViewStyle } = {
  fullScreen: { flex: 1 },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },
};

export default App;