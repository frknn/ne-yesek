import { Box, Flex, FormControl, FormLabel, Heading, Input, Tag, TagCloseButton, TagLabel, Text, useBreakpointValue, VStack, Wrap, WrapItem, Select, Button, useToast } from "@chakra-ui/react";
import { useState, useRef } from "react";
import { getRecipesByQueryString } from "../../services/recipeService";
import CloseButton from "../close-button/CloseButton";
import RecipeCardList from "../recipe-card-list/RecipeCardList"

const Filter = () => {

  const categories = [
    'kahvaltılık',
    'atıştırmalık',
    'aperatif',
    'meze',
    'başlangıç',
    'ara sıcak',
    'ana yemek',
    'tatlı',
    'ekmek arası',
    'soğuk içecek',
    'sıcak içecek'
  ]

  const [ingredient, setIngredient] = useState('')
  const [ingredients, setIngredients] = useState([])
  const [category, setCategory] = useState(categories[0])
  const [prepTime, setPrepTime] = useState('')
  const [cookTime, setCookTime] = useState('')
  const [recipes, setRecipes] = useState([])

  const tagSize = useBreakpointValue(["md", "lg"])
  const toast = useToast()

  const recipesBoxRef = useRef()

  const handleKeyPress = (e) => {
    if (
      e.key === 'Enter' &&
      ingredient &&
      ingredients.length < 15 &&
      !ingredients.includes(ingredient)
    ) {
      setIngredients(ingredients.concat(ingredient))
      setIngredient('')
    }
  }

  const removeIngredient = (i) => {
    setIngredients(ingredients.filter(ingredient => i !== ingredient))
  }

  const handleFilter = async () => {
    const prepTimeQuery = `${prepTime ? `prepTime=${prepTime}&` : ''}`
    const cookTimeQuery = `${cookTime ? `cookTime=${cookTime}&` : ''}`
    const categoryQuery = `${category ? `category=${category}&` : ''}`
    const ingredientsQuery = `${ingredients.length ? `ingredients=${ingredients.join(',')}` : ''}`

    let queryString = prepTimeQuery + cookTimeQuery + categoryQuery + ingredientsQuery
    // Son karakter & ise sil
    if (queryString[queryString.length - 1] === '&') {
      queryString = queryString.slice(0, -1)
    }
    
    const response = await getRecipesByQueryString(queryString)
    if (response.success) {
      setRecipes(response.data)
      let description;
      let status;
      if (response.data.length) {
        description = `${response.data.length} tarif bulundu!`
        status = 'success'

        window.scrollTo({
          top: recipesBoxRef.current.getBoundingClientRect().top,
          behavior: 'smooth'
        })
      } else {
        description = 'Böyle bir tarif bulunamadı!'
        status = 'error'
      }
      toast({
        description,
        status,
        isClosable: true,
        position: 'top-right'
      })
    } else {
      toast({
        description: 'Bir hata oluştu, lütfen sonra tekrar deneyin!',
        isClosable: true,
        status: 'error',
        position: 'top-right'
      })
    }
  }

  return (
    <Box w="80%" mx="auto">
      <Box my={12}>
        <CloseButton mb={[4]} />
        <VStack spacing={4} align="start">
          <Box w="full">
            <Text
              fontSize={["sm", "lg"]}
              lineHeight="1.4"
            >Tarifte olmasını istediğiniz malzemeleri tek tek girin. (En fazla 15 tane)</Text>
            <Input
              type="text"
              fontWeight="700"
              focusBorderColor="darkRed"
              placeholder="Malzemeyi yazıp Enter'a basın."
              variant="flushed"
              size="lg"
              value={ingredient}
              onChange={e => setIngredient(e.target.value)}
              onKeyDown={handleKeyPress}
            />
          </Box>
          <Wrap spacing={2}>
            {
              ingredients.map(i => (
                <WrapItem
                  key={i}>
                  <Tag
                    size={tagSize}
                    borderRadius="full"
                    colorScheme="green"
                  >
                    <TagLabel>{i}</TagLabel>
                    <TagCloseButton onClick={() => removeIngredient(i)} />
                  </Tag>
                </WrapItem>
              )
              )
            }
          </Wrap>
        </VStack>
        <VStack mt={8} spacing={[4, 8]} align="center" justify="center" w="full">

          <Flex w="full" align="center" justify="center">
            <Text fontSize={["sm", "md", "xl"]}>Kategorisi</Text>
            <Select
              value={category}
              onChange={e => setCategory(e.target.value)}
              w={["60%", "40%"]}
              textAlign="center"
              color="darkRed"
              variant="flushed"
              fontSize={["1rem", "1.25rem", "2rem"]}
              fontWeight="700"
              height={["2rem", "2.75rem"]}
              mx={[2, 4]}
              borderColor="darkRed"
              focusBorderColor="darkRed"
            >

              {
                categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))
              }
            </Select>
            <Text fontSize={["sm", "md", "xl"]}>olsun.</Text>
          </Flex>

          <Flex w="full" align="center" justify="center">
            <Text fontSize={["sm", "md", "xl"]}>Hazırlaması en fazla</Text>
            <Input
              value={prepTime}
              onChange={e => setPrepTime(e.target.value)}
              textAlign="center"
              w={["12%", "10%"]}
              color="darkRed"
              variant="flushed"
              fontSize={["1rem", "1.5rem", "2rem"]}
              fontWeight="700"
              height={["2rem", "2.75rem"]}
              mx={[2, 4]}
              borderColor="darkRed"
              focusBorderColor="darkRed"
            />
            <Text fontSize={["sm", "md", "xl"]}> dakika sürsün.</Text>
          </Flex>

          <Flex w="full" align="center" justify="center">
            <Text fontSize={["sm", "md", "xl"]}>Pişirmesi en fazla</Text>
            <Input
              value={cookTime}
              onChange={e => setCookTime(e.target.value)}
              textAlign="center"
              w={["12%", "10%"]}
              color="darkRed"
              variant="flushed"
              fontSize={["1rem", "1.5rem", "2rem"]}
              fontWeight="700"
              height={["2rem", "2.75rem"]}
              mx={[2, 4]}
              borderColor="darkRed"
              focusBorderColor="darkRed"
            />
            <Text fontSize={["sm", "md", "xl"]}>dakika sürsün.</Text>
          </Flex>
        </VStack>
        <Button
          onClick={handleFilter}
          display="block"
          mt={16}
          mx="auto"
          color="lightGray"
          bgColor="darkRed"
          _hover={{ bgColor: "lightRed" }}
          w={["100%", "80%", "60%"]}
        >Ara</Button>
      </Box>
      {
        recipes.length ?
          <Box ref={recipesBoxRef}>
            <Heading color="lightRed" mt={12} textAlign="center" size="3xl">Tarifler</Heading>
            <RecipeCardList
              my={4}
              w="full"
              recipes={recipes} />
          </Box> : null
      }
    </Box>
  );
}

export default Filter;