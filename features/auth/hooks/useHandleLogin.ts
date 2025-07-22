import { useAuthStore } from "@/store/useAuthStore";
import { useState } from "react";
import { useLoadingStore } from "@/store/useLoadingStore";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "@react-native-firebase/auth";
import { useRouter } from "expo-router";
import { useToastController } from "@tamagui/toast";

export default function useHandleLogin() {
  const [error, setError] = useState<string | null>(null);

  const { setUser } = useAuthStore();
  const router = useRouter();
  const toast = useToastController();

  const showLoading = useLoadingStore.getState().showLoading;
  const hideLoading = useLoadingStore.getState().hideLoading;
  const handleLogin = async (data: { email: string; password: string }) => {
    showLoading();
    setError(null);
    try {
      // Simulate API call
      const userCredential = await signInWithEmailAndPassword(
        getAuth(),
        data?.email,
        data?.password
      );
      console.log("userCredential", userCredential?.user);
      // Mock user data
      if (userCredential?.user) {
        const { uid, email, displayName } = userCredential.user;
        setUser({
          uid,
          email: email ?? "",
          displayName: displayName ?? "",
        });
      }
      router.replace("/(tabs)/home");
    } catch (err) {
      const error = err as FirebaseError;
      if (error.code === "auth/user-not-found") {
        toast.show("User not found. Please register.", {
          type: "error",
          message: "User not found. Please register.",
        });
      } else if (error.code === "auth/wrong-password") {
        toast.show("Incorrect password. Please try again.", {
          type: "error",
          message: "Incorrect password. Please try again.",
        });
      } else {
        toast.show("Login failed. Please try again.", {
          type: "error",
          message: error.message,
        });
      }

      setError("Login failed. Please try again.");
    } finally {
      hideLoading();
    }
  };

  return {
    error,
    handleLogin,
  };
}
