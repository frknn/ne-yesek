import FormLayout from "./subcomponents/FormLayout";
import { Stack, Flex, Button, Heading, Text, Link as ChakraLink, FormControl, FormLabel, Input, InputGroup, InputRightElement, IconButton, useTheme } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Link from 'next/link';
import { useState } from "react";

const LoginForm = () => {
  const theme = useTheme()
  const [showPassword, setShowPassword] = useState(false)

  return (
    <FormLayout>
      <Heading>Giriş Yapın.</Heading>
        <Stack w="full">
          <FormControl id="email" isRequired>
            <FormLabel my={0}>Email</FormLabel>
            <Input placeholder="Email adresiniz" focusBorderColor={theme.colors.lightRed} type="email" />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel my={0}>Şifre</FormLabel>
            <InputGroup>
              <Input placeholder="Şifreniz" focusBorderColor={theme.colors.lightRed} type={showPassword ? "text" : "password"} />
              <InputRightElement>
                <IconButton
                  size="sm"
                  aria-label="show hide password"
                  icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  onClick={() => setShowPassword(!showPassword)}
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
          Giriş Yap
            </Button>
        <Text fontSize="sm" mt={[1, 1, 2, 2]} textAlign="center">Hesabınız yok mu? <Link href="/signup"><ChakraLink fontWeight="bold" color={theme.colors.darkRed}>Oluşturun.</ChakraLink></Link></Text>
      </Flex>
    </FormLayout>
  );
}

export default LoginForm;