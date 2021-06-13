import { SUCCESS_LOGIN, UPDATE_ACCOUNT, LOGOUT } from './types'

export const login = (credential) => dispatch => {
    dispatch({
      type: SUCCESS_LOGIN,
      payload: credential
    });
}

export const updateAccount = (account) => dispatch => {
    dispatch({
      type: UPDATE_ACCOUNT,
      payload: account
    })
}

export const logout = () => dispatch => {
    dispatch({
      type: LOGOUT
    })
}
