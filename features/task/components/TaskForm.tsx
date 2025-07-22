import { Control, Controller, FieldErrors } from "react-hook-form";
import { InputWithLabel } from "@/components/input/InputWithLabel";
import { InputDatePicker } from "@/components/input/InputDatePicker";
import { PrioritySelector } from "./PrioritySelector";
import { Switch, YStack, XStack, Text, View, Label } from "tamagui";
import { TaskFormInputs } from "../hooks/useHandleTaskForm";
import { KeyboardAvoidingView } from "react-native";
import { SelectDemoContents } from "@/components/select/SelectContent";

interface TaskFormProps {
  control: Control<TaskFormInputs, any, TaskFormInputs>;
  errors: FieldErrors<TaskFormInputs>;
}

export default function TaskForm({ control, errors }: TaskFormProps) {
  return (
    <YStack flex={1} gap="$1">
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <Controller
          control={control}
          name="title"
          rules={{ required: "Title is required" }}
          render={({ field: { onChange, value, onBlur } }) => (
            <InputWithLabel
              labelText="Title*"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              errorMessage={errors.title?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value, onBlur } }) => (
            <InputWithLabel
              multiline
              style={{ minHeight: 100 }}
              labelText="Description"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
        <XStack justify="space-between" items="center">
          <View flex={1} mr="$2">
            <Controller
              control={control}
              name="dueDate"
              render={({ field: { onChange, value } }) => (
                <InputDatePicker
                  labelText="Due date"
                  value={value}
                  onChangeText={onChange}
                  errorMessage={errors.dueDate?.message}
                />
              )}
            />
          </View>
          <View flex={1}>
            <Controller
              control={control}
              name="dueTime"
              render={({ field: { onChange, value } }) => (
                <InputWithLabel
                  inputMode="numeric"
                  labelText="Due time"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
          </View>
        </XStack>
        <Controller
          control={control}
          name="priority"
          render={({ field: { value, onChange } }) => (
            <PrioritySelector value={value} onChange={onChange} />
          )}
        />
        <Controller
          control={control}
          name="status"
          render={({ field: { value, onChange } }) => (
            <XStack my="$3" width={"100%"} items="center" gap="$4">
              <Label htmlFor="select-demo-1" flex={1} minW={80}>
                Status
              </Label>
              <SelectDemoContents
                name="value"
                value={value}
                onValueChange={onChange}
                items={[
                  { name: "Open", value: "open" },
                  { name: "In Progress", value: "in-progress" },
                  { name: "Pending", value: "pending" },
                  { name: "Completed", value: "completed" },
                ]}
                id="select-demo-1"
              />
            </XStack>
          )}
        />
        <XStack p="$2" justify="space-between" items="center">
          <Text fontSize="$6">Get daily reminders for this task</Text>
          <Controller
            control={control}
            name="reminder"
            render={({ field: { value, onChange } }) => (
              <Switch
                backgroundColor={!!value ? "$primary" : "gray"}
                size="$4"
                checked={!!value}
                onCheckedChange={onChange}
              >
                <Switch.Thumb backgroundColor={"white"} animation="bouncy" />
              </Switch>
            )}
          />
        </XStack>
      </KeyboardAvoidingView>
    </YStack>
  );
}
