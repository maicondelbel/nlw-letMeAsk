import styled from 'styled-components'

interface IBadgetContainer {
  variant: 'primary' | 'danger'
}

export const BadgetContainer = styled.span<IBadgetContainer>`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${(props) => props.theme['--white']};
  border-radius: 100px;
  padding: 0.5rem 1rem;
  background-color: ${(props) =>
    props.variant === 'primary'
      ? props.theme['--pink-dark']
      : props.theme['--danger']};
`
