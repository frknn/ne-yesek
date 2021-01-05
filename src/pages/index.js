import Head from 'next/head'
import Header from "../components/header/Header"
import RecipeCardList from "../components/recipe-card-list/RecipeCardList"
import { getAllRecipes } from '../services/recipeService'

const Index = ({ data }) => (
  <>
    <Head>
      <title>NeYesek | Ana Sayfa</title>
      <meta name="description" content="Yemek Tarifleri" />
      <meta name="keywords" content="yemek, tarif, yemek tarifleri" />
    </Head>
    <Header />
    <RecipeCardList
      recipes={data}
      mx="auto"
      my={24}
      w={["100%", "80%"]}
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
