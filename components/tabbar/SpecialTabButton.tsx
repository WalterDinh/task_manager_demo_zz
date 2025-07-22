import * as Haptics from "expo-haptics";
import { StyleSheet } from "react-native";
import { Plus } from "@tamagui/lucide-icons";
import { Button, Theme } from "tamagui";
import { useRouter } from "expo-router";
import { useThemeStore } from "@/store/themeStore";

export const SpecialTabButton = () => {
  const router = useRouter();

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push("/add_task");
  };

  const { theme } = useThemeStore();

  return (
    <Theme name={theme}>
      <Button
        rounded={"$radius.12"}
        bg={'$primary'}
        onPress={handlePress}
        style={styles.button}
        icon={<Plus size={"$4"} color={"white"} />}
      />
    </Theme>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 20,
    left: "50%",
    transform: [{ translateX: -40 }],
    borderRadius: 24,
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
  },
});
