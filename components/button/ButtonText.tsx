import React from 'react'
import { Spinner, Text } from 'tamagui'
import { ButtonBase } from './ButtonBase'
import { BaseButtonProps } from './types'

export const ButtonText = ({
  size = 'md',
  width,
  icon,
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
      borderColor="$color"
      borderWidth={1}
      fullWidth={width === '100%'}
      width={typeof width === 'number' ? width : undefined}
      {...rest}
    >
      {loading ? <Spinner size="small" /> : icon}
      <Text color="$color" fontSize={size === 'lg' ? 16 : 14}>
        {children}
      </Text>
    </ButtonBase>
  )
}
