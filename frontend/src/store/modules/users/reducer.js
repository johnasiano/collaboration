import { SET_USERS, UPDATE_USER } from './types'

const initialState = {
  users: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.payload
      }
    case UPDATE_USER:
      let update = state.users.map(element=>{
        if (element.id === action.payload.id) {
          element = action.payload;
        }
        return element;
      })
      return {
        ...state,
        users: update
      }
    default:
      return state
  }
}
