import {
  ScrollView,
  View,
} from "tamagui";
import TaskCategoryItem from "./TaskCategoryItem";
import { TaskStatus } from "../types/ITask";
import { useTaskCountStore } from "@/store/useTaskCountStore";
import { Dispatch, SetStateAction } from "react";

const listTaskTypes: {
  status: TaskStatus | "all";
  title: string;
  color: string;
}[] = [
  {
    status: "all",
    title: "All",
    color: "#acacac", // Default color for "All" category
  },
  { status: "open", title: "Open", color: "$yellow5" },
  { status: "in-progress", title: "In Progress", color: "$blue5" },
  { status: "pending", title: "Pending", color: "$red5" },
  { status: "completed", title: "Completed", color: "$green5" },
];
export default function TaskCategory({
  status,
  setStatus,
}: {
  status: string;
  setStatus: Dispatch<SetStateAction<TaskStatus>>;
}) {
  const counts = useTaskCountStore((s) => s.counts);
  const total = useTaskCountStore((s) => s.total);

  return (
    <View width={"100%"} bg={"$background"}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        px={"$4"}
        width={"100%"}
      >
        {listTaskTypes.map((category) => (
          <TaskCategoryItem
            key={category.status}
            title={category.title}
            number={
              category.status == "all" ? total : counts[category.status] || 0
            }
            active={category.status === status}
            color={category.color}
            onPress={() => setStatus(category.status)}
          />
        ))}
      </ScrollView>
    </View>
  );
}
