import axios from 'axios'
import { store } from 'store'
import { baseURL } from 'utils/constants'

export const get = async (url) => {
  try {
    const state = store.getState();
    
    const headers = {
      Authorization: state.auth.accessToken
    }
    return await axios.get(`${baseURL}${url}`, { headers }).then(res => res.data)
  } catch (error) {
    console.log('error', error);
    throw error
  }
}

export const post = async (url, body) => {
  try {
    const state = store.getState();

    const headers = {
      Authorization: state.auth.accessToken
    }
    return await axios.post(`${baseURL}${url}`, body, { headers }).then(res => res.data)
  } catch (error) {
    
    throw error
  }
}