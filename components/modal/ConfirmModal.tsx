import { Button, Dialog, Paragraph, XStack } from "tamagui";
import React from "react";

interface ConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  confirmTheme?: import("@tamagui/web").ThemeName;
  loading?: boolean;
  children?: React.ReactNode;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  onOpenChange,
  title = "Confirm",
  description = "Are you sure?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  confirmTheme = "red" as import("@tamagui/web").ThemeName,
  loading = false,
  children,
}) => (
  <Dialog open={open} modal onOpenChange={onOpenChange}>
    <Dialog.Trigger asChild>{children}</Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay opacity={0.7} />
      <Dialog.Content bordered elevate width={320} p="$4">
        <Dialog.Title fontSize={"$6"}>{title}</Dialog.Title>
        <Paragraph>{description}</Paragraph>
        <XStack gap="$3" mt="$4" justify="flex-end">
          <Dialog.Close asChild>
            <Button variant="outlined">{cancelText}</Button>
          </Dialog.Close>
          <Button theme={confirmTheme} onPress={onConfirm} disabled={loading}>
            {confirmText}
          </Button>
        </XStack>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog>
);
