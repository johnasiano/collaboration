import { SET_CATEGORY, SET_PRODUCTS, UPDATE_PRODUCT, ADD_PRODUCT } from './types'

export const setCategory = (category) => dispatch => {
    dispatch({
      type: SET_CATEGORY,
      payload: category
    });
}

export const setProducts = (products) => dispatch => {
  dispatch({
    type: SET_PRODUCTS,
    payload: products
  });
}

export const updateProduct = (product) => dispatch => {
  dispatch({
    type: UPDATE_PRODUCT,
    payload: product
  });
}

export const addProduct = (product) => dispatch => {
  dispatch({
    type: ADD_PRODUCT,
    payload: product
  });
}