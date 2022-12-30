import styled from 'styled-components'

export const HeaderContainer = styled.header`
  background-color: ${(props) => props.theme['--white-background']};
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid #e2e2e2;
  min-height: 5.625rem;
  display: flex;
  align-items: center;

  img {
    max-height: 3rem;
  }
`
export const HeaderWrapper = styled.div`
  max-width: 1120px;
  width: 100%;
  margin: auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  > div {
    display: flex;
    gap: 0.5rem;

    button {
      flex: 1;
    }
  }
`
