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
  useWindowDimensions,
} from "tamagui";
import { InputWithLabel } from "@/components/input/InputWithLabel";

export default function RegisterStep1({ handleLogin, handleChange }: any) {
  const [username, setUsername] = useState("");
  const { width } = useWindowDimensions();
  return (
    <View width={width - 64} p="$4" gap="$1">
      <YStack flex={1} gap="$1">
        <InputWithLabel
          labelText="Tên"
          onChangeText={(v: string) => handleChange("name", v)}
        />
        <YStack style={{ marginTop: 16 }}>
          <InputWithLabel
            labelText="Ngày sinh (dd/mm/yyyy)"
            onChangeText={(v: string) => handleChange("dob", v)}
            focusOnMount
          />
        </YStack>
      </YStack>
    </View>
  );
}
