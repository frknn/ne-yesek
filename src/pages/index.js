import { Heading } from "@chakra-ui/react"
import Header from "../components/header/Header"
import RecipeCardList from "../components/recipe-card-list/RecipeCardList"
import { getAllRecipes } from '../services/recipeService'

const Index = (props) => (
  <>
    <Header />
    <RecipeCardList
      recipes={props.data}
      mx="auto"
      my={24}
      w={["100%", "80%"]}
      spacing={0}
    />
  </>
)

export async function getServerSideProps() {

  const data = await getAllRecipes()
  return {
    props: {
      data: data.data
    }
  }

}

export default Index
