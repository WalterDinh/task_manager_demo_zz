import { Button, Card, Text, XStack, YStack, Popover, Theme } from "tamagui";
import {
  MoreHorizontal,
  Calendar,
  Clock,
  Delete,
  Trash,
  RemoveFormatting,
} from "@tamagui/lucide-icons";
import { SimpleChip } from "@/components/chip/SimpleChip";
import { useThemeStore } from "@/store/themeStore";

interface ItemTaskListProps {
  // Define any props if needed
  title: string;
  priority: "low" | "medium" | "high" | undefined;
  number: number;
  color?: "$background" | "$accent5" | "$color04" | undefined;
  active?: boolean;
  dueDate?: string; // Optional due date
  dueTime?: number; // Optional due time
  onPress?: () => void;
  onDelete?: () => void; // Optional delete handler
}

export default function ItemTaskList({
  active,
  title,
  number,
  color,
  dueDate,
  dueTime,
  priority,
  onPress,
  onDelete,
  onLongPress,
}: ItemTaskListProps & { onLongPress?: () => void }) {
  const { theme } = useThemeStore();

  return (
    <Theme name={theme}>
      <Card
        bg={theme === "dark" ? "#687076" : '#eaeff4'}
        rounded={"$3"}
        onPress={onPress}
        onLongPress={onLongPress}
        p="$3"
        shadowColor={"$shadowColor"}
        shadowOffset={{ width: 0, height: 2 }}
        shadowRadius={1}
      >
        <YStack flex={1} gap={"$3"}>
          <XStack items={"center"} justify={"space-between"}>
            <Text flex={1} pr={'$2'} fontSize={"$6"} numberOfLines={2}>{title}</Text>
            <Popover>
              <Popover.Trigger asChild>
                <Button unstyled icon={<MoreHorizontal size={"$1"} />} />
              </Popover.Trigger>
              <Popover.Content
                p="$2"
                enterStyle={{ scale: 0.95, y: -10, opacity: 0 }}
                exitStyle={{ scale: 0.95, y: -10, opacity: 0 }}
                elevation={4}
                ml={"$2"}
              >
                <Popover.Arrow />
                <Button
                  size="$3"
                  iconAfter={<Trash size={"$1"} />}
                  onPress={onDelete}
                >
                  Delete
                </Button>
              </Popover.Content>
            </Popover>
          </XStack>
          <XStack items={"center"} gap={"$2"}>
            <SimpleChip
              color={
                priority == "high"
                  ? "$red9"
                  : priority == "medium"
                  ? "$yellow9"
                  : "$blue9"
              }
              size={"$3"}
              
              label={priority?.toUpperCase()}
            />
          </XStack>
          <XStack items={"center"} justify={"flex-start"}>
            {dueDate && (
              <XStack mr={"$4"} items={"center"} justify={"space-between"}>
                <Button
                  disabled
                  mr={"$2"}
                  unstyled
                  icon={<Calendar size={"$1"} />}
                />
                <Text fontSize={"$5"}>{dueDate}</Text>
              </XStack>
            )}

            {dueTime && (
              <XStack items={"center"} justify={"space-between"}>
                <Button
                  disabled
                  mr={"$2"}
                  unstyled
                  icon={<Clock size={"$1"} />}
                />
                <Text fontSize={"$5"}>{dueTime} hour</Text>
              </XStack>
            )}
          </XStack>
        </YStack>
      </Card>
    </Theme>
  );
}
