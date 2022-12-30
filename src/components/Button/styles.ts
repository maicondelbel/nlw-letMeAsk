import styled, { css } from 'styled-components'

interface IButtonContainer {
  variant: 'primary' | 'danger' | 'cancel' | 'outline' | 'login'
  size: 'large' | 'normal' | 'medium'
}

export const ButtonContainer = styled.button<IButtonContainer>`
  color: ${(props) => props.theme['--white-details']};
  padding: 0.875rem 2rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  max-width: 20rem;

  & svg {
    height: 1.25rem;
    width: 1.25rem;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  ${(props) => {
    switch (props.variant) {
      case 'danger':
        return css`
          background-color: ${(props) => props.theme['--danger']};

          &:not([disabled]):hover {
            background-color: ${(props) => props.theme['--danger-hover']};
          }
        `
      case 'cancel':
        return css`
          background-color: ${(props) => props.theme['--gray-light']};
          color: ${(props) => props.theme['--gray-dark']};

          &:not([disabled]):hover {
            background-color: ${(props) => props.theme['--gray-light-hover']};
          }
        `

      case 'outline':
        return css`
          height: ${props.size === 'medium' && '40px'};
          background-color: transparent;
          border: 1px solid ${(props) => props.theme['--purple']};
          color: ${(props) => props.theme['--purple']};

          &:not([disabled]):hover {
            border: 1px solid ${(props) => props.theme['--purple-hover']};
            color: ${(props) => props.theme['--purple-hover']};
          }
        `

      case 'login':
        return css`
          background-color: transparent;
          border: 1px solid ${(props) => props.theme['--gray-medium']};
          color: ${(props) => props.theme['--black']};

          &:not([disabled]):hover {
            border: 1px solid ${(props) => props.theme['--gray-medium-hover']};
          }
        `

      default:
        return css`
          background-color: ${(props) => props.theme['--purple']};

          &:not([disabled]):hover {
            background-color: ${(props) => props.theme['--purple-hover']};
          }
        `
    }
  }}
`
