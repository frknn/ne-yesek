import { useState } from 'react'
import { Box, Flex, FormLabel, Input, Text } from "@chakra-ui/react";
import RecipeCardList from '../recipe-card-list/RecipeCardList'
import CloseButton from '../close-button/CloseButton'
import axios from 'axios';

const Search = () => {

  const [searchString, setSearchString] = useState('')
  const [recipes, setRecipes] = useState([])

  const onSearchKeyPress = (e) => {
    setSearchString(e.target.value)
    axios.get(`http://localhost:5000/api/v1/recipes?title=${searchString}`)
      .then(res => setRecipes(res.data.data))
  }

  return (
    <Flex
      w="full"
      h="100vh"
      direction="column"
      align="center"
    >
      <Box w="80%" mt={8}>
        <CloseButton />
        <Text
          fontWeight="semibold"
          fontSize={[".875rem", "1rem", "1.125rem", "1.25rem"]}
        >
          Tarif aramak için yazmaya başlayın.
        </Text>

        <Input
          value={searchString}
          onChange={onSearchKeyPress}
          placeholder="Tarif adı..."
          focusBorderColor="darkRed"
          fontSize={["2rem", "2.25rem", "2.5rem", "3rem"]}
          fontWeight="semibold"
          w="full"
          h={[12, 16, 20]}
          variant="flushed"
          autoFocus
        />

        <RecipeCardList recipes={recipes} />
      </Box>
    </Flex>
  );
}

export default Search;