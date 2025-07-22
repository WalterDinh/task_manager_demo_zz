import { Button, View, XStack, useWindowDimensions } from "tamagui";
import { InputWithLabel } from "@/components/input/InputWithLabel";
import { Controller, useForm } from "react-hook-form";

interface RegisterStep1Props {
  handleChange: (field: string, value: string) => void;
  onValid: () => void;
}

export default function RegisterStep1({
  handleChange,
  onValid,
}: RegisterStep1Props) {
  const { width } = useWindowDimensions();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", username: "" },
    mode: "onTouched",
  });

  const onSubmit = (data: any) => {
    handleChange("email", data.email);
    handleChange("username", data.username);
    onValid();
  };

  return (
    <View flex={1} width={width - 32} p="$4" gap="$1">
      <View flex={1}>
        <Controller
          control={control}
          name="email"
          rules={{ required: true, pattern: /^\S+@\S+$/i }}
          render={({ field: { onChange, value, onBlur } }) => (
            <InputWithLabel
              labelText="Email"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              errorMessage={errors.email ? "Invalid email" : ""}
            />
          )}
        />
        <Controller
          control={control}
          name="username"
          rules={{ required: true, minLength: 2 }}
          render={({ field: { onChange, value, onBlur } }) => (
            <InputWithLabel
              labelText="User Name"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              errorMessage={errors.username ? "Name is required" : ""}
            />
          )}
        />
      </View>
      <XStack
        self={"stretch"}
        style={{ marginTop: 24,  justifyContent: "space-between" }}
      >
        <View />
        <Button onPress={handleSubmit(onSubmit)}>
          <Button.Text>Next</Button.Text>
        </Button>
      </XStack>
    </View>
  );
}
