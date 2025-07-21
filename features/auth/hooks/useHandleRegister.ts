import { useRef } from "react";
import { FlatList } from "react-native";
import { useRegisterStore } from "../../../store/registerStore";
import {
  createUserWithEmailAndPassword,
  getAuth,
} from "@react-native-firebase/auth";

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

  // Wrap next/prev to pass ref
  const nextStep = () => handleNextStep(ref);
  const prevStep = () => handlePreviousStep(ref);

  const onRegister = async () => {
    try {
      const res = await createUserWithEmailAndPassword(
        getAuth(),
        formData?.email,
        formData?.password
      );
      const currentUser = getAuth().currentUser;
      const uid = currentUser ? currentUser.uid : null;
      // await db.collection("users").doc(uid).set({
      //   email: formData.email,
      //   createdAt: firestore.FieldValue.serverTimestamp(),
      // });
    } catch (error) {}
  };

  return {
    ref,
    step,
    setStep,
    formData,
    handleChange,
    handleNextStep: nextStep,
    handlePreviousStep: prevStep,
  };
};
