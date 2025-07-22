import { useEffect, useRef } from "react";
import { FlatList } from "react-native";
import {
  createUserWithEmailAndPassword,
  getAuth,
} from "@react-native-firebase/auth";
import {
  collection,
  doc,
  setDoc,
  serverTimestamp,
  FirestoreError,
} from "firebase/firestore";
import { useRegisterStore } from "@/store/useRegisterStore";
import { useLoadingStore } from "@/store/useLoadingStore";
import { useRouter } from "expo-router";
import { useToastController } from "@tamagui/toast";
import { db } from "@/firebase/config";
export const useHandleRegister = () => {
  const ref = useRef<FlatList>(null);
  const {
    step,
    setStep,
    formData,
    handleChange,
    handleNextStep,
    handlePreviousStep,
  } = useRegisterStore();
  const showLoading = useLoadingStore.getState().showLoading;
  const hideLoading = useLoadingStore.getState().hideLoading;
  const { back } = useRouter();

  useEffect(() => {
    // Reset step to 0 when the component mounts
    return () => {
      setStep(0);
      ref.current?.scrollToIndex({ index: 0, animated: true });
    };
  }, []);

  // Wrap next/prev to pass ref
  const nextStep = () => handleNextStep(ref);
  const prevStep = () => handlePreviousStep(ref);
  const toast = useToastController();

  const onRegister = async () => {
    try {
      showLoading();
      const userCredential = await createUserWithEmailAndPassword(
        getAuth(),
        formData?.email,
        formData?.password
      );

      const uid = userCredential.user.uid;

      await setDoc(doc(collection(db, "users"), uid), {
        email: formData.email,
        uid: uid,
        displayName: formData.username,
        job: formData.job,
        createdAt: serverTimestamp(),
      });
      toast.show("Successfully created!", {
        message: "",
        type: "success",
      });
      back();
    } catch (error) {
      const err = error as FirestoreError;
      toast.show("Registration error:", {
        message: err.message,
        type: "error" ,
      });
      console.log("Registration error:", err.message);
    } finally {
      hideLoading();
    }
  };

  return {
    ref,
    step,
    setStep,
    formData,
    handleChange,
    handleNextStep: nextStep,
    handlePreviousStep: prevStep,
    onRegister,
  };
};
