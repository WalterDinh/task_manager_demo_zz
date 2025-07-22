import { SafeAreaView } from "react-native-safe-area-context";
import { Button, H3, XStack } from "tamagui";
import { UserCircle2 } from "@tamagui/lucide-icons";
import ButtonTheme from "@/components/theme/ButtonTheme";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "expo-router";

export default function HeaderDashboard() {
  const user = useAuthStore((se) => se.user);
  const { push } = useRouter();

  return (
    <SafeAreaView edges={["top"]}>
      {/* Your header content goes here */}
      <XStack justify={"space-between"} p={"$4"} items={"center"}>
        <H3 flex={1} numberOfLines={2} fontWeight={"bold"}>
          Xin chào! {user?.displayName || user?.username || "No Name"}
        </H3>
        <XStack gap={"$2"} items={"center"}>
          <ButtonTheme />
          <Button
            size="$3"
            circular
            onPress={() => {
             push("/profile");
            }}
            aria-label="Toggle theme"
            icon={<UserCircle2 size={'$3'} color={"$color"} />}
          />
        </XStack>
      </XStack>
    </SafeAreaView>
  );
}
