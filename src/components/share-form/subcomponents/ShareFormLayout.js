import { Box, VStack } from '@chakra-ui/react'
import CloseButton from '../../close-button/CloseButton'

const ShareFormLayout = ({ children, handleSubmit }) => {
  return (
    <Box
      w={["100%", "100%", "80%", "60%"]}
      boxShadow="2xl"
      borderRadius="3xl"
      borderWidth="3px"
      borderColor={["white", "white", "white"]}
      m={["0 auto", "0rem auto", "1rem auto"]}
      p={[4, 8, 12]}
    >
      <form onSubmit={handleSubmit}>
      <CloseButton />
      <VStack
        w="90%"
        spacing={12}
        textAlign="center"
        mx="auto"
      >
        {children}
      </VStack>
      </form>
    </Box>
  );
}

export default ShareFormLayout;