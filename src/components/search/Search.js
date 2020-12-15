import { Box, Flex, FormLabel, Input, Text } from "@chakra-ui/react";
import RecipeCardList from '../recipe-card-list/RecipeCardList'

const Search = () => {
  return (
    <Flex
      w="full"
      h="100vh"
      direction="column"
      align="center"
    >
      <Box w="80%" mt={20}>
        <Text
          fontWeight="bold"
          fontSize={[".875rem", "1rem", "1.125rem", "1.25rem"]}
        >
          Tarif aramak için yazmaya başlayın.
        </Text>

        <Input
          mt={4}
          placeholder="Tarif adı..."
          focusBorderColor="lightRed"
          size="lg"
          fontSize={["2rem", "2.5rem", "3rem", "3.5rem"]}
          w="full"
          h={[12, 16, 20]}
          variant="flushed"
        />

        <RecipeCardList
          my={8}
          w="100%"
          cardWidth={["100%", "60%", "40%", "29%"]}
        />
      </Box>
    </Flex>
  );
}

export default Search;