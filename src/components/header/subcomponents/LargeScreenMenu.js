import { HStack, Link as ChakraLink, useToast } from "@chakra-ui/react"
import { SearchIcon } from '@chakra-ui/icons'

import Link from 'next/link';
import { useState, useEffect } from "react";

const LargeScreenMenuItem = ({ destination, children, onClick }) => {

  return (
    <Link href={destination}>
      <ChakraLink
        onClick={onClick}
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

  const [user, setUser] = useState(null)
  const toast = useToast()

  const logout = () => {
    localStorage.removeItem('currentUser')
    localStorage.removeItem('accessToken')
    console.log('USER REMOVED')
    toast({
      description: 'Çıkış yapıldı!',
      isClosable: true,
      status: 'info',
    })
    setUser(null)
  }

  useEffect(() => {
    if (localStorage.getItem('currentUser')) {
      setUser(localStorage.getItem('currentUser'))
    }
  }, [])

  if (user) {
    return (
      <HStack color="lightGray" spacing={2}>
        <LargeScreenMenuItem destination="/search">
          <SearchIcon mb={1} mr={1} />
          Tarif Ara
        </LargeScreenMenuItem>
        <LargeScreenMenuItem destination="/share">
          Tarif Paylaş
        </LargeScreenMenuItem>
        <LargeScreenMenuItem destination="/" onClick={logout}>
          Çıkış Yap
        </LargeScreenMenuItem>
        {/* <LargeScreenMenuItem destination="/signup">
          Hesap Oluştur
        </LargeScreenMenuItem>
        <LargeScreenMenuItem destination="/login">
          Giriş Yap
        </LargeScreenMenuItem> */}
      </HStack>
    )
  } else {
    return (
      <HStack color="lightGray" spacing={2}>
        <LargeScreenMenuItem destination="/search">
          <SearchIcon mb={1} mr={1} />
          Tarif Ara
        </LargeScreenMenuItem>
        {/* <LargeScreenMenuItem destination="/share">
          Tarif Paylaş
        </LargeScreenMenuItem> */}
        <LargeScreenMenuItem destination="/signup">
          Hesap Oluştur
        </LargeScreenMenuItem>
        <LargeScreenMenuItem destination="/login">
          Giriş Yap
        </LargeScreenMenuItem>
      </HStack>
    );
  }

}

export default LargeScreenMenu;