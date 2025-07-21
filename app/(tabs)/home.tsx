import { Image, StyleSheet, Platform } from "react-native";

import { Activity, Airplay } from "@tamagui/lucide-icons";

import {
  Button,
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

export default function HomeScreen() {
  const { theme, toggleTheme } = useThemeStore();
  const width = useWindowDimensions().width;
  return (
    <View style={styles.container}>
      <HeaderDashboard />
      <YStack paddingBlock={"$3"} gap="$3">
        <TaskSummary />
        <TaskStatisticsChart width={width} />
      </YStack>
    </View>
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
    backgroundColor: "#fff",
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
