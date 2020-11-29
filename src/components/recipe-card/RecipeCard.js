import { StarIcon, TimeIcon } from "@chakra-ui/icons";
import { Avatar, Box, Flex, TagLeftIcon, Link as ChakraLink, Heading, HStack, IconButton, Image, Text, useTheme, Tag, TagLabel } from "@chakra-ui/react";
import { useState } from "react";
import Link from 'next/link';

const RecipeCard = () => {

  const theme = useTheme()

  const handleFav = () => {
    const newRecipe = { ...recipe, fav: !recipeState.fav }
    console.log("new recipe fav:", newRecipe.fav)
    setRecipeState(newRecipe)
    console.log("state recipe fav:", recipeState.fav)
  }

  const recipe = {
    imgUrl: "../../../pancake.jpg",
    imgAlt: "bruh",
    title: "Recipe Title",
    desc: "Lorem ipsum dolor sit amet consectetur.",
    category: "category1",
    prepTime: "15 dk.",
    cookTime: "20 dk.",
    amount: "4",
    owner: {
      name: 'Owner Name',
      profilePicture: "https://cdn.pixabay.com/photo/2019/08/01/05/59/girl-4376755_960_720.jpg"
    },
    fav: false,
  }

  const [recipeState, setRecipeState] = useState(recipe)


  return (
    <Box
      mt={32}
      mx={4}
      w="xs"
      borderRadius="xl"
      borderWidth="1px"
      borderColor={theme.colors.darkRed}
      overflow="hidden">

      <Image
        src={recipeState.imgUrl}
        alt={recipeState.imgAlt} />

      <Box
        p={4}>
        <Flex
          justify="space-between"
          align="center"
        >
          <Heading>{recipeState.title}</Heading>
          <IconButton
            bgColor="white"
            _hover={{ bgColor: "white" }}
            _focus={{ boxShadow: "none" }}
            aria-label="favorilere ekle"
            size="lg"
            onClick={handleFav}
            icon={
              <StarIcon
                color={recipeState.fav ?
                  theme.colors.darkRed :
                  "gray.400"}
                _hover={{ color: theme.colors.lightRed }}
              />
            } />
        </Flex>
        <Text>{recipeState.desc}</Text>
        <HStack spacing={1} my={4}>
          <Tag size="sm" bgColor={theme.colors.lightRed}>{recipe.amount} kişilik</Tag>
          <Tag size="sm" bgColor={theme.colors.lightRed}>{recipe.prepTime} hazırlama</Tag>
          <Tag size="sm" bgColor={theme.colors.lightRed}><TagLeftIcon as={TimeIcon} />{recipe.cookTime}</Tag>
        </HStack>
        <HStack spacing={1}>
          <Avatar
            size="sm"
            src={recipe.owner.profilePicture}
            borderWidth="2px"
            borderColor={theme.colors.lightRed}
          />
          <Link
            href="/bruh">
            <ChakraLink
              fontWeight="bold"
              fontSize="xs"
            >
              {recipe.owner.name}
            </ChakraLink>
          </Link>
        </HStack>
      </Box>
    </Box>
  );
}

export default RecipeCard;