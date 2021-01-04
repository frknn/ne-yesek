import axios from 'axios'
import useLocalStorageValue from '../utils/hooks/useLocalStorageValue'

const URL = 'http://localhost:5000/api/v1/users'

export const updateUser = async (data, id) => {
  try {
    const token = useLocalStorageValue('accessToken')

    const response = await axios.put(`${URL}/${id}`, data, {
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.log('ERROR!:', error)
    return error.response.data
  }
}
