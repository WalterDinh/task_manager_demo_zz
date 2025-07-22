import type { SizeTokens } from "tamagui";
import { useState } from "react";
import { View, YStack } from "tamagui";
import { Input } from "./InputPart";
import { TextInput, Platform, Pressable } from "react-native";
import { Calendar } from "@tamagui/lucide-icons";

import DateTimePickerModal from "react-native-modal-datetime-picker";

interface InputDatePickerProps extends React.ComponentProps<typeof TextInput> {
  size?: SizeTokens;
  focusOnMount?: boolean;
  labelText?: string;
  errorMessage?: string;
  onChangeText?: (text: string) => void;
  value?: string;
}

export function InputDatePicker({
  labelText = "Label",
  size,
  focusOnMount = false,
  errorMessage,
  onChangeText,
  value,
  ...rest
}: InputDatePickerProps) {
  const [show, setShow] = useState(false);

  // Convert value to Date if possible, else use today
  const getDateValue = () => {
    if (value) {
      const d = new Date(value);
      return isNaN(d.getTime()) ? new Date() : d;
    }
    return new Date();
  };

  const showDatePicker = () => {
    setShow(true);
  };

  const hideDatePicker = () => {
    setShow(false);
  };

  const handleConfirm = (date?: Date) => {
    const dateStr = date?.toISOString().split("T")[0];
    onChangeText?.(dateStr ?? "");
    hideDatePicker();
  };

  return (
    <YStack justify="center" items="center">
      <Input size={size} style={{ minWidth: "100%" }}>
        <Input.Label htmlFor="input">{labelText}</Input.Label>
        <Input.Box>
          <Pressable
            style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
            onPress={() => {
              setShow(true);
            }}
          >
            <Input.Area
              pointerEvents="none"
              editable={false}
              placeholder="Select date"
              id="input"
              value={value}
              autoFocus={focusOnMount}
              {...rest}
            />
            <Input.Icon>
              <Calendar size={20} color="$color" />
            </Input.Icon>
          </Pressable>
        </Input.Box>
        {errorMessage ? (
          <Input.Label lineHeight={"$6"} color={"$red10"}>
            {errorMessage}
          </Input.Label>
        ) : (
          <View height={14} />
        )}
      </Input>

      <DateTimePickerModal
        isVisible={show}
        mode="date"
        date={getDateValue()}
        style={{ width: "100%" }}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </YStack>
  );
}
