import { useState } from "react";
import { View, Text as RNText, FlatList } from "react-native";
import { InputWithLabel } from "../../../../components/input/InputWithLabel";
import { YStack, XStack, RadioGroup, Label, Theme, Button } from "tamagui";
import RegisterStep1 from "./RegisterStep1";
import RegisterStep2 from "./RegisterStep2";
import RegisterStep3 from "./RegisterStep3";
import { useHandleRegister } from "../../hooks/useHandleRegister";
import { ProgressBar } from "@/components/processbar/ProgressBar";

const JOBS = ["Học sinh", "Sinh viên", "Designer", "Developer", "Khác"];

export default function RegisterForm() {
  const {
    formData,
    handleChange,
    handleNextStep,
    handlePreviousStep,
    step,
    setStep,
    ref,
  } = useHandleRegister();
console.log("step", step);

  return (
    <Theme>
      <YStack
        style={{
          flex: 1,
          padding: 16,
          paddingBottom: 40,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Process Bar */}
        <XStack style={{ width: '100%', alignItems: "center", marginBottom: 16 }}>
         <ProgressBar steps={3} activeStep={step} />
        </XStack>

        {/* Step Content */}
        <FlatList
          data={[1, 2, 3]}
          horizontal
          style={{ flexGrow: 0 }}
          ref={ref}
          pagingEnabled
          scrollEnabled={false}
        
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) => {
            switch (item) {
              case 1:
                return <RegisterStep1 handleChange={handleChange} />;
              case 2:
                return (
                  <RegisterStep2
                    job={formData.job}
                    handleChange={handleChange}
                  />
                );
              case 3:
                return <RegisterStep3 handleChange={handleChange} />;
              default:
                return null;
            }
          }}
        />

        {/* Button controls */}
        <XStack
          style={{ marginTop: 24, width: 320, justifyContent: "space-between" }}
        >
          <Button disabled={step === 0} onPress={handlePreviousStep}>
            <Button.Text>Quay lại</Button.Text>
          </Button>
          {step < 2 ? (
            <Button onPress={handleNextStep}>
              <Button.Text>Tiếp tục</Button.Text>
            </Button>
          ) : (
            <Button onPress={() => alert("Đăng ký!")}>
              <Button.Text>Đăng ký</Button.Text>
            </Button>
          )}
        </XStack>
      </YStack>
    </Theme>
  );
}
