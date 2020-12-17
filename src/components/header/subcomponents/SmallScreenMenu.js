import {
  Menu, MenuButton, MenuList, MenuItem, useTheme,
} from "@chakra-ui/react";
import Link from 'next/link';
import { ChevronDownIcon } from '@chakra-ui/icons'


const SmallScreenMenu = ({ menuItems }) => {

  return (
    <Menu >
      <MenuButton color="lightGray">
        <ChevronDownIcon w={8} h={8} />
      </MenuButton>
      <MenuList>
        {
          menuItems.map(menuItem => (
            <MenuItem onClick={menuItem.onClick}>
              <Link href={menuItem.destination}>
                {menuItem.text}
              </Link>
            </MenuItem>
          ))
        }
      </MenuList>
    </Menu>
  );
}

export default SmallScreenMenu;