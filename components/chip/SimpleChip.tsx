import type { SizeTokens, ThemeName } from "tamagui";
import { Chip } from "./ChipPart";

/** ------ EXAMPLE ------ */
export function SimpleChip({
  size,
  color,
  label,
}: {
  size?: SizeTokens;
  color?: ThemeName;
  label?: string;
}) {
  return (
    <Chip border  theme={color as ThemeName} size={size} key={color}>
      <Chip.Text>{label}</Chip.Text>
    </Chip>
  );
}
