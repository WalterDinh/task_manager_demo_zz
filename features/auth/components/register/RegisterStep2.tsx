import { Controller, useForm } from "react-hook-form";
import { useWindowDimensions } from "react-native";
import { XStack, Text, RadioGroup, Label, View, YStack, Button } from "tamagui";
const JOBS = ["Student", "Officer", "Designer", "Developer", "Other"];

export default function RegisterStep2({
  job,
  handleChange,
  onNext,
  onBack,
}: any) {
  const { width } = useWindowDimensions();
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: { job: "" },
    mode: "onTouched",
  });

  const onSubmit = (data: any) => {
    console.log("data", data);

    handleChange("job", data.job);
    onNext();
  };

  return (
    <View flex={1} width={width - 32} p="$4" gap="$1">
      <View flex={1}>
        <Text style={{ fontWeight: "bold", marginBottom: 8 }}>
          What's is your jobs?
        </Text>
        <Controller
          control={control}
          name="job"
          rules={{ required: "Please choose your job!" }}
          render={({ field: { onChange, value } }) => (
            <RadioGroup value={value} onValueChange={onChange}>
              {JOBS.map((job) => (
                <XStack
                  key={job}
                  style={{ alignItems: "center", marginBottom: 8 }}
                >
                  <RadioGroup.Item
                    backgroundColor={"$color"}
                    value={job}
                    id={job}
                  >
                    <RadioGroup.Indicator bg="$primary" scale={2} />
                  </RadioGroup.Item>
                  <Label htmlFor={job} style={{ marginLeft: 8 }}>
                    {job}
                  </Label>
                </XStack>
              ))}
            </RadioGroup>
          )}
        />
        {errors.job && <Label color="$red10">{errors.job.message}</Label>}
      </View>
      <XStack self={"stretch"} justify={"space-between"} gap="$2" mt="$4">
        <Button borderColor={"$primary"} onPress={onBack} variant="outlined">
          <Button.Text color={"$color"}>Previous</Button.Text>
        </Button>
        <Button bg={"$primary"} onPress={handleSubmit(onSubmit)}>
          <Button.Text color={"$color"}>Next</Button.Text>
        </Button>
      </XStack>
    </View>
  );
}
