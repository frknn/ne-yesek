import { ChevronDownIcon, ChevronUpIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Flex,
  Heading,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  VStack,
  HStack,
  Select,
  Text,
  Textarea,
  InputGroup,
  InputRightElement,
  Wrap,
  Button,
  Tag,
  TagLabel,
  IconButton,
  Spacer,
  ScaleFade,
  OrderedList,
  ListItem,
  useToast
} from "@chakra-ui/react"
import { useState } from "react";
import { useRouter } from "next/router";
import ShareFormLayout from './subcomponents/ShareFormLayout'

const ShareForm = () => {

  const [currentStep, setCurrentStep] = useState('')
  const [recipeSteps, setRecipeSteps] = useState([])
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

  return (
    <ShareFormLayout>
      <Heading >Nefis bir tarif paylaşın!</Heading>
      <FormControl id="title" isRequired>
        <FormLabel textAlign="center">Tarifiniz adı nedir?</FormLabel>
        <Input
          type="text"
          placeholder="Tarifinizin başlığını girin"
          focusBorderColor="lightRed"
          variant="flushed"
          textAlign="center"
          fontSize={["1.5rem", "2rem"]}
          fontWeight="semibold"
        />
      </FormControl>
      <FormControl id="description" isRequired>
        <FormLabel
          textAlign="center"
        >Tarifinizi bir cümleyle özetleyin.</FormLabel>
        <Input
          type="text"
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
          >
            <NumberInputField
              textAlign="center"
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
          >
            <NumberInputField
              textAlign="center"
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
          >
            <NumberInputField
              textAlign="center"
            />
          </NumberInput>
        </FormControl>
      </HStack>
      <FormControl isRequired>
        <FormLabel>Tarifin kategorisini seçiniz.</FormLabel>
        <Select placeholder="..." focusBorderColor="lightRed">
          <option value="kahvaltılık">kahvaltılık</option>
          <option value="atıştırmalık">atıştırmalık</option>
          <option value="soğuk içecek">soğuk içecek</option>
        </Select>
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Malzemelerinizi adediyle beraber, virgülle ayırarak giriniz.</FormLabel>
        <Textarea focusBorderColor="lightRed" placeholder="Örnek: 2 adet domates, 1 bardak su, yarım soğan" />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Tarifinizi adım adım anlatın.</FormLabel>
        <InputGroup>
          <Input
            value={currentStep}
            onChange={(e) => setCurrentStep(e.target.value)}
            focusBorderColor="lightRed"
            placeholder="Tarif adımını yazıp Ekle'ye basın"
          />
          <InputRightElement>
            <Button onClick={() => {
              setRecipeSteps(recipeSteps.concat(currentStep))
            }}
              _hover={{ bgColor: 'lightRed' }}
              bgColor="darkRed"
              color="lightGray"
              size="sm">Ekle</Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <OrderedList w="full" spacing={4}>
        <Heading>Tarif Adımları</Heading>
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