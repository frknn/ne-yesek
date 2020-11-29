import { Heading, Link as ChakraLink, useTheme } from '@chakra-ui/react'

const HeaderTitle = ({ children }) => {
  const theme = useTheme()

  return (
    <Heading
      size="xl"
      color={theme.colors.lightGray}
    >
      <ChakraLink
        href="/"
        _hover={{ textDecoration: 'none' }}
      >
        {children}
      </ChakraLink>
    </Heading>
  );
}

export default HeaderTitle;