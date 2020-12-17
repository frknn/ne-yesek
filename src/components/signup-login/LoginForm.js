import FormLayout from "./subcomponents/FormLayout";
import { Stack, Flex, Button, Heading, Text, Link as ChakraLink, FormControl, FormLabel, Input, InputGroup, InputRightElement, IconButton } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useRouter } from 'next/router'
import { useToast } from "@chakra-ui/react"
import { useState } from "react";
import Link from 'next/link';
import authService from '../../services/authService';

const LoginForm = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const toast = useToast()

  const handleLogin = async (e) => {
    e.preventDefault()
    const res = await authService.login(email, password)

    if (res.success) {

      const currentUserStr = JSON.stringify(res.user)
      const accessTokenStr = JSON.stringify(res.token)

      localStorage.setItem('currentUser', currentUserStr)
      localStorage.setItem('accessToken', accessTokenStr)

      toast({
        title: `Hoşgeldin, ${res.user.name}!`,
        status: "success",
        duration: 5000,
        isClosable: true,
      })
      router.push('/')
    } else {
      toast({
        title: 'Kullanıcı adı veya şifre yanlış!',
        status: "error",
        duration: 9000,
        isClosable: true,
      })
    }
  }

  return (
    <FormLayout onSubmit={handleLogin}>
      <Heading>Giriş Yapın.</Heading>
      <Stack w="full">
        <FormControl id="email" isRequired>
          <FormLabel my={0}>Email</FormLabel>
          <Input onChange={(e) => setEmail(e.target.value)} placeholder="Email adresiniz" focusBorderColor="lightRed" type="email" />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel my={0}>Şifre</FormLabel>
          <InputGroup>
            <Input onChange={(e) => setPassword(e.target.value)} placeholder="Şifreniz" focusBorderColor="lightRed" type={showPassword ? "text" : "password"} />
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
          type="submit"
          bgColor="darkRed"
          color="lightGray"
          _hover={{
            bgColor: "lightRed",
          }}
          w="full"
        >
          Giriş Yap
            </Button>
        <Text fontSize="sm" mt={[1, 1, 2, 2]} textAlign="center">Hesabınız yok mu? <Link href="/signup"><ChakraLink fontWeight="bold" color="darkRed">Oluşturun.</ChakraLink></Link></Text>
      </Flex>
    </FormLayout>
  );
}

export default LoginForm;