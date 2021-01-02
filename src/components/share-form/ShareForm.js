import { ChevronDownIcon, ChevronUpIcon, CloseIcon, PlusSquareIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  NumberInput,
  NumberInputField,
  VStack,
  HStack,
  Select,
  Text,
  Textarea,
  InputGroup,
  InputRightElement,
  Button,
  IconButton,
  ScaleFade,
  OrderedList,
  ListItem,
  useToast
} from "@chakra-ui/react"
import { useState, useRef } from "react";
import { useRouter } from "next/router";
import ShareFormLayout from './subcomponents/ShareFormLayout'
import { createRecipe, uploadImage } from '../../services/recipeService'

const ShareForm = () => {

  const categories = [
    'kahvaltılık',
    'atıştırmalık',
    'aperatif',
    'meze',
    'başlangıç',
    'ara sıcak',
    'ana yemek',
    'tatlı',
    'ekmek arası',
    'soğuk içecek',
    'sıcak içecek'
  ]

  const fileInputEl = useRef()

  const [currentStep, setCurrentStep] = useState('')
  const [recipeSteps, setRecipeSteps] = useState([])
  const [category, setCategory] = useState(categories[0])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState(1)
  const [prepTime, setPrepTime] = useState(1)
  const [cookTime, setCookTime] = useState(1)
  const [ingredients, setIngredients] = useState('')
  const [coverPhoto, setCoverPhoto] = useState('')

  const [isImageLoading, setIsImageLoading] = useState(false)

  const router = useRouter()
  const toast = useToast()


  const handleMove = (direction, index) => {
    let tempArr = [...recipeSteps]
    let tempVal = tempArr[index]

    if (direction === 'up' && index !== 0) {
      tempArr[index] = tempArr[index - 1]
      tempArr[index - 1] = tempVal
      setRecipeSteps(tempArr)
    }
    else if (direction === 'down' && index !== recipeSteps.length - 1) {
      tempArr[index] = tempArr[index + 1]
      tempArr[index + 1] = tempVal
      setRecipeSteps(tempArr)
    }
  }

  const handleDeleteStep = (index) => {
    setRecipeSteps(recipeSteps.filter((recipe, idx) => idx !== index))
  }

  const handleAddStep = () => {
    if (currentStep) {
      setRecipeSteps(recipeSteps.concat(currentStep))
      setCurrentStep('')
    }
  }

  const handleImageUpload = async (e) => {

    const file = e.target.files[0]

    if (!file) {
      return
    }

    if (file.size > 1048576) {
      toast({
        description: "Resim boyutu 1MB'tan küçük olmalıdır!",
        isClosable: true,
        status: 'error'
      })
      return
    }

    setIsImageLoading(true)
    const data = await uploadImage(file)
    setIsImageLoading(false)
    console.log('DATA from uplaod service: ', data)
    setCoverPhoto(data.data.url)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!(coverPhoto && title && description && amount && prepTime && cookTime && ingredients && recipeSteps.length)) {
      toast({
        description: 'Lütfen tüm alanları doldurunuz!',
        isClosable: true,
        position: 'top-right',
        duration: 9000,
        status: 'error'
      })

      return

    } else {
      const recipeObject = {
        coverPhoto,
        title,
        description,
        amount,
        category,
        prepTime,
        cookTime,
        ingredients: ingredients.split(',').map(i => i.trim()),
        recipeSteps,
      }

      const data = await createRecipe(recipeObject)

      if (data.success) {
        toast({
          description: 'Tarifiniz paylaşıldı!',
          duration: 9000,
          isClosable: true,
          status: 'success'
        })
        router.push('/').then(() => window.scrollTo(0, 0))
      } else {
        toast({
          description: 'Bir hata meydana geldi, lütfen tekrar deneyin!',
          duration: 9000,
          isClosable: true,
          status: 'error',
          position: 'top-right'
        })
      }
    }
  }

  return (

    <ShareFormLayout handleSubmit={handleSubmit}>
      <Heading>Nefis bir tarif paylaşın!</Heading>
      <Input
        type="file"
        accept="image/*"
        display="none"
        ref={fileInputEl}
        onChange={handleImageUpload}
      />

      <FormControl id="title" isRequired>
        <FormLabel textAlign="center">Tarifiniz adı nedir?</FormLabel>
        <Input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Tarifinizin başlığını girin"
          focusBorderColor="lightRed"
          variant="flushed"
          textAlign="center"
          fontSize={["1.5rem", "2rem"]}
          fontWeight="semibold"
        />
      </FormControl>
      <Button
        variant="outline"
        leftIcon={<PlusSquareIcon w={5} h={5} />}
        isLoading={isImageLoading}
        loadingText="Yükleniyor..."
        onClick={() => fileInputEl.current.click()}
        borderColor="darkRed"
        color="darkRed"
        _hover={{ bgColor: 'darkRed', color: 'lightGray' }}
      >
        Tarifinizin Fotoğrafını Yükleyin
      </Button>
      {
        coverPhoto &&
        <Image
          objectFit="cover"
          borderRadius="xl"
          w="100%"
          h={["220px", "360px"]}
          src={coverPhoto}
          alt="uploaded recipe image"
        />
      }
      <FormControl id="description" isRequired>
        <FormLabel
          textAlign="center"
        >Tarifinizi bir cümleyle özetleyin.</FormLabel>
        <Input
          type="text"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Tanıtım cümlenizi girin"
          focusBorderColor="lightRed"
          variant="flushed"
          textAlign="center"
        />
      </FormControl>
      <HStack align="flex-end">
        <FormControl id="amount" isRequired>
          <FormLabel fontSize="sm" mx={0} color="darkRed" borderBottom="2px solid" borderBottomColor="darkRed"
            textAlign="center">Kaç kişilik?</FormLabel>
          <NumberInput
            min={1} max={999}
            size="lg"
            focusBorderColor="lightRed"
            defaultValue={amount}
            clampValueOnBlur={false}
          >
            <NumberInputField
              textAlign="center"
              onChange={e => setAmount(e.target.value)}
            />
          </NumberInput>
        </FormControl>
        <FormControl id="prepTime" isRequired>
          <FormLabel fontSize="sm" mx={0} color="darkRed" borderBottom="2px solid" borderBottomColor="darkRed"
            textAlign="center">Hazırlanma Süresi (dk.)</FormLabel>
          <NumberInput
            min={1} max={999}
            size="lg"
            focusBorderColor="lightRed"
            defaultValue={prepTime}
            clampValueOnBlur={false}
          >
            <NumberInputField
              textAlign="center"
              onChange={e => setPrepTime(e.target.value)}
            />
          </NumberInput>
        </FormControl>
        <FormControl id="cookTime" isRequired>
          <FormLabel fontSize="sm" mx={0} color="darkRed" borderBottom="2px solid" borderBottomColor="darkRed"
            textAlign="center">Pişme Süresi (dk.)</FormLabel>
          <NumberInput
            min={1} max={999}
            size="lg"
            focusBorderColor="lightRed"
            defaultValue={cookTime}
            clampValueOnBlur={false}
          >
            <NumberInputField
              textAlign="center"
              onChange={e => setCookTime(e.target.value)}
            />
          </NumberInput>
        </FormControl>
      </HStack>
      <FormControl isRequired>
        <FormLabel>Tarifin kategorisini seçiniz.</FormLabel>
        <Select value={category} onChange={e => setCategory(e.target.value)} focusBorderColor="lightRed">
          {
            categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))
          }
        </Select>
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Malzemelerinizi adediyle beraber, virgülle ayırarak giriniz.</FormLabel>
        <Textarea
          focusBorderColor="lightRed"
          placeholder="Örnek: 2 adet domates, 1 bardak su, yarım soğan"
          value={ingredients}
          onChange={e => setIngredients(e.target.value)}
        />
      </FormControl>
      <Heading>Tarif Adımları</Heading>
      <FormControl>
        <FormLabel>Tarifinizi adım adım anlatın.</FormLabel>
        <InputGroup>
          <Input
            value={currentStep}
            onChange={(e) => setCurrentStep(e.target.value)}
            focusBorderColor="lightRed"
            placeholder="Tarif adımını yazıp Ekle'ye basın"
          />
          <InputRightElement>
            <Button onClick={handleAddStep}
              _hover={{ bgColor: 'lightRed' }}
              bgColor="darkRed"
              color="lightGray"
              size="sm">Ekle</Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <OrderedList w="full" spacing={4}>
        {recipeSteps.map((recipeStep, idx) =>
        (
          <ScaleFade in>
            <ListItem
              textAlign="left"
              w="full"
            >
              <HStack w="full" justify="space-between">
                <Text maxW="70%">{recipeStep}</Text>
                <HStack>
                  <VStack>
                    <IconButton
                      size="xs"
                      colorScheme="yellow"
                      aria-label="adımı yukarı taşı"
                      icon={<ChevronUpIcon />}
                      onClick={() => handleMove('up', idx)}
                    />
                    <IconButton
                      size="xs"
                      colorScheme="yellow"
                      aria-label="adımı aşağı taşı"
                      icon={<ChevronDownIcon />}
                      onClick={() => handleMove('down', idx)}
                    />
                  </VStack>
                  <IconButton
                    size="xs"
                    colorScheme="red"
                    aria-label="adımı sil"
                    icon={<CloseIcon />}
                    onClick={() => handleDeleteStep(idx)}
                  />
                </HStack>
              </HStack>
            </ListItem>
          </ScaleFade>
        )
        )}
      </OrderedList>
      <Button
        type="submit"
        bgColor="lightRed"
        color="lightGray"
        w="full"
        size="lg"
        _hover={{ bgColor: 'darkRed' }}
      >Gönder</Button>
    </ShareFormLayout>

  );
}

export default ShareForm;