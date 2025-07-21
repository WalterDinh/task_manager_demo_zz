import { useState } from "react";
import { useRouter } from "expo-router";
import {
  H2,
  Input,
  Theme,
  XStack,
  YStack,
  Button,
  Text,
  RadioGroup,
  View,
} from "tamagui";
import { InputWithLabel } from "@/components/input/InputWithLabel";
import { useWindowDimensions } from "react-native";

export default function RegisterStep3({ handleLogin, handleChange }: any) {
  const { width } = useWindowDimensions();
  return (
    <View width={width - 64}  p="$4" gap="$1">
      <YStack width={"100%"} p={"$4"} gap="$1">
        <InputWithLabel
          labelText="Mật khẩu"
          onChangeText={(v: string) => handleChange("password", v)}
        />
        <YStack style={{ marginTop: 16 }}>
          <InputWithLabel
            labelText="Nhập lại mật khẩu"
            onChangeText={(v: string) => handleChange("prepassword", v)}
            focusOnMount
            secureTextEntry
          />
        </YStack>
      </YStack>
    </View>
  );
}
