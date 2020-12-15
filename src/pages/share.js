import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import ShareForm from "../components/share-form/ShareForm";

const share = () => {

  const router = useRouter()
  const toast = useToast()
  const [fakeUser, setFakeUser] = useState('fakeUser')
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (localStorage.getItem('currentUser')) setUser(localStorage.getItem('currentUser'))
    else {
      toast({
        description: 'Tarif paylaşabilmek için giriş yapmalısınız!',
        status: 'error',
        isClosable: true
      })
      router.push('login')
    }
  }, [])
  if (!user) return null
  else return <div>Hello {user}! <br /><ShareForm /></div>
}

export default share;