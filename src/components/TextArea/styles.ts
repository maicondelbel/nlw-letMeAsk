import styled, { css } from 'styled-components'

interface ITextAreaContainer {
  isHighlighted?: boolean
  isAnswered?: boolean
  hasError?: boolean
}

export const TextAreaContainer = styled.textarea<ITextAreaContainer>`
  padding: 1rem;
  border-radius: 0.5rem;
  line-height: 1.5rem;
  color: ${(props) => props.theme['--gray-dark']};
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.04);
  width: 100%;
  border: none;
  outline: none;
  resize: none;
  min-height: 8.3rem;

  ${(props) =>
    props.hasError &&
    css`
      box-shadow: 0 0 2px 2px ${(props) => props.theme['--danger']};
    `};

  &::placeholder {
    color: ${(props) =>
      props.hasError ? props.theme['--danger'] : props.theme['--gray-medium']};
  }

  ${(props) => {
    if (props.isHighlighted && !props.isAnswered) {
      return css`
        background-color: #f4f0ff;
      `
    } else if (props.isAnswered) {
      return css`
        background-color: #dbdcdd;
      `
    } else {
      return css`
        background-color: none;
      `
    }
  }}

  &:not(:read-only):active,
  :not(:read-only):focus {
    outline: 1px solid ${(props) => props.theme['--purple']};
  }

  &:read-only {
    opacity: 0.5;
  }
`
