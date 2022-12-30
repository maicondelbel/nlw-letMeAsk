import { forwardRef, TextareaHTMLAttributes } from 'react'
import { TextAreaContainer } from './styles'

interface ITextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean
  isHighlighted?: boolean
  isAnswered?: boolean
}

export const TextArea = forwardRef<HTMLTextAreaElement, ITextAreaProps>(
  (
    { hasError = false, isAnswered = false, isHighlighted = false, ...props },
    ref,
  ) => {
    return (
      <TextAreaContainer
        {...props}
        hasError={hasError}
        isAnswered={isAnswered}
        isHighlighted={isHighlighted}
        ref={ref}
      />
    )
  },
)
TextArea.displayName = 'TextArea'
