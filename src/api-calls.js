import axios from 'axios'

const baseURL = `http://localhost:3005`

export const checkLoginStatus = () => {
  return axios.get(`${baseURL}/logged_in`, {withCredentials: true})
  .then(response => {
    return response.data
  })
}

export const logoutUser = () => {
  return axios.delete(`${baseURL}/logout`, {withCredentials: true})
  .then(response => {
    return response.data
  })
}

export const loginUser = (user) => {
  return axios.post(`${baseURL}/login`, {user}, {withCredentials: true})
  .then(response => {
    return response.data
  })
  .catch(error => console.log('api errors:', error))
}

export const signupUser = (user) => {
  return axios.post(`${baseURL}/users`, {user}, {withCredentials: true})
  .then(response => {
    return response.data
  })
  .catch(error => console.log('api errors:', error))
}

export const createNewContact = (contact) => {
  return axios.post(`${baseURL}/contacts`, {contact})
  .then(response => {
    return response.data
  })
  .catch(error => console.log('api errors:', error))
}