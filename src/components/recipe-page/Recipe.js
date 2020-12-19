import { Container, Avatar, Link as ChakraLink, Heading, HStack, IconButton, Image, Tag, TagLabel, Text, VStack, UnorderedList, ListItem, ListIcon, OrderedList, Divider } from "@chakra-ui/react";
import Link from 'next/link';
import { StarIcon, CheckIcon } from '@chakra-ui/icons'
import { useState } from "react";

const Recipe = ({recipe}) => {

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
  //   ingredients: ['asfas', 'asfasf', 'asfasf', 'asfasf', 'asfasf', 'asfsagad'],
  //   recipeSteps: ['ajshasld', 'asfjahsşlfhasf', 'askfjbasfjkshalf', 'asklfaslkfas'],
  //   owner: {
  //     name: 'Owner Name',
  //     profilePicture: "https://cdn.pixabay.com/photo/2019/08/01/05/59/girl-4376755_960_720.jpg"
  //   },
  //   fav: false,
  // }

  const [recipeState, setRecipeState] = useState(recipe)

  return (
    <Container my={24} maxW={["100%", "90%", "70%"]} centerContent>
      <VStack>
        <Heading as="h1" fontSize={["4xl", "5xl", "6xl"]}>
          {recipe.title}
        </Heading>
        <Text>{recipe.description}</Text>

        <HStack p="0.5rem" w="full" justify={["space-between"]}>

          <HStack spacing={2}>
            <Avatar
              size="sm"
              src="https://cdn.pixabay.com/photo/2019/08/01/05/59/girl-4376755_960_720.jpg"
              borderWidth="3px"
              borderColor="darkRed"
            />
            <Link scroll={true}
              href={`/user/${recipe.owner._id}`}>
              <ChakraLink
                fontWeight="semibold"
                fontSize={["xs", "sm", "md"]}
                color="darkRed"
              >
                {recipe.owner.name + " " + recipe.owner.lastName}
              </ChakraLink>
            </Link>
          </HStack>

          <HStack>
            <Tag size="md"
              bgColor="darkRed"
              color="lightGray">
              <TagLabel>{recipe.category}</TagLabel>
            </Tag>
            <IconButton
              bgColor="white"
              _hover={{ bgColor: "lightGray" }}
              _focus={{ boxShadow: "none" }}
              aria-label="favorilere ekle"
              size="md"
              onClick={handleFav}
              icon={
                <StarIcon
                  color={recipeState.fav ?
                    "darkRed" :
                    "gray.400"}
                  _hover={{ color: "lightRed" }}
                />
              } />
          </HStack>

        </HStack>

        <Image w="full" borderRadius="xl" src={recipe.coverPhoto} alt={recipe.imgAlt} />

        <HStack
          spacing={1}
          pt={4} w="full"
          justify="space-evenly"
          fontSize={["sm", "lg", "xl", "2xl"]}
        >
          <VStack >
            <Text w="full"
              textAlign="center"
              borderBottomColor="lightRed"
              borderBottomWidth="2px"
              fontWeight="bold"
              color="lightRed"
            >Kaç kişilik?
            </Text>
            <Text>{recipe.amount}</Text>
          </VStack>
          <VStack>
            <Text w="full"
              textAlign="center"
              borderBottomColor="lightRed"
              borderBottomWidth="2px"
              fontWeight="bold"
              color="lightRed">Hazırlanma Süresi</Text>
            <Text>{recipe.prepTime}</Text>
          </VStack>
          <VStack>
            <Text w="full"
              textAlign="center"
              borderBottomColor="lightRed"
              borderBottomWidth="2px"
              fontWeight="bold"
              color="lightRed"
            >Pişme Süresi
            </Text>
            <Text>{recipe.cookTime}</Text>
          </VStack>
        </HStack>

        <Divider py={4} />

        <Heading as="h3"
          textAlign="center"
          w="full"
          pt={4}
          size="lg"
          color="darkRed"
        >
          Malzemeler
          </Heading>
        <UnorderedList
          spacing={3}
          w="full"
          p={8}
          borderColor="darkRed"
          borderWidth="2px"
          borderStyle="dashed"
          listStyleType="none"
          listStylePos="inside">
          {recipe.ingredients.map(ingredient => (
            <ListItem>
              <ListIcon as={CheckIcon} color="darkRed" />
              {ingredient}
            </ListItem>
          ))}
        </UnorderedList>

        <Divider py={4} />

        <Heading as="h3"
          textAlign="center"
          w="full"
          pt={4}
          size="lg"
          color="darkRed"
        >
          Adımlar
          </Heading>
        <OrderedList w="full" px={8} spacing={4}>
          {recipe.recipeSteps.map(recipeStep => (
            <ListItem>{recipeStep}</ListItem>
          ))}
        </OrderedList>
      </VStack>
    </Container>

  );
}

export default Recipe;