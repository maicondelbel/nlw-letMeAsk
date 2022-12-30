import styled from 'styled-components'

export const WrapperContainer = styled.div`
  display: flex;
  height: 100vh;
`

export const SectionContainer = styled.section`
  background-color: ${(props) => props.theme['--purple']};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  flex: 1 45%;
  padding: 7.7rem 5.25rem 7.7rem 5.25rem;

  div {
    max-width: 27rem;
  }

  h1 {
    font-family: 'Poppins', sans-serif;
    font-size: 2.25rem;
    line-height: 2.625rem;
    font-weight: 700;
    color: ${(props) => props.theme['--white']};
    padding-bottom: 1rem;
  }

  p {
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: 400;
    color: ${(props) => props.theme['--white-background']};
    opacity: 0.7;
  }

  img {
    margin-bottom: 0.5rem;
    max-width: 20rem;
    width: 100%;
  }

  @media (max-width: 1200px) {
    flex: 1 50%;
  }

  @media (max-width: 768px) {
    display: none;
  }
`

export const MainContainer = styled.main`
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 55%;

  @media (max-width: 1200px) {
    flex: 1 50%;
  }
`

export const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 20rem;

  > img {
    align-self: center;
    margin-bottom: 3.5rem;
  }

  button {
    width: 100%;
  }
`

export const Separator = styled.span`
  font-size: 0.875rem;
  color: ${(props) => props.theme['--gray-medium']};
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 2rem 0;

  &::after {
    content: '';
    height: 1px;
    flex: 1;
    background-color: ${(props) => props.theme['--gray-medium']};
  }

  &::before {
    content: '';
    height: 1px;
    flex: 1;
    background-color: ${(props) => props.theme['--gray-medium']};
  }
`
