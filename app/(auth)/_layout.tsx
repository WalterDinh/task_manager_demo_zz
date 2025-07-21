import { Stack, Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function AuthLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack initialRouteName="login">
      <Stack.Screen options={{ headerShown: false }} name="login" />
      <Stack.Screen name="register" />
    </Stack>
  );
}
