import Head from 'next/head';
import axios from "axios";
import { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import ShareForm from '../../components/share-form/ShareForm'
import useLocalStorageValue from "../../utils/hooks/useLocalStorageValue";

const update = ({ recipe }) => {
  const [renderPage, setRenderPage] = useState(false)
  const toast = useToast()
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

  const URL = `http://localhost:5000/api/v1/recipes/${context.params.id}`

  const data = await axios.get(URL, {
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return {
    props: { recipe: data.data.data }
  }
}

export default update;
