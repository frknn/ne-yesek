import { useBreakpointValue, useToast } from '@chakra-ui/react'
import SmallScreenMenu from './SmallScreenMenu'
import LargeScreenMenu from './LargeScreenMenu'
import { useEffect } from 'react'
import { useState } from 'react'
import { SearchIcon } from '@chakra-ui/icons'
import useLocalStorageValue from '../../../utils/hooks/useLocalStorageValue'

const HeaderMenu = () => {

  const toast = useToast()
  const [menuItems, setMenuItems] = useState([])

  const logout = () => {
    localStorage.removeItem('currentUser')
    localStorage.removeItem('accessToken')
    toast({
      description: 'Çıkış yapıldı!',
      isClosable: true,
      status: 'info',
    })
    setMenuItems(loggedOutMenuItems)
  }

  const loggedInMenuItems = [
    {
      destination: '/search',
      text: 'Tarif Ara',
      icon: <SearchIcon mb={1} mr={1} />
    },
    {
      destination: '/filter',
      text: 'Filtrele',
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
      destination: '/filter',
      text: 'Filtrele',
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
    const currentUser = useLocalStorageValue('currentUser')
    const accessToken = useLocalStorageValue('accessToken')

    if (currentUser && accessToken) {
      const userProfileLink = {
        destination: `/user/${currentUser._id}`,
        text: 'Profilim'
      }
      loggedInMenuItems.splice(loggedInMenuItems.length - 1, 0, userProfileLink)
      setMenuItems(loggedInMenuItems)
    } else {
      setMenuItems(loggedOutMenuItems)
    }
  }, [])

  const menu = useBreakpointValue({
    base: <SmallScreenMenu menuItems={menuItems} />, md: <LargeScreenMenu menuItems={menuItems} />
  })

  return <>{menu}</>
}

export default HeaderMenu;