import { useState } from "react";
import { useRouter } from "expo-router";
import { H2, Input, Theme, XStack, YStack, Button } from "tamagui";
import LoginForm from "@/features/auth/components/LoginForm";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    // login({ name: username });
    router.replace("/(tabs)/home");
  };

  const navigateToRegisterPage = () => {
    router.push("/(auth)/register");
  };

  return (
    <YStack
      fullscreen
      bg="$red2"
      p={"$4"}
      items={"center"}
      justify={"center"}
      gap="$10"
    >
      <H2 color={"$red10"}>Task Manager</H2>
      <LoginForm
        navigateToRegisterPage={navigateToRegisterPage}
        handleLogin={handleLogin}
      />
    </YStack>
  );
}
