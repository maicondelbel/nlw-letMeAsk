import styled, { css } from 'styled-components'

interface IInputContainer {
  hasError: boolean
}

export const InputContainer = styled.input<IInputContainer>`
  color: ${(props) => props.theme['--gray-medium']};
  padding: 1rem;
  border: 1px solid ${(props) => props.theme['--gray-medium']};
  border-radius: 8px;
  margin-bottom: 1rem;
  width: 100%;

  ${(props) =>
    props.hasError &&
    css`
      box-shadow: 0 0 2px 2px ${(props) => props.theme['--danger']};
    `};

  &::placeholder {
    color: ${(props) =>
      props.hasError ? props.theme['--danger'] : props.theme['--gray-medium']};
  }

  &:active,
  :focus {
    outline: 1px solid ${(props) => props.theme['--purple']};
  }
`
