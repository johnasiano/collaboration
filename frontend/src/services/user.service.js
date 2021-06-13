import { post, get } from "./request.service"
import { store } from 'store'


export const getUsers = () => {
  return get('/api/users/');
}

export const updateUser = ({ id, email, name}) => {
  return post(`/api/users/update`, { id, email, name});
}

export const deleteUser = (userId) => {
  return get(`/api/users/delete/${userId}`);
}