import * as request from "./request.service"

export const setOptions = (data) => {
  return request.post('/api/admin/storeoption', data)
}

export const getOptions = (key) => {
  return request.get(`/api/storeoption/${key}`)
}

export const searchDealItems = (search) => {
  return request.get(`/api/admin/dealoftheweek/search?search=${search}`)
}

export const searchSealedItems = (search) => {
  return request.get(`/api/admin/freepack/search?search=${search}`)
}

export const getOrderLists = () => {
  return request.get('/api/admin/order')
} 

export const setOrderStatus = (data) => {
  return request.post('/api/admin/updateOrderStatus', data)
}

export const searchOrderLists = (search) => {
  return request.get(`/api/admin/order/search?search=${search}`)
}

export const uploadShippingPromoCodes = (data) => {
  return request.post('/api/admin/uploadNewPromo', data)
}

export const getShippingPromo = () => {
  return request.get('/api/admin/getNewPromo')
}

export const uploadDatePromoCodes = (data) => {
  return request.post('/api/admin/uploadNewPromo', data)
}

export const getDatePromo = () => {
  return request.get('/api/admin/getNewPromo')
}

export const uploadPromoCodes = (data) => {
  return request.post('/api/admin/uploadPromo', data)
}

export const getPromo = () => {
  return request.get('/api/admin/getPromo')
}

export const getCreditList = () => {
  return request.get('/api/admin/getAllCredit')
}

export const updateCredit = (data) => {
  return request.post('/api/admin/updateCredit', data)
}

export const getUserList = () => {
  return request.get('/api/admin/getAllUsers')
}

export const searchUserList = (userName) => {
  return request.get(`/api/admin/searchUserList?user=${userName}`)
}

export const getEditUser = (id) => {
  return request.get(`/api/admin/getEditUser?id=${id}`)
}

export const updateUser = (data) => {
  return request.post('/api/admin/updateUser', data)
}

export const deleteUser = (id) => {
  return request.get(`/api/admin/deleteUser?id=${id}`)
}

export const getAllAdminUsers = () => {
  return request.get('/api/admin/getAllAdminUsers')
}

export const addAdminUser = (data) => {
  return request.post('/api/admin/addAdminUser', data)
}
export const getAdminUser = (id) => {
  return request.get(`/api/admin/getAdminUser?id=${id}`)
}

export const deleteAdminUser = (id) => {
  return request.get(`/api/admin/deleteAdminUser?id=${id}`)
}

export const updateAdminUser = (data) => {
  return request.post('/api/admin/updateAdminUser', data)
}

export const downloadCSV = () => {
  return request.get('/api/admin/downloadCSV')
}

export const uploadImages = (name, formData) => {
  return request.post(`/api/upload?name=${name}`, formData)
}

export const uploadPDF = (name, formData) => {
  return request.post(`/api/upload/pdf?name=${name}`, formData)
}
