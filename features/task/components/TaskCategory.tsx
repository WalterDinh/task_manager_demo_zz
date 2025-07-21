import { SafeAreaView } from "react-native-safe-area-context";
import {
  Button,
  H2,
  H3,
  ScrollView,
  SelectIcon,
  Text,
  View,
  XStack,
} from "tamagui";
import { Bell } from "@tamagui/lucide-icons";
import TaskCategoryItem from "./TaskCategoryItem";

const listCategories = [
  {
    id: "1",
    title: "Work",
    number: 5,
    active: true,
    color: "$blue5",
  },
  {
    id: "2",
    title: "Personal",
    number: 3,
    active: false,
    color: "$blue5",
  },
  {
    id: "3",
    title: "Shopping",
    number: 2,
    active: false,
    color: "$blue5",
  },
];
export default function TaskCategory() {
  return (
    <View width={"100%"} bg={"$background"}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        px={"$4"}
        width={"100%"}
      >
        {listCategories.map((category) => (
          <TaskCategoryItem
            key={category.id}
            title={category.title}
            number={category.number}
            active={category.active}
            color={category.color}
            onPress={() => console.log(`Selected category: ${category.title}`)}
          />
        ))}
      </ScrollView>
    </View>
  );
}
