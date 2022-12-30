import styled from 'styled-components'
import Modal from 'styled-react-modal'

export const RoomContainer = styled.div`
  flex-direction: column;
`

export const MainContainer = styled.main`
  max-width: 800px;
  margin: 4rem auto;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;

  svg {
    align-self: center;
  }
`

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  h1 {
    font-size: 1.5rem;
    flex: 1;
  }

  @media (max-width: 576px) {
    flex-direction: column;

    h1 {
      text-align: center;
    }
  }
`

export const FormContainer = styled.form`
  margin-top: 1.5rem;
`

export const FormFooter = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-size: 0.875rem;
    color: ${(props) => props.theme['--gray-dark']};
  }

  a {
    color: ${(props) => props.theme['--purple']};
    transition: all 0.2s;

    &:hover {
      color: ${(props) => props.theme['--purple-hover']};
    }
  }
`

export const QuestionContainer = styled.div`
  margin: 2rem 0;

  article + article {
    margin-top: 0.5rem;
  }
`

export const EmptyContainer = styled.div`
  width: 18rem;
  margin: 4rem auto;
  text-align: center;

  h2 {
    margin-top: 1rem;
    font-size: 1.125rem;
  }

  p {
    margin-top: 0.5rem;
    font-size: 0.875rem;
    text-align: center;
    line-height: 1.3rem;
  }
`
export const StyledModal = Modal.styled`

  padding: 4rem;
  max-width: 37rem;
  margin: 1rem;
  background-color: white;
  z-index: 40;
  border-radius: 8px;
  transition: all 0.3s ease-in-out;

  @media (max-width: 576px) {
    padding: 2rem;
  }
`

export const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;

  h2 {
    line-height: 2rem;
    margin-bottom: 0.75rem;
  }

  p {
    color: ${(props) => props.theme['--gray-dark']};
    line-height: 1.62rem;
  }

  svg {
    height: 3rem;
    width: 3rem;
    color: ${(props) => props.theme['--danger']};
    margin-bottom: 1.5rem;
  }

  div {
    margin-top: 2.5rem;
    display: flex;
    gap: 0.5rem;

    @media (max-width: 576px) {
      flex-direction: column;
      width: 100%;

      button {
        min-width: 100%;
      }
    }
  }
`
