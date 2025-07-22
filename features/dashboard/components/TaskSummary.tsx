import { H6, useWindowDimensions, XStack, YStack } from "tamagui";
import TaskSummaryItem from "./TaskSummaryItem";
import { useTaskCountStore } from "@/store/useTaskCountStore";
import { TaskStatus } from "@/features/task/types/ITask";

const ITEM_HEIGHT = 100; // Default height for each task summary item

export const listTaskTypes: { status: TaskStatus; title: string; color: string }[] = [
    { status: "open", title: "Open", color: "$yellow5" },
  { status: "in-progress", title: "In Progress", color: "$blue5" },
  { status: "pending", title: "Pending", color: "$red5" },
  { status: "completed", title: "Completed", color: "$green5" },
];
export default function TaskSummary() {
  const counts = useTaskCountStore((s) => s.counts);

  const { width } = useWindowDimensions();
  const itemWidth = (width - 64) / 2; // Adjust for padding and spacing
  return (
    <YStack px="$4" mb={16} gap="$3">
      <H6>Task Summary</H6>
      <XStack
        flexWrap="wrap"
        width={"100%"}
        justify="space-between"
        gap={"$3"}
        items="center"
      >
        {listTaskTypes.map((taskType, index) => (
          <TaskSummaryItem
            key={taskType.status}
            totalTasks={counts[taskType.status] || 0}
            color={
              taskType.color as import("tamagui").GetThemeValueForKey<"backgroundColor">
            }
            title={taskType.title}
            width={itemWidth}
            height={ITEM_HEIGHT}
          />
        ))}
      </XStack>
    </YStack>
  );
}
