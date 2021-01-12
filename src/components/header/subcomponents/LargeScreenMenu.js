import { HStack, Link as ChakraLink } from "@chakra-ui/react"

import Link from 'next/link';

const LargeScreenMenuItem = ({ destination, children, onClick }) => {

  return (
    <Link
      prefetch={false}
      href={destination}>
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

const LargeScreenMenu = ({ menuItems }) => {

  return <HStack color="lightGray" spacing={2}>
    {
      menuItems.map(menuItem => {
        return <LargeScreenMenuItem
          key={menuItem.text}
          onClick={menuItem.onClick}
          destination={menuItem.destination}

        >
          {menuItem.icon}{menuItem.text}
        </LargeScreenMenuItem>
      }

      )
    }
  </HStack>
}

export default LargeScreenMenu;