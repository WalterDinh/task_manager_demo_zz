import {
  XStack,
  YStack,
  Button,
  Text,
  View,
  Switch,
  ScrollView,
} from "tamagui";
import { InputWithLabel } from "@/components/input/InputWithLabel";
import { Flag } from "@tamagui/lucide-icons";
import { PrioritySelector, PriorityValue } from "./PrioritySelector";
import { useState } from "react";

export default function TaskForm({ handleLogin, navigateToRegisterPage }: any) {
  const [priority, setPriority] = useState<PriorityValue>("medium");

  return (
    <YStack flex={1} gap="$1">
      <InputWithLabel labelText="Task name" />
      <InputWithLabel labelText="Task description" />
      <XStack justify="space-between" items="center">
        <View flex={1} mr="$2">
          <InputWithLabel labelText="Task description" />
        </View>
        <View flex={1}>
          <InputWithLabel labelText="Task description" />
        </View>
      </XStack>

      <PrioritySelector value={priority} onChange={setPriority} />
      <XStack p={"$2"} justify={"space-between"} items="center" mt="$4">
        <Text fontSize={"$6"}>Get daily reminders for this task</Text>
        <Switch size="$4">
          <Switch.Thumb animation="bouncy" />
        </Switch>
      </XStack>
    </YStack>
  );
}
