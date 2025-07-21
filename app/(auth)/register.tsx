import { View, Text, TextInput, Button } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import RegisterForm from "@/features/auth/components/register";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  return (
    <View style={{ flex: 1}}>
      <RegisterForm />
    </View>
  );
}
