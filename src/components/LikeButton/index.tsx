import { ButtonHTMLAttributes } from 'react'
import { LikeButtonContainer, LikeButtonWrapper } from './styles'

import { ThumbsUp } from 'phosphor-react'

interface ILikeButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  count: number
  hasLiked?: string | undefined
}

export function LikeButton({ hasLiked, count, ...props }: ILikeButtonProps) {
  return (
    <LikeButtonWrapper>
      {count > 0 && <span>{count}</span>}
      <LikeButtonContainer {...props} hasLiked={!!hasLiked}>
        <ThumbsUp />
      </LikeButtonContainer>
    </LikeButtonWrapper>
  )
}
