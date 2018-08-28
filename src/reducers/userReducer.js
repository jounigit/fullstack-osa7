import usersService from '../services/users'
import { INIT_USERS } from './actionTypes'

const userReducer = (state = [], action) => {

  if (action.type === INIT_USERS) {
    return action.data
  }

  return state
}

export const initUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getAll()
    dispatch({
      type: INIT_USERS,
      data: users
    })
  }
}

export default userReducer
