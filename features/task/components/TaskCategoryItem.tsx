import { Button, Circle, Text, XStack } from "tamagui";

interface TaskCategoryItemProps {
  // Define any props if needed
  title: string;
  number: number;
  color?: "$background" | "$accent5" | "$color04" | undefined;
  active?: boolean;
  onPress?: () => void;
}

export default function TaskCategoryItem({
  active,
  title,
  number,
  color,
}: TaskCategoryItemProps) {
  return (
    <Button
      bg={active ? "$accent5" : "$color04"}
      justify={"center"}
      rounded={"$9"}
      items={"center"}
      mr="$3"
    >
      <XStack items={"center"} justify={"center"}>
        <Text fontSize={"$5"}>{title}</Text>
        <Circle
        //   bg={color ?? "$background"}
          size={30}
          justify="center"
          items="center"
          ml="$2"
        >
          <Text>{number}</Text>
        </Circle>
      </XStack>
    </Button>
  );
}
