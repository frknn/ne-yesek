import { StarIcon, TimeIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Flex, TagLeftIcon, Link as ChakraLink, Heading, HStack, IconButton, Image, Text, Tag, WrapItem, useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Link from 'next/link';
import { useRouter } from 'next/router'
import { deleteRecipe } from '../../services/recipeService'
import useLocalStorageValue from '../../utils/hooks/useLocalStorageValue'

const RecipeCard = ({ w, recipe, onProfile, onOwnProfile }) => {

  const router = useRouter()
  const toast = useToast()

  const [ownRecipe, setOwnRecipe] = useState(false)

  useEffect(() => {
    const currentUser = useLocalStorageValue('currentUser')
    
    if (currentUser?.recipes.some(r => r._id === recipe._id)) {
      setOwnRecipe(true)
    } else {
      setOwnRecipe(false)
    }
  }, [])

  const handleFav = () => {

  }

  const handleDeleteRecipe = async (id) => {
    console.log('DELETE HADNLER RUN')
    const deletedRecipe = await deleteRecipe(id)

    console.log('DELETED RECIOE: ', deletedRecipe)

    if (deletedRecipe.success) {
      toast({
        description: 'Tarifiniz silindi!',
        isClosable: true
      })
      router.reload()
    } else {
      toast({
        description: 'Tarifi silerken bir hata oluştu, lütfen tekrar deneyin!',
        status: 'error',
        isClosable: true
      })
    }
  }

  return (
    <WrapItem
      w={w || ["85%", "80%", "45%", "30%"]}
      m={4}
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
          w="full"
          h="220px"
          objectFit="cover"
          src={recipe.coverPhoto}
          alt="recipe cover photo"
          transition="all 0.2s ease-in-out"
          _groupHover={{ transform: "scale(1.1)" }}
          onClick={() => router.push(`/recipe/${recipe._id}`).then(() => window.scrollTo(0, 0))}
        />

        <Box
          p={4}
          borderTopWidth="5px"
          borderTopColor="lightRed">

          <Flex
            justify="space-between"
            align="center"
          >
            <Heading
              fontSize={["3xl"]}
              onClick={() => router.push(`/recipe/${recipe._id}`).then(() => window.scrollTo(0, 0))}
            >{recipe.title}
            </Heading>
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
          <Text
            onClick={() => router.push(`/recipe/${recipe._id}`).then(() => window.scrollTo(0, 0))}
          >{recipe.description}</Text>

          <HStack spacing={1} mt={4} mb={8}>
            <Tag size="sm" bgColor="lightRed" color="lightGray">{recipe.amount} kişilik</Tag>
            <Tag size="sm" bgColor="lightRed" color="lightGray">{recipe.prepTime} hazırlama</Tag>
            <Tag size="sm" bgColor="lightRed" color="lightGray"><TagLeftIcon as={TimeIcon} />{recipe.cookTime}</Tag>
          </HStack>

          {!onProfile &&
            <HStack spacing={1}>
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
                  fontSize="xs"
                  color="darkRed"
                >
                  {recipe.owner.name + " " + recipe.owner.lastName}
                </ChakraLink>
              </Link>
            </HStack>
          }
          {
            (onOwnProfile && ownRecipe) &&
            <HStack w="full">
              <Button onClick={() => router.push(`/update/${recipe._id}`)} colorScheme="yellow">Güncelle</Button>
              <Button onClick={() => handleDeleteRecipe(recipe._id)} colorScheme="red">Sil</Button>
            </HStack>
          }
        </Box>
      </Box>
    </WrapItem>
  );
}

export default RecipeCard;