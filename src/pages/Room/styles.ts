import styled from 'styled-components'

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
    /* color: ${(props) => props.theme['--purple']}; */
  }
`

export const ClosedTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  h2 {
    text-align: center;
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

  span {
    font-size: 0.875rem;
    font-weight: 500;
    color: ${(props) => props.theme['--white']};
    border-radius: 100px;
    padding: 0.5rem 1rem;
    background-color: ${(props) => props.theme['--pink-dark']};
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

  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;

    button {
      min-width: 100%;
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
