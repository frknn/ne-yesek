import { StarIcon, TimeIcon } from "@chakra-ui/icons";
import { Avatar, Box, Flex, TagLeftIcon, Link as ChakraLink, Heading, HStack, IconButton, Image, Text, useTheme, Tag, TagLabel, WrapItem, VStack } from "@chakra-ui/react";
import { useState } from "react";
import Link from 'next/link';
import { useRouter } from 'next/router'

const RecipeCard = (props) => {

  const router = useRouter()

  const { w, recipe } = props

  const handleFav = () => {
    const newRecipe = { ...recipe, fav: !recipeState.fav }
    setRecipeState(newRecipe)
  }

  // const recipe = {
  //   imgUrl: "../../../pancake.jpg",
  //   imgAlt: "bruh",
  //   title: "Recipe Title",
  //   desc: "Lorem ipsum dolor sit amet consectetur.",
  //   category: "category1",
  //   prepTime: "15 dk.",
  //   cookTime: "20 dk.",
  //   amount: "4",
  //   owner: {
  //     name: 'Owner Name',
  //     profilePicture: "https://cdn.pixabay.com/photo/2019/08/01/05/59/girl-4376755_960_720.jpg"
  //   },
  //   fav: false,
  // }

  //const [recipeState, setRecipeState] = useState(recipe)


  return (
    <WrapItem
      w={w || ["85%", "80%", "45%", "30%"]}
      m={4}
      onClick={() => router.push(`/recipe/${recipe._id}`)}
    >
      <Box
        role="group"
        w="full"
        borderRadius="xl"
        boxShadow="2xl"
        bgColor="lightGray"
        _hover={{ cursor: "pointer" }}
        overflow="hidden">

        <Image
          src={recipe.coverPhoto}
          alt={"recipe cover photo"}
          transition="all 0.2s ease-in-out"
          _groupHover={{ transform: "scale(1.1)" }}
        />

        <Box
          p={4}
          borderTopWidth="5px"
          borderTopColor="lightRed">

          <Flex
            justify="space-between"
            align="center"
          >
            <Heading fontSize={["3xl"]}>{recipe.title}</Heading>
            <IconButton
              bgColor="lightGray"
              _hover={{ bgColor: "lightGray" }}
              _focus={{ boxShadow: "none" }}
              aria-label="favorilere ekle"
              size="md"
              onClick={handleFav}
              icon={
                <StarIcon
                  color={recipe ?
                    "darkRed" :
                    "gray.400"}
                  _hover={{ color: "lightRed" }}
                />
              } />
          </Flex>
          <Text>{recipe.description}</Text>

          <HStack spacing={1} mt={4} mb={8}>
            <Tag size="sm" bgColor="lightRed" color="lightGray">{recipe.amount} kişilik</Tag>
            <Tag size="sm" bgColor="lightRed" color="lightGray">{recipe.prepTime} hazırlama</Tag>
            <Tag size="sm" bgColor="lightRed" color="lightGray"><TagLeftIcon as={TimeIcon} />{recipe.cookTime}</Tag>
          </HStack>

          {!props.onProfile &&
            <HStack spacing={1}>
              <Avatar
                size="sm"
                src="https://cdn.pixabay.com/photo/2019/08/01/05/59/girl-4376755_960_720.jpg"
                borderWidth="2px"
                borderColor="darkRed"
              />
              <Link
                href={`/user/${recipe.owner._id}`}>
                <ChakraLink
                  fontWeight="semibold"
                  fontSize="xs"
                  color="darkRed"
                >
                  {recipe.owner.name + " " + recipe.owner.lastName}
                </ChakraLink>
              </Link>
            </HStack>}
        </Box>
      </Box>
    </WrapItem>
  );
}

export default RecipeCard;