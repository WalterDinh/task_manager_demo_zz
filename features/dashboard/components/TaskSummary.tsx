import {
  H6,
  useWindowDimensions,
  XStack,
  YStack,
} from "tamagui";
import TaskSummaryItem from "./TaskSummaryItem";

const ITEM_HEIGHT = 120; // Default height for each task summary item
const listTaskTypes = [
  { title: "In Progress", color: "$blue5" },
  { title: "In Review", color: "$yellow5" },
  { title: "Pending", color: "$red5" },
  { title: "Completed", color: "$green5" },
];
export default function TaskSummary() {
  const { width } = useWindowDimensions();
  const itemWidth = (width - 64) / 2; // Adjust for padding and spacing
  return (
    <YStack px="$4" gap="$3">
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
            key={index}
            color={taskType.color as import("tamagui").GetThemeValueForKey<"backgroundColor">}
            title={taskType.title}
            width={itemWidth}
            height={ITEM_HEIGHT}
          />
        ))}
      </XStack>
    </YStack>
  );
}
