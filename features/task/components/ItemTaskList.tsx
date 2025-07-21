import { Button, Card, Text, XStack, YStack } from "tamagui";
import { MoreHorizontal, Calendar } from "@tamagui/lucide-icons";
import { SimpleChip } from "@/components/chip/SimpleChip";

interface ItemTaskListProps {
  // Define any props if needed
  title: string;
  number: number;
  color?: "$background" | "$accent5" | "$color04" | undefined;
  active?: boolean;
  onPress?: () => void;
}

export default function ItemTaskList({
  active,
  title,
  number,
  color,
  onPress,
}: ItemTaskListProps) {
  return (
    <Card
      bg={active ? "$background08" : "$color04"}
      rounded={"$3"}
      gap={"$2"}
      onPress={onPress}
      p="$3"
      shadowColor={"$shadowColor"}
      shadowOffset={{ width: 4, height: 4 }}
      shadowRadius={4}
    >
      <YStack flex={1} gap={"$2"}>
        <XStack items={"center"} justify={"space-between"}>
          <Text fontSize={"$6"}>{title}</Text>
          <Button unstyled icon={<MoreHorizontal size={"$1"} />} />
        </XStack>
        <XStack items={"center"} gap={"$2"}>
          <SimpleChip color="red" size={"$3"} label="Nmae" />
          <SimpleChip color="blue" size={"$3"} label="Nmae" />
          <SimpleChip color="red" size={"$3"} label="Nmae" />
        </XStack>
        <XStack items={"center"} justify={"space-between"}>
          <XStack items={"center"} justify={"space-between"}>
            <Button
              disabled
              mr={"$2"}
              unstyled
              icon={<Calendar size={"$1"} />}
            />
            <Text fontSize={"$5"}>{"20/09/2025"}</Text>
          </XStack>
        </XStack>
      </YStack>
    </Card>
  );
}
