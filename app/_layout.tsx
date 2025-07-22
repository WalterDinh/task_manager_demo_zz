import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

import { useFonts } from "expo-font";
import { Redirect, Slot, Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useState } from "react";
import "react-native-reanimated";
import { TamaguiProvider } from "tamagui";
import { ToastProvider } from "@tamagui/toast";

import { useColorScheme } from "@/hooks/useColorScheme";
import tamaguiConfig from "@/tamagui.config";
import { useThemeStore } from "@/store/themeStore";
import LoadingModal from "@/components/modal/LoadingModal";
import { getAuth, onAuthStateChanged } from "@react-native-firebase/auth";
import { auth, db } from "@/firebase/config";
import {
  collection,
  doc,
  setDoc,
  query,
  where,
  getDocs,
  serverTimestamp,
  FirestoreError,
  getDoc,
} from "firebase/firestore";
import { useAuthStore } from "@/store/useAuthStore";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useNotificationPermission } from "@/hooks/useNotificationPermission";
import * as Notifications from "expo-notifications";

// Prevent the splash screen from auto-hiding before asset loading is complete.

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { theme } = useThemeStore();

  const setUser = useAuthStore((s) => s.setUser);
  const router = useRouter();
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });
  useNotificationPermission();

  // Hide when app is ready
  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });
    const unsub = onAuthStateChanged(getAuth(), async (firebaseUser) => {
      try {
        if (firebaseUser) {
          // Map firebaseUser to your local User type, ensuring email is not null
          const localUser = {
            uid: firebaseUser.uid,
            email: firebaseUser.email ?? "",
            displayName: firebaseUser.displayName ?? "",
            photoURL: firebaseUser.photoURL ?? "",
            // Add other fields as required by your User type
          };
          const userSnap = await getDoc(doc(db, "users", firebaseUser.uid));
          if (userSnap.exists()) {
            setUser(userSnap.data());
          }
          router.replace("/home");
        } else {
          setUser(null);
          router.replace("/login");
        }
      } catch (e) {
        console.warn(e);
      } finally {
        SplashScreen.hide();
      }
    });
    return unsub;
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme!}>
        <ThemeProvider value={theme === "dark" ? DarkTheme : DefaultTheme}>
          <ToastProvider swipeDirection="horizontal">
            <Stack screenOptions={{ headerShown: false }}>
              <Slot />
            </Stack>
            <LoadingModal />
            <StatusBar style="auto" />
          </ToastProvider>
        </ThemeProvider>
      </TamaguiProvider>
    </GestureHandlerRootView>
  );
}
