import axios from 'axios'
import useLocalStorageValue from '../utils/hooks/useLocalStorageValue'

const URL = `https://ne-yesek-api.herokuapp.com/api/v1/recipes`

export const getRecipesByQueryString = async (queryString) => {
  try {
    const response = await axios.get(`${URL}?${queryString}`)
    return response.data
  } catch (error) {
    return error.response.data
  }
}

export const getRecipeById = async (id) => {
  try {
    const response = await axios.get(`${URL}/${id}`)
    return response.data
  } catch (error) {
    error.response.data
  }
}

export const getAllRecipes = async () => {
  try {
    const response = await axios.get(URL)
    return response.data
  } catch (error) {
    return error.response.data
  }

}

export const createRecipe = async (recipeObject) => {
  try {
    const token = useLocalStorageValue('accessToken')

    const response = await axios.post(URL, recipeObject, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
    return response.data

  } catch (error) {
    return error.response.data
  }
}

export const updateRecipe = async (recipeObject, id) => {
  try {
    const token = useLocalStorageValue('accessToken')

    const response = await axios.put(`${URL}/${id}`, recipeObject, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
    return response.data

  } catch (error) {
    error.response.data
  }
}

export const deleteRecipe = async (id) => {
  try {
    const token = useLocalStorageValue('accessToken')
    const response = await axios.delete(`${URL}/${id}`, {
      headers: { 'Authorization': 'Bearer ' + token }
    })
    return response.data
  } catch (error) {
    return error.response.data
  }
}

export const uploadImage = async (image) => {
  try {
    const url = "https://api.cloudinary.com/v1_1/dgxfhzjli/upload";

    const formData = new FormData()
    formData.append('file', image)
    formData.append('upload_preset', 'ml_default')

    const response = await axios.post(url, formData)

    return response

  } catch (error) {
    return error
  }
}