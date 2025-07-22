import { defaultConfig } from "@tamagui/config/v4";
import { createTamagui } from "tamagui";

export const tamaguiConfig = createTamagui({
  ...defaultConfig,
  themes: {
    light: {
      ...defaultConfig?.themes?.light,
      background: "#fff",
      color: "#11181C",
      primary: "#0a7ea4",
      accent: "#1A5078FFFF",
      accent1: "#0a7ea4FF",

      shadowColor: "#00000021",

      // ...add more tokens
    },
    dark: {
      ...defaultConfig?.themes?.dark,
      background: "#151718",
      color: "#FFFFFFFF",
      primary: "#82CDE6FF",
      accent: "#8495B2FF",
      accent1: "#1A5078FFFF",
      shadowColor: "#FFFFFF0D",
      // ...add more tokens
    },
  },
});

export default tamaguiConfig;

export type Conf = typeof tamaguiConfig;

declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}
