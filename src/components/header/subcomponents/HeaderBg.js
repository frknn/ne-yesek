import { Box, useTheme } from '@chakra-ui/react'

const HeaderBg = ({ children }) => {
  const theme = useTheme()

  return (
    <Box
      as="header"
      w="100%"
      h={16}
      pos="fixed"
      top={0}
      left={0}
      bg={theme.colors.darkRed}
      boxShadow="md">
      {children}
    </Box>
  )
}

export default HeaderBg