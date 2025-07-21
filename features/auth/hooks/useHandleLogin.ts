import { useAuthStore } from "@/store/useAuthStore";
import { useState } from "react";
import { useLoadingStore } from "@/store/useLoadingStore";
import { getAuth, signInWithEmailAndPassword } from '@react-native-firebase/auth';

export default function useHandleLogin() {
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useAuthStore();
  const showLoading = useLoadingStore.getState().showLoading;
  const hideLoading = useLoadingStore.getState().hideLoading;
  const handleLogin = async () => {
    showLoading();
    setError(null);

    try {
      // Simulate API call
      const userCredential = await signInWithEmailAndPassword(
        getAuth(),
        email,
        password
      );
      console.log("userCredential", userCredential);
      // Mock user data
      setUser(userCredential);
    } catch (err) {
        console.log("Login error:", err);
        
      setError("Login failed. Please try again.");
    } finally {
      hideLoading();
    }
  };

  return {
    error,
    handleLogin,
    setEmail,
    setPassword,
    email,
    password,
  };
}
