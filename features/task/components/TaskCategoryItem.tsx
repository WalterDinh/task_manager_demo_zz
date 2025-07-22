import { Button, Circle, Text, XStack } from "tamagui";

interface TaskCategoryItemProps {
  // Define any props if needed
  title: string;
  number: number;
  color?: any;
  active?: boolean;
  onPress?: () => void;
}

export default function TaskCategoryItem({
  active,
  title,
  number,
  color,
  onPress,
}: TaskCategoryItemProps) {
  
  return (
    <Button
      bg={active ? '$primary' : "#f0f0f0"} // Use a default color if not active
      justify={"center"}
      rounded={"$9"}
      items={"center"}
      mr="$3"
      onPress={onPress}
    >
      <XStack items={"center"} justify={"center"}>
        <Text fontWeight={'600'} color={'black'} fontSize={"$5"}>{title}</Text>
        <Circle
          bg={color} // Use template literal to set the background color
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
