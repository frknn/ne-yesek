import Head from 'next/head';
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import ShareForm from "../components/share-form/ShareForm";
import useLocalStorageValue from "../utils/hooks/useLocalStorageValue";

const share = () => {
  const [renderPage, setRenderPage] = useState(false)
  const toast = useToast()
  const router = useRouter()

  useEffect(() => {
    const accessToken = useLocalStorageValue('accessToken')
    if (accessToken) {
      setRenderPage(true)
    } else {
      toast({
        description: 'Tarif paylaşabilmek için giriş yapın!',
        isClosable: true,
        status: 'error',
        duration: 9000
      })
      router.push('/login')
    }
  }, [])

  return renderPage ? <>
    <Head>
      <title>NeYesek | Tarif Paylaş</title>
      <meta name="description" content="Yemek Tarifleri Paylaş" />
      <meta name="keywords" content="yemek, tarif, yemek tarifleri, yemek tarifi paylaş" />
    </Head>
    <ShareForm />
  </> : null
}

export default share;