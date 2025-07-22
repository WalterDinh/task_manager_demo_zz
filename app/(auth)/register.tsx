import { useRouter } from "expo-router";
import { useState } from "react";
import RegisterForm from "@/features/auth/components/register";
import { ToastViewport } from "@tamagui/toast";
import AppToast from "@/components/toast/AppToast";
import { Theme, View } from "tamagui";
import { useThemeStore } from "@/store/themeStore";

export default function RegisterScreen() {
  const { theme } = useThemeStore();

  return (
    <Theme name={theme}>
      <View bg={'$background'} style={{ flex: 1 }}>
        <RegisterForm />
        <ToastViewport backgroundColor={'$primary'} alignItems="center" alignSelf="center" bottom={0} />
        <AppToast />
      </View>
    </Theme>
  );
}
