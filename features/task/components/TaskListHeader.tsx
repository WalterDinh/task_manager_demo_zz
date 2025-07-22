import { SafeAreaView } from "react-native-safe-area-context";
import { Button, H2, H3, SelectIcon, Text, View, XStack } from "tamagui";
import ButtonTheme from "@/components/theme/ButtonTheme";

export default function TaskListHeader() {
  return (
    <SafeAreaView edges={["top"]}>
      {/* Your header content goes here */}
      <XStack justify={"space-between"} p={"$4"} items={"center"}>
        <H3 fontWeight={"bold"}>Task List</H3>
        <ButtonTheme />
      </XStack>
    </SafeAreaView>
  );
}
