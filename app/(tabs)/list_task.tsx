import ListTask from "@/features/task/components/ListTask";
import TaskCategory from "@/features/task/components/TaskCategory";
import TaskListHeader from "@/features/task/components/TaskListHeader";
import { StyleSheet, Image, Platform } from "react-native";
import { View, YStack } from "tamagui";

export default function ListTaskScreen() {
  return (
    <YStack flex={1} bg="$background">
      <TaskListHeader />
      <YStack flex={1}>
        <TaskCategory />
        <ListTask />
      </YStack>
    </YStack>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
