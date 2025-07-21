import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

import { useFonts } from "expo-font";
import { Redirect, Slot, Stack, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import "react-native-reanimated";
import { TamaguiProvider } from "tamagui";

import { useColorScheme } from "@/hooks/useColorScheme";
import tamaguiConfig from "@/tamagui.config";
import { useThemeStore } from "@/store/themeStore";
import LoadingModal from "@/components/modal/LoadingModal";

// Prevent the splash screen from auto-hiding before asset loading is complete.

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);
  const colorScheme = useColorScheme();
  const { theme } = useThemeStore();
  const segments = useSegments();
  const inAuth = segments[0] === "(auth)";
  const user = false; // Replace with actual user authentication logic
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  // Hide when app is ready
  useEffect(() => {
    async function prepare() {
      try {
        // Load fonts, make API calls, etc.
        // await Font.loadAsync(MyFont);
        // await loadUserData();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        SplashScreen.hide();
      }
    }
    prepare();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme!}>
      <ThemeProvider value={theme === "dark" ? DarkTheme : DefaultTheme}>
        {/* Chỉ redirect khi ở root, không redirect khi đã ở trong (tabs) hoặc (auth) */}
        {!inAuth && <Redirect href="/(auth)/login" />}
        <Stack screenOptions={{ headerShown: false }}>
          <Slot />
        </Stack>
        <LoadingModal />
        <StatusBar style="auto" />
      </ThemeProvider>
    </TamaguiProvider>
  );
}
