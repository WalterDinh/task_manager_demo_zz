import { useLoadingStore } from '@/store/useLoadingStore';
import { Modal } from 'react-native';
import { YStack, Spinner } from 'tamagui';

export default function LoadingModal() {
  const isLoading = useLoadingStore((state) => state.isLoading);

  return (
    <Modal visible={isLoading} transparent animationType="fade">
      <YStack
        fullscreen
        bg="rgba(0,0,0,0.4)"
        justify="center"
        items="center"
      >
        <Spinner size="large" color="$color" />
      </YStack>
    </Modal>
  );
}
