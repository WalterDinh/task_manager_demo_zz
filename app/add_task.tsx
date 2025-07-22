import { StyleSheet } from "react-native";

import { CircleChevronLeft } from "@tamagui/lucide-icons";

import {
  Button,
  ScrollView,
  Theme,
  useWindowDimensions,
  View,
  YStack,
} from "tamagui";
import { useThemeStore } from "@/store/themeStore";

import AppHeader from "@/components/header/AppHeader";
import { useRouter } from "expo-router";
import TaskForm from "@/features/task/components/TaskForm";
import { useHandleTaskForm } from "@/features/task/hooks/useHandleTaskForm";
import AppToast from "@/components/toast/AppToast";
import { ToastViewport } from "@tamagui/toast";

export default function AddTaskScreen() {
  const { theme, toggleTheme } = useThemeStore();
  const width = useWindowDimensions().width;
  const { back } = useRouter();
  const { control, handleSubmit, onSubmit, errors, setValue, watch } =
    useHandleTaskForm();

  return (
    <Theme name={theme}>
      <View bg={"$background"} style={styles.container}>
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
            <TaskForm control={control} errors={errors} />
            <Button
              my={"$4"}
              height={54}
              color={"white"}
              fontSize={"$6"}
              fontWeight={"bold"}
              bg={"$primary"}
              self={"stretch"}
              onPress={handleSubmit(onSubmit)}
            >
              Add new task
            </Button>
          </ScrollView>

          <ToastViewport alignItems="center" alignSelf="center" bottom={40} />
          <AppToast />
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
