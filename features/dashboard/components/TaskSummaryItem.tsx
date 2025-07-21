import { Button, H5, H6, Label, Text, XStack, YStack } from "tamagui";
import { ViewStyle } from "react-native";
import type { GetThemeValueForKey } from "tamagui";

type TaskSummaryItemProps = {
  style?: ViewStyle;
  width?: number;
  height?: number;
  onPress?: () => void;
  title?: string;
  currentTasks?: number;
  totalTasks?: number;
  color?: GetThemeValueForKey<"backgroundColor"> | null | undefined;
};

export default function TaskSummaryItem({
  style,
  color,
  currentTasks = 0,
  height,
  onPress,
  title,
  totalTasks = 0,
  width,
}: TaskSummaryItemProps) {
  return (
    <Button
      p={"$3"}
      height={height}
      justify={"flex-start"}
      items="flex-start"
      shadowOffset={{ width: 4, height: 4 }}
      shadowColor="$shadowColor"
      shadowRadius={4}
      width={width}
      bg={color}
      onPress={onPress}
      style={style}
    >
      <YStack justify="flex-start" items="flex-start">
        <H6>{totalTasks}</H6>
        <Label fontSize={"$5"}>{title}</Label>
      </YStack>
    </Button>
  );
}
