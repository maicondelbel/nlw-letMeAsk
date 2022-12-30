import styled, { css } from 'styled-components'

export const LikeButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;

  span {
    margin-top: 3px;
    height: 1.5rem;
  }
`

interface ILikeButtonContainer {
  hasLiked: boolean
}

export const LikeButtonContainer = styled.button<ILikeButtonContainer>`
  cursor: pointer;
  color: ${(props) => props.theme['--gray-dark']};
  background-color: transparent;
  padding: 0.125rem;
  line-height: 0;

  svg {
    ${(props) =>
      props.hasLiked &&
      css`
        color: ${props.theme['--purple']};
      `}
    height: 1.5rem;
    width: 1.5rem;
  }

  &:hover {
    color: ${(props) => props.theme['--purple']};
  }

  &:disabled {
    cursor: not-allowed;
  }
`
