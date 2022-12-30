import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { AuthContextProvider } from './contexts/AuthContext'
import { Router } from './Router'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <AuthContextProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
        <Toaster position="top-right" reverseOrder={false} />
      </AuthContextProvider>
      <GlobalStyle />
    </ThemeProvider>
  )
}
