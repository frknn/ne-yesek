import { HStack, Link as ChakraLink, useTheme } from "@chakra-ui/react"
import { SearchIcon } from '@chakra-ui/icons'

import Link from 'next/link';

const LargeScreenMenuItem = ({ destination, children }) => {
  const theme = useTheme()

  return (
    <Link href={destination}>
      <ChakraLink
        _hover={{
          textDecoration: 'none',
          backgroundColor: theme.colors.lightRed
        }}
        fontWeight="semibold"
        p={2}
        rounded="md">
        {children}
      </ChakraLink>
    </Link>
  )
}

const LargeScreenMenu = () => {
  const theme = useTheme()

  return (
    <HStack color={theme.colors.lightGray} spacing={2}>
      <LargeScreenMenuItem destination="/signup">
        Hesap Oluştur
      </LargeScreenMenuItem>
      <LargeScreenMenuItem destination="/login">
        Giriş Yap
      </LargeScreenMenuItem>
      <LargeScreenMenuItem destination="/search">
        <SearchIcon mb={1} mr={1} />
        Tarif Ara
      </LargeScreenMenuItem>
    </HStack>
  );
}

export default LargeScreenMenu;