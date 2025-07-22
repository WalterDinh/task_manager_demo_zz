import { Text as RNText, FlatList } from "react-native";
import { YStack, XStack, Theme, Button } from "tamagui";
import RegisterStep1 from "./RegisterStep1";
import RegisterStep2 from "./RegisterStep2";
import RegisterStep3 from "./RegisterStep3";
import { useHandleRegister } from "../../hooks/useHandleRegister";
import { ProgressBar } from "@/components/processbar/ProgressBar";
import AppHeader from "@/components/header/AppHeader";
import { CircleChevronLeft } from "@tamagui/lucide-icons";
import { useRouter } from "expo-router";

export default function RegisterForm() {
  const {
    formData,
    handleChange,
    handleNextStep,
    handlePreviousStep,
    step,
    ref,
    onRegister,
  } = useHandleRegister();

  const { back } = useRouter();
  return (
    <Theme>
      <YStack flex={1} pb={40} justify={"space-between"}>
        <AppHeader
          onPressIconLeft={back}
          title="Signup"
          
          iconLeft={<CircleChevronLeft size={"$2"} />}
        />
        {/* Process Bar */}
        <XStack
          style={{ width: "100%", alignItems: "center", marginBottom: 16 }}
        >
          <ProgressBar steps={3} activeStep={step} />
        </XStack>
        <YStack flex={1} p={"$4"} items={"center"}>
          <FlatList
            data={[1, 2, 3]}
            horizontal
            style={{ flexGrow: 1 }}
            ref={ref}
            pagingEnabled
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.toString()}
            renderItem={({ item }) => {
              switch (item) {
                case 1:
                  return (
                    <RegisterStep1
                      onValid={handleNextStep}
                      handleChange={handleChange}
                    />
                  );
                case 2:
                  return (
                    <RegisterStep2
                      job={formData.job}
                      onNext={handleNextStep}
                      onBack={handlePreviousStep}
                      handleChange={handleChange}
                    />
                  );
                case 3:
                  return (
                    <RegisterStep3
                      onValid={onRegister}
                      handlePreviousStep={handlePreviousStep}
                      handleChange={handleChange}
                    />
                  );
                default:
                  return null;
              }
            }}
          />
        </YStack>
      </YStack>
    </Theme>
  );
}
