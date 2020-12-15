import { Box, Center, VStack } from '@chakra-ui/react'

const FormLayout = ({ onSubmit, children }) => {

  return (
    <Center
      bgColor="darkGray"
      w="100vw"
      h="100vh"
    >
      <Box w={["90%", "75%", "60%", "40%"]} mt={12}>
        <form onSubmit={onSubmit}>
          <VStack
            bgColor="white"
            p={6}
            spacing={[5, 5, 7, 7]}
            rounded="lg"
            boxShadow="xl"
          >
            {children}
          </VStack>
        </form>
      </Box>
    </Center>
  )
}

export default FormLayout;