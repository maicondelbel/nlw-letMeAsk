import { ButtonHTMLAttributes, ReactNode } from 'react'
import { ButtonContainer } from './styles'

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger' | 'cancel' | 'outline' | 'login'
  size?: 'large' | 'normal' | 'medium'
  children: ReactNode
}

export function Button({
  size = 'normal',
  variant = 'primary',
  children,
  ...props
}: IButtonProps) {
  return (
    <ButtonContainer variant={variant} size={size} {...props}>
      {children}
    </ButtonContainer>
  )
}
