import { Heading, Link as ChakraLink } from '@chakra-ui/react'

const HeaderTitle = ({ title }) => {

  return (
    <Heading
      size="xl"
      color="lightGray"
    >
      <ChakraLink
        href="/"
        _hover={{ textDecoration: 'none' }}
      >
        {title}
      </ChakraLink>
    </Heading>
  );
}

export default HeaderTitle;