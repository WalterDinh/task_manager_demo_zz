import { Button, View, XStack, YStack } from "tamagui";
import { InputWithLabel } from "@/components/input/InputWithLabel";
import { useWindowDimensions } from "react-native";
import { Controller, useForm } from "react-hook-form";

interface RegisterStep3Props {
  onValid: () => void;
  handleChange: (field: string, value: string) => void;
  handlePreviousStep: () => void;
}
export default function RegisterStep3({
  onValid,
  handleChange,
  handlePreviousStep,
}: RegisterStep3Props) {
  const { width } = useWindowDimensions();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { password: "", confirmPassword: "" },
    mode: "onTouched",
  });

  const onSubmit = (data: any) => {
    handleChange("password", data.password);
    onValid();
  };
  return (
    <View flex={1} width={width - 32} p="$4" gap="$1">
      <View flex={1}>
        <YStack>
          <Controller
            control={control}
            name="password"
            rules={{ required: "Password is require", min: 8 }}
            render={({ field: { onChange, value, onBlur } }) => (
              <InputWithLabel
                labelText="Password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry
                errorMessage={errors.password ? "Invalid password" : ""}
              />
            )}
          />
          <Controller
            control={control}
            name="confirmPassword"
            rules={{
              required: "Confirm password is required",
              min: 8,
              validate: (value, context) =>
                value === context.password || "Passwords do not match",
            }}
            render={({ field: { onChange, value, onBlur } }) => (
              <InputWithLabel
                labelText="Confirm password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry
                errorMessage={errors.confirmPassword ? "Invalid password" : ""}
              />
            )}
          />
        </YStack>
      </View>

      <XStack self={"stretch"} justify={"space-between"}>
        <Button
          borderColor={"$primary"}
          onPress={handlePreviousStep}
          variant="outlined"
        >
          <Button.Text color={"$color"}>Previous</Button.Text>
        </Button>
        <Button bg={"$primary"} onPress={handleSubmit(onSubmit)}>
          <Button.Text color={"white"}>Sign up</Button.Text>
        </Button>
      </XStack>
    </View>
  );
}
