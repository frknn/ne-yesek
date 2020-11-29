import Link from 'next/link';
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Box,
  Button,
  Center,
  IconButton,
  Flex,
  useTheme,
  Stack,
  VStack,
  HStack,
  InputGroup,
  InputRightElement,
  Heading,
  Link as ChakraLink,
  Text,
  useBreakpointValue
} from "@chakra-ui/react"
import { useState } from "react";
import FormLayout from './subcomponents/FormLayout';

const SignupForm = () => {
  const theme = useTheme()

  const [show, setShow] = useState(false)
  const inline = useBreakpointValue({
    base: false, md: true
  })

  return (
    <FormLayout>
      <Heading>Hesap Oluşturun.</Heading>
      <HStack w="full">
        <FormControl id="first-name" isRequired>
          <FormLabel my={0}>Ad</FormLabel>
          <Input placeholder="Adınız" focusBorderColor={theme.colors.lightRed} type="text" />
        </FormControl>
        <FormControl id="last-name" isRequired>
          <FormLabel my={0}>Soyad</FormLabel>
          <Input placeholder="Soyadınız" focusBorderColor={theme.colors.lightRed} type="text" />
        </FormControl>
      </HStack>
      <Stack w="full" isInline={inline}>
        <FormControl id="email" isRequired>
          <FormLabel my={0}>Email</FormLabel>
          <Input placeholder="Email adresiniz" focusBorderColor={theme.colors.lightRed} type="email" />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel my={0}>Şifre</FormLabel>
          <InputGroup>
            <Input placeholder="Şifreniz" focusBorderColor={theme.colors.lightRed} type={show ? "text" : "password"} />
            <InputRightElement>
              <IconButton
                size="sm"
                aria-label="show hide password"
                icon={show ? <ViewOffIcon /> : <ViewIcon />}
                onClick={() => setShow(!show)}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </Stack>
      <Flex w="full" direction="column">
        <Button
          bgColor={theme.colors.darkRed}
          color={theme.colors.lightGray}
          _hover={{
            bgColor: theme.colors.lightRed,
          }}
          w="full"
        >
          Hesap Oluştur
            </Button>
        <Text fontSize="sm" mt={[1, 1, 2, 2]} textAlign="center">Hesabınız var mı? <Link href="/login"><ChakraLink fontWeight="bold" color={theme.colors.darkRed}>Giriş Yapın.</ChakraLink></Link></Text>
      </Flex>
    </FormLayout>
  );
}

export default SignupForm;