import { Button } from "tamagui";
import { Moon, Sun } from "@tamagui/lucide-icons";
import { useThemeStore } from "@/store/themeStore";

export default function ButtonTheme() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <Button
      size="$3"
      circular
      onPress={toggleTheme}
      bg={theme !== "light" ? "black" : "$yellow10"}
      aria-label="Toggle theme"
      icon={
        theme !== "light" ? (
          <Moon size={20} color={"white"} />
        ) : (
          <Sun size={20} color={"white"} />
        )
      }
    />
  );
}
