import { Box, Flex, Heading, Image, VStack, Tabs, TabList, TabPanels, Tab, TabPanel, Text } from "@chakra-ui/react";
import RecipeCardList from '../recipe-card-list/RecipeCardList'

const User = () => {

  const user = {
    profilePicture: "https://cdn.pixabay.com/photo/2019/08/01/05/59/girl-4376755_960_720.jpg",
    role: "user",
    favoriteRecipes: [
      {
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
    ],
    name: "Furkan",
    lastName: "Setbaşı",
    email: "frkn123@gmail.com",
    recipes: [
      {
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
    ]
  }

  return (
    <Flex my={24}
      direction="column"
    >
      <Flex
        direction="column"
        mx="auto"
        w={["90%", "75%", "60%"]}
        p={[4, 8]}
      >
        <VStack spacing={4}>
          <Box
            borderWidth="0.5rem"
            borderColor="darkRed"
            borderRadius="full"
          >
            <Image
              src={user.profilePicture}
              alt="user profile picture"
              borderRadius="full"
              boxSize={["150px", "175px", "200px", "225px"]}
            />
          </Box>
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
              />
            </TabPanel>
            <TabPanel p={0}>
              bruh
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>

    </Flex>
  );
}

export default User;
