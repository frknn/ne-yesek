import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useState, useEffect } from "react";
import ShareForm from "../components/share-form/ShareForm";
import { CurrentUserContext } from "../context/currentUserContext";

const share = () => {

  const router = useRouter()
  const toast = useToast()
  const [renderPage, setRenderPage] = useState(false)
  const userContext = useContext(CurrentUserContext)

  useEffect(() => {
    if (userContext.currentUserInfo) {
      setRenderPage(true)
    } else {
      toast({
        description: 'Tarif paylaşabilmek için giriş yapmalısınız!',
        status: 'error',
        isClosable: true
      })
      router.push('login')
    }
  }, [])


  return renderPage ? <ShareForm /> : null
}

export default share;