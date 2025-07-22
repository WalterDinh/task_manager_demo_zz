import AppToast from "@/components/toast/AppToast";
import ListTask from "@/features/task/components/ListTask";
import TaskCategory from "@/features/task/components/TaskCategory";
import TaskListHeader from "@/features/task/components/TaskListHeader";
import { useHandleTaskList } from "@/features/task/hooks/useHandleTaskList";
import { StyleSheet, Image, Platform } from "react-native";
import { View, YStack, Spinner, Theme } from "tamagui";
import { ToastViewport } from "@tamagui/toast";
import { useThemeStore } from "@/store/themeStore";

export default function ListTaskScreen() {
  const {
    tasks,
    loading,
    status,
    setStatus,
    deleteTask,
    fetchTasks,
    hasMore,
    loadMoreTasks,
    handleUpdateOrder,
  } = useHandleTaskList();
  const { theme } = useThemeStore();

  return (
    <Theme name={theme}>
      <YStack flex={1} bg="$background">
        <TaskListHeader />
        <YStack flex={1}>
          <TaskCategory status={status} setStatus={setStatus} />
          {tasks === undefined && loading ? (
            <View flex={1} justify="center" items="center">
              <Spinner size="large" color="$accent5" />
            </View>
          ) : (
            <ListTask
              onUpdateOrder={handleUpdateOrder}
              hasMore={hasMore}
              loadMoreTasks={loadMoreTasks}
              deleteTask={deleteTask}
              tasks={tasks}
              onRefresh={fetchTasks}
              loading={loading}
            />
          )}
        </YStack>
        <ToastViewport alignItems="center" alignSelf="center" bottom={40} />
        <AppToast />
      </YStack>
    </Theme>
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
