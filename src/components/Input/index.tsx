import { forwardRef, InputHTMLAttributes } from 'react'
import { InputContainer } from './styles'

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean
}

export const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ hasError = false, ...props }, ref) => {
    return <InputContainer {...props} hasError={hasError} ref={ref} />
  },
)
Input.displayName = 'Input'
