import axios from 'axios'

const authUrl = 'http://localhost:5000/api/v1/auth'

const register = async (name, lastName, email, password) => {
  try {
    const registerData = { name, lastName, email, password }
    const res = await axios.post(`${authUrl}/register`, registerData)
    return res.data

  } catch (err) {
    return err.response.data
  }
}

const login = async (email, password) => {
  try {
    const loginData = { email, password }
    const res = await axios.post(`${authUrl}/login`, loginData)
    return res.data

  } catch (err) {
    return err.response.data
  }
}

export default { register, login }