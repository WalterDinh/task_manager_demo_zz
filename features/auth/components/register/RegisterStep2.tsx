import { useState } from "react";
import { useWindowDimensions } from "react-native";
import {
  H2,
  Input,
  Theme,
  XStack,
  YStack,
  Button,
  Text,
  RadioGroup,
  Label,
  View,
} from "tamagui";
const JOBS = ["Học sinh", "Sinh viên", "Designer", "Developer", "Khác"];

export default function RegisterStep2({ job, handleChange }: any) {
  const { width } = useWindowDimensions();
  return (
    <View width={width - 64} p="$4" gap="$1">
      <YStack flex={1} width={"100%"} p={"$4"} gap="$1">
        <Text style={{ fontWeight: "bold", marginBottom: 8 }}>Nghề nghiệp</Text>
        <RadioGroup
          value={job}
          onValueChange={(v: string) => handleChange("job", v)}
        >
          {JOBS.map((job) => (
            <XStack key={job} style={{ alignItems: "center", marginBottom: 8 }}>
              <RadioGroup.Item value={job} id={job} />
              <Label htmlFor={job} style={{ marginLeft: 8 }}>
                {job}
              </Label>
            </XStack>
          ))}
        </RadioGroup>
      </YStack>
    </View>
  );
}
