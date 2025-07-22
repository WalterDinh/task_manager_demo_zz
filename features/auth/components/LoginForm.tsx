import { XStack, YStack, Button, Text } from "tamagui";
import { InputWithLabel } from "@/components/input/InputWithLabel";
import useHandleLogin from "../hooks/useHandleLogin";
import { KeyboardAvoidingView } from "react-native";
import { useForm, Controller } from "react-hook-form";

// import {
//   KeyboardAwareScrollView,
//   KeyboardToolbar,
// } from "react-native-keyboard-controller";
type LoginFormInputs = {
  email: string;
  password: string;
};

export default function LoginForm({ navigateToRegisterPage }: any) {
  const { handleLogin } = useHandleLogin();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  return (
    <YStack flex={1} items={"center"} gap="$1">
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <YStack justify={"flex-start"} flex={1}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputWithLabel
                onBlur={onBlur}
                labelText="Email"
                onChangeText={onChange}
                errorMessage={errors.email ? "Invalid email" : ""}
                value={value}
              />
            )}
            name="email"
            rules={{ required: true, pattern: /^\S+@\S+$/i }}
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur } }) => (
              <InputWithLabel
                onBlur={onBlur}
                labelText="Password"
                errorMessage={errors.password ? "Invalid password" : ""}
                onChangeText={onChange}
                secureTextEntry
              />
            )}
            name="password"
            rules={{
              required: true,
              min: 8,
            }}
          />

          <Button
            height={54}
            mt={"$4"}
            bg={'$primary'}
            color={"white"}
            fontSize={'$6'}
            fontWeight={"bold"}
            self={"stretch"}
            onPress={handleSubmit(handleLogin)}
          >
            Get started
          </Button>
        </YStack>
      </KeyboardAvoidingView>

      <XStack justify="center" gap="$2">
        <Text>Don't have an account?</Text>
        <Button
          items="center"
          self="flex-start"
          unstyled
          onPress={navigateToRegisterPage}
        >
          <Text
            textDecorationLine="underline"
            fontWeight={"700"}
            color={"$primary"}
            fontSize={"$4"}
          >
            Sign up
          </Text>
        </Button>
      </XStack>
    </YStack>
  );
}
