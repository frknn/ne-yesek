import axios from 'axios'

const URL = `http://localhost:5000/api/v1/recipes`

export const getRecipesByTitle = async (title) => {
  const response = await axios.get(`${URL}?title=${title}`)
  return response.data.data
}