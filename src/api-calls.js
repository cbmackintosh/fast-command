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

export const getAllContacts = (userID) => {
  return axios.get(`${baseURL}/contacts?user_id=${userID}`)
  .then(response => {
    return response.data
  })
}

export const createNewContact = (contact) => {
  return axios.post(`${baseURL}/contacts`, {contact})
  .then(response => {
    return response.data
  })
  .catch(error => console.log('api errors:', error))
}

export const createNewIncident = (incident) => {
  return axios.post(`${baseURL}/incidents`, {incident})
  .then(response => {
    return response.data
  })
  .catch(error => console.log('api errors:', error))
}