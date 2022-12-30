import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

body, input, textarea, button {
	font-family: 'Roboto', sans-serif;
	font-weight: 400;
	font-size: 1rem;
	border: none;
}

body {
	background-color: ${(props) => props.theme['--white-background']};
	color: ${(props) => props.theme['--black']};
	-webkit-font-smoothing: antialiased;
}

h1, h2 {
	font-family: 'Poppins', sans-serif;
}

a {
    text-decoration: underline;
    margin-left: 0.25rem;
		cursor: pointer;
  }


`
