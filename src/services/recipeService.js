import axios from 'axios'

const URL = `http://localhost:5000/api/v1/recipes`

export const getRecipesByTitle = async (title) => {
  try {
    const response = await axios.get(`${URL}?title=${title}`)
    return response.data
  } catch (error) {
    return error.response.data
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
    const token = JSON.parse(localStorage.getItem('accessToken'))

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

export const uploadImage = async (image) => {
  try {
    console.log('SERVICE FUNCTION STARTED')
     const url = "https://api.cloudinary.com/v1_1/dgxfhzjli/upload";

    const formData = new FormData()
    formData.append('file', image)
    formData.append('upload_preset', 'ml_default')
    
    const response = await axios.post(url, formData)
    console.log('SERVICE FUNCTION ENDED: ', response)

    return response

  } catch (error) {
    return error
  }
}