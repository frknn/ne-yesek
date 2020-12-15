import { HStack, Link as ChakraLink } from "@chakra-ui/react"
import { SearchIcon } from '@chakra-ui/icons'

import Link from 'next/link';

const LargeScreenMenuItem = ({ destination, children }) => {

  return (
    <Link href={destination}>
      <ChakraLink
        _hover={{
          textDecoration: 'none',
          backgroundColor: "lightRed"
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

  return (
    <HStack color="lightGray" spacing={2}>
      <LargeScreenMenuItem destination="/search">
        <SearchIcon mb={1} mr={1} />
        Tarif Ara
      </LargeScreenMenuItem>
      <LargeScreenMenuItem destination="/share">
        Tarif Paylaş
      </LargeScreenMenuItem>
      <LargeScreenMenuItem destination="/signup">
        Hesap Oluştur
      </LargeScreenMenuItem>
      <LargeScreenMenuItem destination="/login">
        Giriş Yap
      </LargeScreenMenuItem>
    </HStack>
  );
}

export default LargeScreenMenu;