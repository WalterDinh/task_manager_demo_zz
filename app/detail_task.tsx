import { StyleSheet } from "react-native";

import { CircleChevronLeft } from "@tamagui/lucide-icons";

import { Button, ScrollView, Theme, View, YStack } from "tamagui";
import { useState } from "react";

import { useThemeStore } from "@/store/themeStore";

import AppHeader from "@/components/header/AppHeader";
import { useLocalSearchParams, useRouter } from "expo-router";
import TaskForm from "@/features/task/components/TaskForm";
import AppToast from "@/components/toast/AppToast";
import { ToastViewport } from "@tamagui/toast";
import { useHandleTaskForm } from "@/features/task/hooks/useHandleTaskForm";
import { useHandleTaskDetail } from "@/features/task/hooks/useHandleTaskDetail";
import { ConfirmModal } from "@/components/modal/ConfirmModal";
export default function DetailTaskScreen() {
  const { theme, toggleTheme } = useThemeStore();
  const { id } = useLocalSearchParams<{ id: string }>();

  const { back } = useRouter();
  const { control, handleSubmit, onSubmitUpdate, errors, onDelete, reset } =
    useHandleTaskForm();
  useHandleTaskDetail(reset, id);
  const [open, setOpen] = useState(false);

  return (
    <Theme name={theme}>
      <View bg={"$background"} style={styles.container}>
        <AppHeader
          onPressIconLeft={back}
          title="Detail task"
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
              mb={"$2"}
              mt={"$4"}
              self={"stretch"}
              bg={"$primary"}
              height={54}
              color={"white"}
              fontSize={"$6"}
              fontWeight={"bold"}
              onPress={handleSubmit(onSubmitUpdate)}
            >
              Update task
            </Button>
            <ConfirmModal
              onConfirm={() => onDelete(id)}
              open={open}
              description="Are you sure you want to delete this task?"
              title="Delete task"
              confirmText="Delete"
              cancelText="Cancel"
              onOpenChange={setOpen}
            >
              <Button
                mb={"$4"}
                height={54}
                bg={"$red7"}
                color={"white"}
                fontSize={"$6"}
                fontWeight={"bold"}
                self={"stretch"}
              >
                Delete task
              </Button>
            </ConfirmModal>
          </ScrollView>
        </YStack>
        <ToastViewport alignItems="center" alignSelf="center" bottom={40} />
        <AppToast />
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
