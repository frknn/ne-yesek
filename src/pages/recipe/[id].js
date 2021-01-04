import Head from 'next/head';
import Recipe from "../../components/recipe-page/Recipe";
import Header from '../../components/header/Header'
import axios from "axios";

const recipe = ({ data }) => {

  return (
    <>
      <Head>
        <title>NeYesek | {data.data.title}</title>
        <meta name="description" content={`${data.data.title} tarifi`} />
        <meta name="keywords" content={`yemek, tarif, yemek tarifleri, ${data.data.title}`} />
      </Head>
      <Header />
      <Recipe recipe={data.data} />
    </>
  );
}


export async function getServerSideProps(context) {

  const URL = `http://localhost:5000/api/v1/recipes/${context.params.id}`

  const data = await axios.get(URL, {
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return {
    props: { data: data.data }
  }
}

export default recipe;
