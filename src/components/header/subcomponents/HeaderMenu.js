import { useBreakpointValue, useToast } from '@chakra-ui/react'
import SmallScreenMenu from './SmallScreenMenu'
import LargeScreenMenu from './LargeScreenMenu'
import { useEffect } from 'react'
import { useState } from 'react'
import { SearchIcon } from '@chakra-ui/icons'

const HeaderMenu = () => {

  const toast = useToast()
  const [menuItems, setmenuItems] = useState([])

  const logout = () => {
    localStorage.removeItem('currentUser')
    localStorage.removeItem('accessToken')
    console.log('USER REMOVED')
    toast({
      description: 'Çıkış yapıldı!',
      isClosable: true,
      status: 'info',
    })
    setmenuItems(loggedOutMenuItems)
  }

  const loggedInMenuItems = [
    {
      destination: '/search',
      text: 'Tarif Ara',
      icon: <SearchIcon mb={1} mr={1} />
    },
    {
      destination: '/share',
      text: 'Tarif Paylaş',
    },
    {
      destination: '/',
      text: 'Çıkış Yap',
      onClick: logout
    }
  ]

  const loggedOutMenuItems = [
    {
      destination: '/search',
      text: 'Tarif Ara',
      icon: <SearchIcon mb={1} mr={1} />
    },
    {
      destination: '/signup',
      text: 'Hesap Oluştur',
    },
    {
      destination: '/login',
      text: 'Giriş Yap'
    }
  ]

  useEffect(() => {
    if (localStorage.getItem('currentUser')) {
      setmenuItems(loggedInMenuItems)
    } else {
      setmenuItems(loggedOutMenuItems)
    }
  }, [])


  const menu = useBreakpointValue({
    base: <SmallScreenMenu menuItems={menuItems} />, md: <LargeScreenMenu menuItems={menuItems} />
  })

  return <>{menu}</>
}

export default HeaderMenu;