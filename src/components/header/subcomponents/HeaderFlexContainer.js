import { Flex } from "@chakra-ui/react";

const HeaderFlexContainer = ({ children }) => {
  return (
    <Flex
      w="80%"
      h="100%"
      mx="auto"
      justify="space-between"
      align="center"
    >
      {children}
    </Flex>
  );
}

export default HeaderFlexContainer;