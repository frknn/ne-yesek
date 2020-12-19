import {  useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import ShareForm from "../components/share-form/ShareForm";

const share = () => {
  const [renderPage, setRenderPage] = useState(false)
  const toast = useToast()
  const router = useRouter()

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
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

  return renderPage ? <ShareForm /> : null
}

export default share;