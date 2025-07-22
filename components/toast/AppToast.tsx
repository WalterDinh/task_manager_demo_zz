import { Toast, useToastController, useToastState } from "@tamagui/toast";
import React from "react";
import { Button, isWeb, Label, Switch, XStack, YStack } from "tamagui";

const AppToast = () => {
  const currentToast = useToastState();

  if (!currentToast || currentToast.isHandledNatively) return null;

  return (
    <Toast
      animation="200ms"
      bg={"$primary"}
      key={currentToast.id}
      duration={currentToast.duration}
      enterStyle={{ opacity: 0, transform: [{ translateY: 100 }] }}
      exitStyle={{ opacity: 0, transform: [{ translateY: 100 }] }}
      transform={[{ translateY: 0 }]}
      opacity={1}
      scale={1}
      viewportName={currentToast.viewportName}
    >
      <YStack>
        <Toast.Title fontWeight={'600'} color={'white'}>{currentToast.title}</Toast.Title>
        {!!currentToast.message && (
          <Toast.Description color={'white'}>{currentToast.message}</Toast.Description>
        )}
      </YStack>
    </Toast>
  );
};

export default AppToast;
