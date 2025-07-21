import { XStack, Button, GetThemeValueForKey, YStack, Label } from "tamagui";
import { Flag } from "@tamagui/lucide-icons";

const PRIORITIES = [
  { label: "High", value: "high", color: "$red10" },
  { label: "Medium", value: "medium", color: "$yellow10" },
  { label: "Low", value: "low", color: "$blue10" },
];

export type PriorityValue = "high" | "medium" | "low";

interface PrioritySelectorProps {
  value: PriorityValue;
  onChange: (value: PriorityValue) => void;
}

export function PrioritySelector({ value, onChange }: PrioritySelectorProps) {
  return (
    <YStack>
      <Label>Priority</Label>
      <XStack p="$2" justify="space-between" items="center">
        {PRIORITIES.map((p) => {
          const isActive = value === p.value;
          const color = p.color as GetThemeValueForKey<"color">;
          return (
            <Button
              key={p.value}
              borderColor={color}
              bg={isActive ? color : "transparent"}
              color={isActive ? "white" : color}
              variant={isActive ? undefined : "outlined"}
              onPress={() => onChange(p.value as PriorityValue)}
            >
              <Flag color={isActive ? "white" : color} size="$1" />
              <Button.Text>{p.label}</Button.Text>
            </Button>
          );
        })}
      </XStack>
    </YStack>
  );
}
