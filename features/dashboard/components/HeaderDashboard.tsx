import { SafeAreaView } from "react-native-safe-area-context";
import { Button, H2, H3, SelectIcon, Text, View, XStack } from "tamagui";
import { Bell } from "@tamagui/lucide-icons";

export default function HeaderDashboard() {
  return (
    <SafeAreaView edges={["top"]}>
      {/* Your header content goes here */}
      <XStack justify={"space-between"} p={"$4"} items={"center"}>
        <H3 fontWeight={"bold"}>Dashboard</H3>
        <Button unstyled icon={<Bell size="$2" />} />
      </XStack>
    </SafeAreaView>
  );
}
