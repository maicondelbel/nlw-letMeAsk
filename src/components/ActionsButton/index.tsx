import { ButtonHTMLAttributes, ReactNode } from 'react'
import { ActionsButtonContainer } from './styles'

import { CheckCircle, Chat, Trash } from 'phosphor-react'

interface IActionsButtonsProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  action: 'answer' | 'highlight' | 'delete'
  active?: boolean | undefined
  children?: ReactNode
}

export function ActionsButtons({
  action,
  active = false,
  children,
  ...props
}: IActionsButtonsProps) {
  return (
    <ActionsButtonContainer {...props} action={action} active={active}>
      {action === 'answer' && <CheckCircle size={32} />}
      {action === 'highlight' && <Chat size={32} />}
      {action === 'delete' && <Trash size={32} />}
    </ActionsButtonContainer>
  )
}
