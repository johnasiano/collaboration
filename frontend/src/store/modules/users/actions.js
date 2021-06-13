import { SET_USERS, UPDATE_USER } from './types'

export const setUsers = (users) => dispatch => {
    dispatch({
      type: SET_USERS,
      payload: users
    });
}

export const updateUser = (user) => dispatch => {
  dispatch({
    type: UPDATE_USER,
    payload: user
  });
}