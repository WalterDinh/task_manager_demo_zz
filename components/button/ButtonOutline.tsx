import React from "react";
import { Text, Spinner, XStack } from "tamagui";
import { BaseButtonProps } from "./types";
import { ButtonBase } from "./ButtonBase";

export const ButtonOutline = ({
  size = "md",
  width,
  icon,
  iconRight,
  iconLeft,
  loading,
  disabled,
  children,
  ...rest
}: BaseButtonProps) => {
  return (
    <ButtonBase
      size={size}
      disabled={disabled || loading}
      bg="transparent"
      fullWidth={width === "100%"}
      width={typeof width === "number" ? width : undefined}
      {...rest}
    >
      <XStack gap="$2" items="center">
        {loading ? <Spinner size="small" /> : icon}
        {iconLeft && <>{iconLeft}</>}
        <Text color="$color" fontSize={size === "lg" ? 16 : 14}>
          {children}
        </Text>
        {iconRight}
      </XStack>
    </ButtonBase>
  );
};
