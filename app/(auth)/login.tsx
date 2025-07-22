import { useRouter } from "expo-router";
import { H2, Theme, YStack, Text, XStack } from "tamagui";
import LoginForm from "@/features/auth/components/LoginForm";
import { SafeAreaView } from "react-native-safe-area-context";
import AppToast from "@/components/toast/AppToast";
import { ToastViewport } from "@tamagui/toast";
import { useThemeStore } from "@/store/themeStore";
import ButtonTheme from "@/components/theme/ButtonTheme";
export default function LoginScreen() {
  const router = useRouter();
  const { theme } = useThemeStore();

  const handleLogin = () => {
    router.replace("/(tabs)/home");
  };

  const navigateToRegisterPage = () => {
    router.push("/(auth)/register");
  };
  return (
    <Theme name={theme}>
      <YStack
        fullscreen
        bg="$background"
        p={"$4"}
        items={"center"}
        justify={"center"}
        gap="$10"
      >
        <SafeAreaView>
          <XStack justify={"space-between"} items={"center"}>
            <H2 fontWeight={"bold"} color={"$primary"}>
              Welcome!
            </H2>
            <ButtonTheme />
          </XStack>
          <Text mt={8} mb={"$8"} color={"$primary"}>
            Save time and boost your productivity using our powerful feature
          </Text>

          <LoginForm
            navigateToRegisterPage={navigateToRegisterPage}
            handleLogin={handleLogin}
          />
          <ToastViewport  alignItems="center" alignSelf="center" bottom={0} />
        </SafeAreaView>
      </YStack>
    </Theme>
  );
}
