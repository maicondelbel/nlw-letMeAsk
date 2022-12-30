import styled, { css } from 'styled-components'

interface IActionsButtonContainer {
  action: 'answer' | 'highlight' | 'delete'
  active?: boolean
}

export const ActionsButtonContainer = styled.button<IActionsButtonContainer>`
  color: ${(props) => props.theme['--gray-dark']};
  background-color: transparent;
  padding: 0.125rem;
  cursor: pointer;
  line-height: 1;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    ${(props) =>
      props.active &&
      css`
        color: ${props.theme['--purple']};
      `}
    height: 1.5rem;
    width: 1.5rem;
  }

  &:not([disabled]):hover {
    color: ${(props) =>
      props.action === 'delete'
        ? props.theme['--danger']
        : props.theme['--purple']};
  }

  &:disabled {
    cursor: not-allowed;
  }
`
