import { useBreakpointValue } from '@chakra-ui/react'
import SmallScreenMenu from './SmallScreenMenu'
import LargeScreenMenu from './LargeScreenMenu'


const HeaderMenu = () => {
  const menu = useBreakpointValue({
    base: <SmallScreenMenu />, md: <LargeScreenMenu />
  })

  return <>{menu}</>
}

export default HeaderMenu;