export type ButtonSize = 'sm' | 'md' | 'lg'

export interface BaseButtonProps {
  size?: ButtonSize
  width?: number | 'auto' | '100%'
  icon?: React.ReactNode
  loading?: boolean
  disabled?: boolean
  iconRight?: React.ReactNode
  iconLeft?: React.ReactNode
  children?: React.ReactNode
}
