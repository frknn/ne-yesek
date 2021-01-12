import { Avatar, Box, Button, Flex, Link as ChakraLink, Heading, HStack, Img, Text, Tag, WrapItem, useToast } from "@chakra-ui/react";
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

  const handleDeleteRecipe = async (id) => {
    const deletedRecipe = await deleteRecipe(id)

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

        <Img
          w="full"
          h="220px"
          objectFit="cover"
          src={recipe.recipeCardPhoto}
          alt="recipe card photo"
          transition="all 0.25s ease-in-out"
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
              fontSize="3xl"
              onClick={() => router.push(`/recipe/${recipe._id}`).then(() => window.scrollTo(0, 0))}
            >{recipe.title}
            </Heading>
          </Flex>
          <Text
            mt={2}
            lineHeight="1.2"
            onClick={() => router.push(`/recipe/${recipe._id}`).then(() => window.scrollTo(0, 0))}
          >{recipe.description}</Text>

          <HStack spacing={1} mt={6} mb={8}>
            <Tag size="sm" bgColor="darkRed" color="lightGray">{recipe.amount} kişilik</Tag>
            <Tag size="sm" bgColor="darkRed" color="lightGray">{recipe.prepTime} dk. hazırlama</Tag>
            <Tag size="sm" bgColor="darkRed" color="lightGray">{recipe.cookTime} dk. pişme</Tag>
          </HStack>

          {!onProfile &&
            <HStack spacing={1}>
              <Avatar
                size="sm"
                src={recipe.owner.profilePictureSmall}
                borderColor="darkRed"
                showBorder={true}
                loading="lazy"
                alt="user profile picture"
              />
              <Link
              prefetch={false}
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
              <Button onClick={() => router.push(`/update/${recipe._id}`)} colorScheme="yellow" color="white">Güncelle</Button>
              <Button onClick={() => handleDeleteRecipe(recipe._id)} colorScheme="red">Sil</Button>
            </HStack>
          }
        </Box>
      </Box>
    </WrapItem>
  );
}

export default RecipeCard;