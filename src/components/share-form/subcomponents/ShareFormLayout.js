import { Box, VStack } from '@chakra-ui/react'

const ShareFormLayout = ({ children }) => {
  return (
    <Box
      bgColor="white"
      w={["100%", "100%", "80%", "60%"]}
      boxShadow="2xl"
      borderRadius="3xl"
      borderWidth="3px"
      borderColor={["white", "white", "white"]}
      m={["0 auto", "2rem auto"]}
      p={[8, 8, 12, 16]}
    >
      <VStack
        w="90%"
        spacing={12}
        textAlign="center"
        mx="auto"
      >
        {children}
      </VStack>
    </Box>
  );
}

export default ShareFormLayout;