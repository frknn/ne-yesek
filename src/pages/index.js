import Header from "../components/header/Header"
import RecipeCardList from "../components/recipe-card-list/RecipeCardList"

const Index = ({data}) => (
  <>
    <Header />
    <RecipeCardList
      recipes = {data}
      mx="auto"
      my={24}
      w={["100%", "80%"]}
      spacing={0}
    />
  </>
)

export async function getServerSideProps(context){

  const res = await fetch('http://localhost:5000/api/v1/recipes')
  const data = await res.json()

  return {
    props: { data: data.data }
  }
}

export default Index
