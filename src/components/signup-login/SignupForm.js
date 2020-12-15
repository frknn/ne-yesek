import Link from 'next/link';
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  IconButton,
  Flex,
  Stack,
  HStack,
  InputGroup,
  InputRightElement,
  Heading,
  Link as ChakraLink,
  Text,
  useBreakpointValue,
  useToast
} from "@chakra-ui/react"
import { useState } from "react";
import FormLayout from './subcomponents/FormLayout';
import { useRouter } from 'next/router';
import authService from '../../services/authService';

const SignupForm = () => {

  const emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  const [show, setShow] = useState(false)
  const inline = useBreakpointValue({
    base: false, md: true
  })

  const toast = useToast()
  const router = useRouter()

  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false)
  const [isEmailInvalid, setIsEmailInvalid] = useState(false)

  const validateFields = (email, password) => {
    if (password.length < 6) {
      setIsPasswordInvalid(true)
      return
    }
    if (!emailRegexp.test(email)) {
      setIsEmailInvalid(true)
      return
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    validateFields(email, password)

    const response = await authService.register(name, lastName, email, password)

    if (response.success) {
      toast({
        description: 'Hesabınız başarıyla oluşturuldu, giriş yapabilirsiniz!',
        status: 'success',
        isClosable: true
      })
      router.push('/login')

    } else {
      if (response.error === 'Duplicate field value entered!') {
        toast({
          description: 'Bu email adresi kullanımda!',
          status: 'error',
          duration: 9000,
          isClosable: true
        })
      }
    }
  }

  return (
    <FormLayout onSubmit={handleSignup}>
      <Heading>Hesap Oluşturun.</Heading>
      <HStack w="full">
        <FormControl id="first-name" isRequired>
          <FormLabel my={0}>Ad</FormLabel>
          <Input onChange={(e) => setName(e.target.value)} placeholder="Adınız" focusBorderColor="lightRed" type="text" />
        </FormControl>
        <FormControl id="last-name" isRequired>
          <FormLabel my={0}>Soyad</FormLabel>
          <Input onChange={(e) => setLastName(e.target.value)} placeholder="Soyadınız" focusBorderColor="lightRed" type="text" />
        </FormControl>
      </HStack>
      <Stack w="full" direction={["column", "column", "row"]}>
        <FormControl id="email" isRequired isInvalid={isEmailInvalid}>
          <FormLabel my={0}>Email</FormLabel>
          <Input onChange={(e) => setEmail(e.target.value)} placeholder="Email adresiniz" focusBorderColor="lightRed" type="email" />
          {isEmailInvalid &&
            <FormErrorMessage>
              Lütfen geçerli bir email adresi giriniz!
            </FormErrorMessage>
          }
        </FormControl>
        <FormControl id="password" isRequired isInvalid={isPasswordInvalid}>
          <FormLabel my={0}>Şifre</FormLabel>
          <InputGroup>
            <Input onChange={(e) => setPassword(e.target.value)} placeholder="Şifreniz" focusBorderColor="lightRed" type={show ? "text" : "password"} />
            <InputRightElement>
              <IconButton
                size="sm"
                aria-label="show hide password"
                icon={show ? <ViewOffIcon /> : <ViewIcon />}
                onClick={() => setShow(!show)}
              />
            </InputRightElement>
          </InputGroup>
          {isPasswordInvalid &&
            <FormErrorMessage>
              Şifreniz 5 karakterden uzun olmalıdır!
            </FormErrorMessage>
          }
        </FormControl>
      </Stack>
      <Flex w="full" direction="column">
        <Button
          type="submit"
          bgColor="darkRed"
          color="lightGray"
          _hover={{
            bgColor: "lightRed"
          }}
          w="full"
        >
          Hesap Oluştur
            </Button>
        <Text fontSize="sm" mt={[1, 1, 2, 2]} textAlign="center">Hesabınız var mı? <Link href="/login"><ChakraLink fontWeight="bold" color="darkRed">Giriş Yapın.</ChakraLink></Link></Text>
      </Flex>
    </FormLayout>
  );
}

export default SignupForm;