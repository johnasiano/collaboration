import { post, get } from "./request.service"

export const getProductAll = () => {
  return get('/api/product/all')
}

export const updateProduct = (product) => {
  return post('/api/product/update', product)
}

export const getUserProducts = () => {
  return get('/api/product/inventory')
}

export const getProductInventory = (productId) => {
  return get(`/api/product/product-inventory/${productId}`);
}

export const create = async( data ) => {
  try {
    const result =  await post('/api/product/create', data);
    return result;
  } catch (error) {
    console.log('error', error);
    throw error
  }
}

export const add = async( data ) => {
  try {
    const result =  await post('/api/product/add', data);
    return result;
  } catch (error) {
    console.log('error', error);
    throw error
  }
}

export const stockin = ({ id, cost, qty_to_add, purchase_date }) => {
  return post('/api/product/stockin', { id, cost, qty_to_add, purchase_date })
}

export const stockout = ({ id, qty_to_remove }) => {
  return post('/api/product/stockout', { id, qty_to_remove })
}

export const getStockIn = (userId) => {
  return get(`/api/product/get-stockin/${userId}`);
}

export const getStockOut = (userId) => {
  return get(`/api/product/get-stockout/${userId}`);
}

export const suggestion = (value) => {
  return get(`/api/product/suggestion?suggestion=${value}`)
}