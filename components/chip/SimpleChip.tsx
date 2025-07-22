import type { SizeTokens, ThemeName } from "tamagui";
import { Chip } from "./ChipPart";

/** ------ EXAMPLE ------ */
export function SimpleChip({
  size,
  color,
  label,
}: {
  size?: SizeTokens;
  color?: any;
  label?: string;
}) {
  return (
    <Chip border bg={color} size={size} key={color}>
      <Chip.Text fontWeight={'bold'} color={'white'}>{label}</Chip.Text>
    </Chip>
  );
}
