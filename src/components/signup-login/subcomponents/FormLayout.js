import { Center, useTheme, VStack } from '@chakra-ui/react'
const FormLayout = ({ children }) => {
  const theme = useTheme()
  return (
    <Center
      bgColor={theme.colors.darkGray}
      w="100vw"
      h="100vh"
    >
      <VStack
        w={["90%", "75%", "60%", "35%"]}
        bgColor="white"
        p={6}
        spacing={[5, 5, 7, 7]}
        rounded="lg"
        boxShadow="xl"
      >
        {children}
      </VStack>
    </Center>
  )
}

export default FormLayout;