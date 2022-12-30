import { ReactNode } from 'react'
import { BadgetContainer } from './styles'

interface IBadgetProps {
  variant?: 'primary' | 'danger'
  children: ReactNode
}

export function Badget({ variant = 'primary', children }: IBadgetProps) {
  return <BadgetContainer variant={variant}>{children}</BadgetContainer>
}
