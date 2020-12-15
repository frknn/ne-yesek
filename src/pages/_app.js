import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import { CurrentUserContextProvider } from '../context/currentUserContext'
import theme from '../theme'


function MyApp({ Component, pageProps }) {


  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
        options={{
          useSystemColorMode: true,
        }}
      >
        <CurrentUserContextProvider>
          <Component {...pageProps} />
        </CurrentUserContextProvider>
      </ColorModeProvider>
    </ChakraProvider>
  )
}

export default MyApp
