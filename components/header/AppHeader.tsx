import { SafeAreaView } from "react-native-safe-area-context";
import { Button, H3, H4, View, XStack } from "tamagui";
import React from "react";

type AppHeaderProps = {
  title: string;
  onPressIconLeft?: () => void;
  onPressIconRight?: () => void;

  iconLeft?: React.ReactNode | any; // Optional icon prop,
  iconRight?: React.ReactNode | any; // Optional icon prop
};

export default function AppHeader({
  title,
  onPressIconLeft,
  onPressIconRight,
  iconLeft,
  iconRight,
}: AppHeaderProps) {
  return (
    <SafeAreaView edges={["top"]}>
      {/* Your header content goes here */}
      <XStack justify={"space-between"} p={"$4"} items={"center"}>
        {iconLeft ? (
          <Button width={20} onPress={onPressIconLeft} unstyled icon={iconLeft} />
        ) : (
          <View width={20} />
        )}
        <H4 fontWeight={"bold"}>{title}</H4>
        {iconRight ? (
          <Button width={20} onPress={onPressIconRight} unstyled icon={iconRight} />
        ) : (
          <View width={20} />
        )}
      </XStack>
    </SafeAreaView>
  );
}
