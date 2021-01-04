import { useState, useEffect } from "react";
import { Container, Avatar, Link as ChakraLink, Heading, HStack, IconButton, Image, Tag, TagLabel, Text, VStack, UnorderedList, ListItem, ListIcon, OrderedList, Divider } from "@chakra-ui/react";
import { StarIcon, CheckIcon } from '@chakra-ui/icons'
import Link from 'next/link';
import useLocalStorageValue from '../../utils/hooks/useLocalStorageValue'

const Recipe = ({ recipe }) => {

  const [favorited, setFavorited] = useState(false)

  const handleFav = () => {
    setFavorited(prevState => !prevState)

  }

  useEffect(() => {
    const currentUser = useLocalStorageValue('currentUser')
    let isFavorited = currentUser.recipesSaved.some(r => r._id === recipe._id)
    if (isFavorited) setFavorited(true)
  }, [])

  return (
    <Container my={24} maxW={["100%", "90%", "70%"]} centerContent>
      <VStack w="full">
        <Heading as="h1" fontSize={["4xl", "5xl", "6xl"]}>
          {recipe.title}
        </Heading>
        <Text>{recipe.description}</Text>

        <HStack p="0.5rem" w="full" justify={["space-between"]}>

          <HStack spacing={2}>
            <Avatar
              size="sm"
              src={recipe.owner.profilePicture}
              borderColor="darkRed"
              showBorder={true}
              loading="lazy"
              alt="user profile picture"
            />
            <Link
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
                  color={favorited ?
                    "darkRed" :
                    "gray.400"}
                  _hover={{ color: "lightRed" }}
                />
              } />
          </HStack>

        </HStack>

        <Image w="full" maxH="80vh" objectFit="cover" borderRadius="xl" src={recipe.coverPhoto} alt={recipe.title} />

        <HStack
          spacing={1}
          pt={4} w="full"
          justify="space-evenly"
          fontSize={["sm", "lg", "xl", "2xl"]}
        >
          <VStack >
            <Text w="full"
              textAlign="center"
              borderBottomWidth="2px"
              fontWeight="bold"
              color="darkRed"
              borderBottomColor="darkRed"
            >
              Kaç kişilik?</Text>
            <Text>{recipe.amount}</Text>
          </VStack>
          <VStack>
            <Text w="full"
              textAlign="center"
              borderBottomWidth="2px"
              fontWeight="bold"
              borderBottomColor="darkRed"
              color="darkRed">
              Hazırlanma Süresi</Text>
            <Text>{recipe.prepTime}</Text>
          </VStack>
          <VStack>
            <Text w="full"
              textAlign="center"
              borderBottomColor="darkRed"
              borderBottomWidth="2px"
              fontWeight="bold"
              color="darkRed"
            >Pişme Süresi</Text>
            <Text>{recipe.cookTime}</Text>
          </VStack>
        </HStack>

        <Divider py={4} />

        <Heading as="h2"
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
            <ListItem key={ingredient}>
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
            <ListItem key={recipeStep}>{recipeStep}</ListItem>
          ))}
        </OrderedList>
      </VStack>
    </Container>

  );
}

export default Recipe;