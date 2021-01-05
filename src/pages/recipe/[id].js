import Head from 'next/head';
import Recipe from "../../components/recipe-page/Recipe";
import Header from '../../components/header/Header'
import { getRecipeById } from '../../services/recipeService';

const recipe = ({ data }) => {

  return (
    <>
      <Head>
        <title>NeYesek | {data.title}</title>
        <meta name="description" content={`${data.title} tarifi`} />
        <meta name="keywords" content={`yemek, tarif, yemek tarifleri, ${data.title}`} />
      </Head>
      <Header />
      <Recipe recipe={data} />
    </>
  );
}


export async function getServerSideProps(context) {

  const data = await getRecipeById(context.params.id)
  return {
    props: { data: data.data }
  }
}

export default recipe;
