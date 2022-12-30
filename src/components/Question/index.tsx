import { ReactNode } from 'react'
import { Avatar } from '../Avatar'
import {
  QuestionContainer,
  QuestionFooter,
  ActionsButtonsContainer,
} from './styles'

interface IQuestionProps {
  author: {
    name: string
    avatarUrl: string
  }
  content: string
  isHighlighted?: boolean
  isAnswered?: boolean
  children: ReactNode
}

export function Question({
  isAnswered,
  isHighlighted,
  author,
  content,
  children,
}: IQuestionProps) {
  return (
    <QuestionContainer isAnswered={isAnswered} isHighlighted={isHighlighted}>
      <span>{content}</span>
      <QuestionFooter>
        <Avatar avatarUrl={author.avatarUrl} name={author.name} />
        <ActionsButtonsContainer>{children}</ActionsButtonsContainer>
      </QuestionFooter>
    </QuestionContainer>
  )
}
