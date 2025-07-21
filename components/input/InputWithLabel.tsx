import type { SizeTokens } from "tamagui";
import { View, YStack } from "tamagui";
import { Input } from "./InputPart";
import { TextInput } from "react-native";

interface InputWithLabelProps extends React.ComponentProps<typeof TextInput> {
  size?: SizeTokens;
  focusOnMount?: boolean;
  labelText?: string;
  errorMessage?: string;
  onChangeText?: (text: string) => void;
}

export function InputWithLabel({
  labelText = "Label",
  size,
  focusOnMount = false,
  errorMessage,
  onChangeText,
  ...rest
}: InputWithLabelProps) {
  return (
    <YStack justify="center" items="center">
      <Input size={size} style={{ minWidth: "100%" }}>
        <Input.Label htmlFor="input">{labelText}</Input.Label>
        <Input.Box>
          <Input.Area
            id="input"
            autoFocus={focusOnMount}
            onChangeText={onChangeText}
            {...rest}
          />
        </Input.Box>

        {errorMessage ? (
          <Input.Label lineHeight={"$6"} color={"$red10"}>
            {errorMessage}
          </Input.Label>
        ) : (
          <View height={14} />
        )}
      </Input>
    </YStack>
  );
}
