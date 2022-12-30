import { HeaderContainer, HeaderWrapper } from './styles'

import Logo from '../../assets/logo.svg'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface IHeaderProps {
  children: ReactNode
}

export function Header({ children }: IHeaderProps) {
  return (
    <HeaderContainer>
      <HeaderWrapper>
        <Link to={'/'}>
          <img src={Logo} alt="LetMeAsk" />
        </Link>
        <div>{children}</div>
      </HeaderWrapper>
    </HeaderContainer>
  )
}
