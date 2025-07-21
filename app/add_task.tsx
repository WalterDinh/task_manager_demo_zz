import { StyleSheet } from "react-native";

import { CircleChevronLeft } from "@tamagui/lucide-icons";

import { Button, ScrollView, useWindowDimensions, View, YStack } from "tamagui";
import { useThemeStore } from "@/store/themeStore";

import AppHeader from "@/components/header/AppHeader";
import { useRouter } from "expo-router";
import TaskForm from "@/features/task/components/TaskForm";

export default function AddTaskScreen() {
  const { theme, toggleTheme } = useThemeStore();
  const width = useWindowDimensions().width;
  const { back } = useRouter();

  return (
    <View style={styles.container}>
      <AppHeader
        onPressIconLeft={back}
        title="Add new task"
        iconLeft={<CircleChevronLeft size={"$2"} />}
      />
      <YStack flex={1} p={"$4"} gap="$1">
        <ScrollView
          contentContainerStyle={{ grow: 1 }}
          flex={1}
          showsVerticalScrollIndicator={false}
        >
          <TaskForm />
        </ScrollView>
        <Button mb={"$4"} self={"stretch"} onPress={() => {}}>
          Add new task
        </Button>
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
