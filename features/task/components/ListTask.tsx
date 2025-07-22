import React, { useCallback } from "react";
import DraggableFlatList, { RenderItemParams } from "react-native-draggable-flatlist";
import ItemTaskList from "./ItemTaskList";
import { Text, View } from "tamagui";
import { useRouter } from "expo-router";
import { ITask } from "../types/ITask";
import { RefreshControl } from "react-native";
import { ConfirmModal } from "@/components/modal/ConfirmModal";

interface ListTaskProps {
  tasks?: ITask[];
  onRefresh: () => void;
  loading: boolean;
  deleteTask: (id: string, onRefresh: () => void) => void;
  loadMoreTasks: () => void;
  hasMore: boolean;
  onUpdateOrder: (tasks: ITask[]) => void; // Thêm prop này để cập nhật thứ tự
}

export default function ListTask({
  tasks = [],
  onRefresh,
  loading,
  deleteTask,
  loadMoreTasks,
  hasMore,
  onUpdateOrder,
}: ListTaskProps) {
  const { push } = useRouter();
  const [id, setId] = React.useState<string>("");

  const onPressItem = useCallback(
    (id: string) => () => {
      push({ pathname: "/detail_task", params: { id } });
    },
    [push]
  );

  const onOpenModal = useCallback(
    (id: string) => () => {
      setId(id);
    },
    [setId]
  );

  const onDelete = () => {
    setId("");
    deleteTask(id, onRefresh);
  };

  const renderItem = useCallback(
    ({ item, drag, isActive }: RenderItemParams<ITask>) => (
      <View style={{ transform: isActive ? [{ rotate: "10deg" }] : [] }}>
        <ItemTaskList
          priority={item?.priority || undefined}
          dueDate={item?.dueDate}
          onDelete={onOpenModal(item.id)}
          dueTime={item?.dueTime}
          onPress={onPressItem(item.id)}
          title={item?.title}
          onLongPress={drag}
        />
      </View>
    ),
    [onOpenModal, onPressItem]
  );

  return (
    <View flex={1} p="$4">
      <DraggableFlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        onDragEnd={({ data }) => {
          onUpdateOrder(data);
        }}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
        onEndReached={() => {
          if (hasMore && !loading) loadMoreTasks();
        }}
        onEndReachedThreshold={0.6}
        ListEmptyComponent={() => (
          <View flex={1} height={100} justify="center" items="center">
            <Text fontSize={"$6"}>No tasks available</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
      <ConfirmModal
        onConfirm={onDelete}
        open={id !== ""}
        description="Are you sure you want to delete this task?"
        title="Delete task"
        confirmText="Delete"
        cancelText="Cancel"
        confirmTheme="error"
        onOpenChange={() => setId("")}
      />
    </View>
  );
}
