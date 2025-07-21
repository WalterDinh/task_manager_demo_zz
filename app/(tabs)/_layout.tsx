import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { LayoutDashboard, ListTodo, CirclePlus } from "@tamagui/lucide-icons";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { HapticTab } from "@/components/tabbar/HapticTab";
import BlurTabBarBackground from "@/components/tabbar/TabBarBackground";
import { SpecialTabButton } from "@/components/tabbar/SpecialTabButton";
import CustomTabBar from "@/components/tabbar/CustomTabbar";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarButton: HapticTab,
        tabBarBackground: BlurTabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
        animation: "shift",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Dashboard",
        }}
      />
      <Tabs.Screen name="action" options={{ href: null }} /> {/* Nút giữa */}
      <Tabs.Screen
        name="list_task"
        options={{
          tabBarLabel: "Tasks",
        }}
      />
    </Tabs>
  );
}
