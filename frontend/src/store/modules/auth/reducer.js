import { SUCCESS_LOGIN, UPDATE_ACCOUNT, LOGOUT } from './types'
import { storageTokenKey, storageUserKey } from "utils/constants"

const initialState = {
  user: false,
  accessToken: false,
  isAdmin: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SUCCESS_LOGIN:
      localStorage.setItem(storageUserKey, JSON.stringify(action.payload));
      return {
        ...state,
        ...action.payload
      }
    case UPDATE_ACCOUNT:
      console.log('updae account', action.payload);
      const update = {
        ...state,
        user: {
          ...state.user,
          ...action.payload
        }
      }
      localStorage.setItem(storageUserKey, JSON.stringify(update));
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload
        }
      }
    case LOGOUT:
      localStorage.removeItem(storageUserKey);
      localStorage.clear();
      return {
        ...initialState
      }
    default:
      return state
  }
}
