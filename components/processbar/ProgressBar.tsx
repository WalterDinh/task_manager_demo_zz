import { View, styled, XStack } from 'tamagui'
import { YStack } from 'tamagui'

type ProgressBarProps = {
  steps: number
  activeStep: number
}

const BarSegment = styled(View, {
  height: 6,
  rounded: 100,
  bg: '$accent5',
  flex: 1,
  mx: 4,
  animation: 'medium',
  enterStyle: {
    opacity: 0,
    scale: 0.9,
  },
  exitStyle: {
    opacity: 0,
    scale: 0.9,
  },
})

const ActiveSegment = styled(BarSegment, {
  bg: '$blue10',
  height: 10,
  flex: 2,
})

export function ProgressBar({ steps = 3, activeStep = 1 }: ProgressBarProps) {
  const bars = Array.from({ length: steps }, (_, i) => {
    const isActive = i === activeStep
    return (
      <YStack
        key={i}
        flex={isActive ? 1.2 : 1}
        animation="200ms"
        height={isActive ? 8 : 6}
        rounded={100}
        bg={isActive ? '$primary' : '$accent5'}
        mx={4}
      />
    )
  })

  return (
    <XStack width="100%" px="$4" py="$2" items="center">
      {bars}
    </XStack>
  )
}
