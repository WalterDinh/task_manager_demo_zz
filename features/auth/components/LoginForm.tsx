import { useState } from "react";
import { useRouter } from "expo-router";
import { H2, Input, Theme, XStack, YStack, Button, Text } from "tamagui";
import { InputWithLabel } from "@/components/input/InputWithLabel";
import useHandleLogin from "../hooks/useHandleLogin";
// import {
//   KeyboardAwareScrollView,
//   KeyboardToolbar,
// } from "react-native-keyboard-controller";

export default function LoginForm({ navigateToRegisterPage }: any) {
  const { email, setEmail, handleLogin, error, password, setPassword } =
    useHandleLogin();
  return (
    <YStack flex={1} p={"$4"} justify={"center"} items={"center"} gap="$1">
      {/* <KeyboardAwareScrollView style={{ flex: 1 }}> */}
      <YStack justify={"center"} flex={1}>
        <InputWithLabel onChangeText={setEmail} />
        <InputWithLabel errorMessage="re" onChangeText={setPassword} />
        <Button self={"stretch"} onPress={handleLogin}>
          Login
        </Button>
      </YStack>
      {/* </KeyboardAwareScrollView> */}

      <XStack justify="center" gap="$2">
        <Text>Don't have account?</Text>
        <Button
          items="center"
          self="flex-start"
          unstyled
          theme="accent"
          onPress={navigateToRegisterPage}
        >
          <Text color={"$black10"} fontSize={"$4"}>
            Sign up
          </Text>
        </Button>
      </XStack>
    </YStack>
  );
}
