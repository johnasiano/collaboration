import { post, get } from "./request.service"
import { store } from 'store'

export const getNotify = () => {
  return get(`/api/notification/get`);
}

export const updateNotify = async( data ) => {
  try {
    const result =  await post('/api/notification/update', data);
    return result;
  } catch (error) {
    console.log('error', error);
    throw error
  }
}