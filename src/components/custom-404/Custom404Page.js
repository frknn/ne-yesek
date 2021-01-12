import { Center, Heading, Link as ChakraLink, VStack, Text } from "@chakra-ui/react"
import Link from 'next/link'

const Custom404Page = () => {
  return (
    <Center p={8} w="full" h="100vh" textAlign="center">
      <VStack spacing={16}>
        <VStack spacing={8}>
          <Heading as="h1" size="4xl">404</Heading>
          <Heading as="h2" size="xl">Maalesef, böyle bir sayfa yok :(</Heading>
          <Text fontWeight="400" fontSize="lg">Aşağıdaki bağlantıdan ana sayfaya dönüp, başka tariflere göz atabilirsiniz!</Text>
        </VStack>
        <Link href="/">
          <ChakraLink
            fontWeight="800"
            fontSize="2xl"
            color="lightRed"
          > Ana Sayfaya Dön</ChakraLink>
        </Link>
      </VStack>
    </Center>
  )
}

export default Custom404Page
