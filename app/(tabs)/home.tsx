import { Image, StyleSheet, Platform } from "react-native";

import { Activity, Airplay } from "@tamagui/lucide-icons";

import {
  Button,
  ScrollView,
  Theme,
  useTheme,
  useWindowDimensions,
  View,
  XGroup,
  XStack,
  YStack,
} from "tamagui";
import { useThemeStore } from "@/store/themeStore";
import HeaderDashboard from "@/features/dashboard/components/HeaderDashboard";
import TaskSummary from "@/features/dashboard/components/TaskSummary";
import TaskStatisticsChart from "@/features/dashboard/components/TaskStatisticsChart";
import { useTaskCountStore } from "@/store/useTaskCountStore";
import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";

export default function HomeScreen() {
  const width = useWindowDimensions().width;
  const listenTaskCounts = useTaskCountStore((s) => s.listenTaskCounts);
  const user = useAuthStore((s) => s.user);

  const stopListening = useTaskCountStore((s) => s.stopListening);
  const { theme } = useThemeStore();
 

    useEffect(() => {
    if (user) {
      listenTaskCounts();
      return () => stopListening();
    }
  }, [user]);
  return (
    <Theme name={theme}>
      <View bg={"$background"} style={styles.container}>
        <HeaderDashboard />
        <YStack flex={1} paddingBlock={"$3"} gap="$3">
          <ScrollView
            flex={1}
            contentContainerStyle={{ pb: 100, grow: 1 }}
            showsVerticalScrollIndicator={false}
          >
            <TaskSummary />
            <TaskStatisticsChart width={width} />
          </ScrollView>
        </YStack>
      </View>
    </Theme>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  container: {
    flex: 1,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
