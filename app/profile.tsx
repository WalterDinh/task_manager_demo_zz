import { YStack, Text, Button, Theme, View } from "tamagui";
import { CircleChevronLeft, User, UserCircle2 } from "@tamagui/lucide-icons";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "expo-router";
import { useThemeStore } from "@/store/themeStore";
import AppHeader from "@/components/header/AppHeader";
import { resetAllStores } from "@/store/resetAllStores";
import { getAuth, signOut } from "@react-native-firebase/auth";

export default function ProfileScreen() {
  const { user } = useAuthStore();
  const { theme } = useThemeStore();
  const { replace, back } = useRouter();
  const handleLogout = async () => {
    await signOut(getAuth()); // Đăng xuất Firebase
    resetAllStores();
  };

  return (
    <Theme name={theme}>
      <YStack flex={1} bg="$background" gap="$4">
        <AppHeader
          onPressIconLeft={back}
          title="Detail task"
          iconLeft={<CircleChevronLeft size={"$2"} />}
        />
        <YStack items="center" flex={1} bg="$background" gap="$4">
          <View bg="$accent" rounded="$10" justify="center" items="center">
            <UserCircle2 size={80} color="$color" />
          </View>
          <Text fontSize={"$8"} fontWeight="bold" color="$color" mt="$4">
            {user?.displayName || "No Name"}
          </Text>
          <Text fontSize={"$6"} color="$color" mb="$8">
            {user?.email || "No Email"}
          </Text>
        </YStack>
        <Button
          mb="$8"
          bg="$red10"
          color="white"
          self={"center"}
          fontWeight="bold"
          size="$5"
          onPress={handleLogout}
          width={200}
        >
          Logout
        </Button>
      </YStack>
    </Theme>
  );
}
