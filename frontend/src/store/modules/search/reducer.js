import { SET_CATEGORY, SET_PRODUCTS, UPDATE_PRODUCT, ADD_PRODUCT } from './types'

const initialState = {
  category: [],
  products: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORY:
      return {
        ...state,
        category: action.payload
      }
    case SET_PRODUCTS:
      return {
        ...state,
        products: action.payload
      }
    case UPDATE_PRODUCT:
      let update = state.products.map(element=>{
        if (element.id == action.payload.id) {
          element = action.payload;
        }
        return element;
      })
      return {
        ...state,
        products: update
      }
    case ADD_PRODUCT:
      let addProducts = state.products;
      addProducts.push(action.payload);
      return {
        ...state,
        products: addProducts
      }
    default:
      return state
  }
}
