import {
  Menu, MenuButton, MenuList, MenuItem, useTheme,
} from "@chakra-ui/react";
import Link from 'next/link';
import { ChevronDownIcon } from '@chakra-ui/icons'


const SmallScreenMenu = () => {
  const theme = useTheme()
  return (
    <Menu >
      <MenuButton color={theme.colors.lightGray}>
        <ChevronDownIcon w={8} h={8} />
      </MenuButton>
      <MenuList>
        <MenuItem><Link href="/signup">Hesap Oluştur</Link></MenuItem>
        <MenuItem><Link href="/login">Giriş Yap</Link></MenuItem>
        <MenuItem><Link href="/search">Yemek Ara</Link></MenuItem>
      </MenuList>
    </Menu>
  );
}

export default SmallScreenMenu;