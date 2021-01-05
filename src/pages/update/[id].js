import Head from 'next/head';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ShareForm from '../../components/share-form/ShareForm'
import useLocalStorageValue from "../../utils/hooks/useLocalStorageValue";
import { getRecipeById } from '../../services/recipeService';

const update = ({ recipe }) => {
  const [renderPage, setRenderPage] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const currentUser = useLocalStorageValue('currentUser')
    if (currentUser && (currentUser._id === recipe.owner.id)) {
      setRenderPage(true)
    } else {
      router.push('/')
    }
  }, [])

  return (
    renderPage ? <>
      <Head>
        <title>NeYesek | Güncelle</title>
        <meta name="description" content="Yemek Tarifi güncelle" />
      </Head>
      <ShareForm recipeToBeUpdated={recipe} />
    </> : null
  );
}

export async function getServerSideProps(context) {

  const data = await getRecipeById(context.params.id)

  return {
    props: { recipe: data.data }
  }
}

export default update;
