import { PlusSquareIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, Image, VStack, Tabs, TabList, TabPanels, Tab, TabPanel, Text, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import RecipeCardList from '../recipe-card-list/RecipeCardList'
import UploadButton from '../upload-button/UploadButton'
import { uploadImage } from '../../services/recipeService'
import { updateUser } from '../../services/userService'

const User = ({ user }) => {

  const toast = useToast()
  const router = useRouter()

  const [onOwnProfile, setOnOwnProfile] = useState(false)
  const [isImageLoading, setIsImageLoading] = useState(false)
  const [userProfilePicture, setUserProfilePicture] = useState('')

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]

    if (!file) {
      return
    }
    if (file.size > 1048576) {
      toast({
        description: "Resim boyutu 1MB'tan küçük olmalıdır!",
        isClosable: true,
        status: 'error'
      })
      return
    }

    const allowedFileTypes = ['image/png', 'image/jpg', 'image/jpeg']
    if (!allowedFileTypes.includes(file.type)) {
      toast({
        description: 'Sadece JPG, JPEG ve PNG türünde dosya yükleyebilirsiniz!',
        status: 'error',
        isClosable: true
      })
      return
    }

    setIsImageLoading(true)

    const imageData = await uploadImage(file)

    if (imageData.status === 200) {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'))

      const userData = await updateUser({
        profilePicture: imageData.data.url
      }, currentUser.id)

      if (userData.success) {
        toast({
          description: 'Profil fotoğrafınız başarıyla güncellendi!',
          status: 'success',
          isClosable: true
        })
        setUserProfilePicture(imageData.data.url)
      } else {
        toast({
          description: 'Bir hata oluştu, lütfen tekrar deneyin!',
          status: 'error',
          isClosable: true
        })
      }
    }
    setIsImageLoading(false)
  }

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    const userIdRouteParam = router.query.id

    if (currentUser && (currentUser.id === userIdRouteParam)) {
      setOnOwnProfile(true)
    }
  }, [])

  return (
    <Flex my={24}
      direction="column"
    >
      <Flex
        direction="column"
        mx="auto"
        w={["90%", "80%", "70%"]}
        p={[4, 8]}
      >
        <VStack spacing={4}>
          <Box
            borderWidth="0.5rem"
            borderColor="darkRed"
            borderRadius="full"
          >
            <Image
              objectFit="cover"
              src={userProfilePicture || user.profilePicture}
              alt="user profile picture"
              borderRadius="full"
              boxSize={["150px", "175px", "200px", "225px"]}
            />
          </Box>

          {
            onOwnProfile
            &&
            <UploadButton
              text="Profil Fotoğrafı Yükle"
              icon={<PlusSquareIcon boxSize={5} />}
              isImageLoading={isImageLoading}
              handleImageUpload={handleImageUpload}
            />
          }

          <Heading
            color="darkRed"
          >
            {user.name + ' ' + user.lastName}
          </Heading>
        </VStack>
        <Tabs my={8} isFitted colorScheme="red">
          <TabList>
            <Tab>
              <Text>Paylaşılan Tarifler</Text>
            </Tab>
            <Tab>
              <Text>Favori Tarifler</Text>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel p={0}>
              <RecipeCardList
                mx="auto"
                my={4}
                w="100%"
                cardWidth={["100%", "100%", "100%", "43%"]}
                recipes={user.recipes}
                onProfile={true}
              />
            </TabPanel>
            <TabPanel p={0}>
              <RecipeCardList
                mx="auto"
                my={4}
                w="100%"
                cardWidth={["100%", "100%", "100%", "43%"]}
                recipes={user.recipesSaved}
                onProfile={true}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>

    </Flex>
  );
}

export default User;
