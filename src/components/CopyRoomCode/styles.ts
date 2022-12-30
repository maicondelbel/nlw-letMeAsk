import styled from 'styled-components'

export const RoomButton = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;

  button {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    line-height: 0;
    color: ${(props) => props.theme['--white']};
    background-color: ${(props) => props.theme['--purple']};
    padding: 0.625rem 0.75rem;
    transition: all 0.2s;
    cursor: pointer;

    &:hover {
      background-color: ${(props) => props.theme['--purple-hover']};
    }
  }

  div {
    font-weight: 500;
    font-size: 0.875rem;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    height: 40px;
    padding: 0.625rem 0.75rem;
    border: 1px solid ${(props) => props.theme['--purple']};
  }

  @media (max-width: 576px) {
    button {
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
    }

    div {
      display: none;
    }
  }
`
