import { useState, useEffect } from 'react'
import { Box, Flex, Heading, Input, Text } from "@chakra-ui/react";
import RecipeCardList from '../recipe-card-list/RecipeCardList'
import CloseButton from '../close-button/CloseButton'
import { getRecipesByTitle } from '../../services/recipeService'
import useDebounce from '../../utils/hooks/useDebounce';
import LoadingSpinner from '../loading-spinner/LoadingSpinner';

const Search = () => {

  console.log('SEARCH COMPONENT RE-RENDERING')

  const [searchString, setSearchString] = useState('')
  const [recipes, setRecipes] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  /* debounce search string for given delay ms to prevent
    calling API rapidly */
  const debouncedTerm = useDebounce(searchString, 750)

  useEffect(() => {
    if (debouncedTerm) {
      setIsSearching(true)
      setRecipes([])
      getRecipesByTitle(debouncedTerm)
        .then(recipes => {
          setIsSearching(false)
          setRecipes(recipes)
        })
    } else {
      setRecipes([])
    }
  }, [debouncedTerm])

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
          onChange={e => setSearchString(e.target.value)}
          placeholder="Tarif adı..."
          focusBorderColor="darkRed"
          fontSize={["2rem", "2.25rem", "2.5rem", "3rem"]}
          fontWeight="semibold"
          w="full"
          h={[12, 16, 20]}
          variant="flushed"
          autoFocus
        />
        {
          isSearching
          &&
          <LoadingSpinner />
        }
        {
          recipes.length ?
            <>
              <Heading color="lightRed" mt={12} textAlign="center" size="3xl">Tarifler</Heading>
              <RecipeCardList
                my={4}
                w="full"
                recipes={recipes} />
            </> : null
        }
      </Box>
    </Flex>
  );
}

export default Search;