import usersService from '../services/users'

const userReducer = (store = [], action) => {

  if (action.type === 'INIT') {
    return action.data
  }

  return store
}

export const userInit = () => {
  return async (dispatch) => {
    const users = await usersService.getAll()
    dispatch({
      type: 'INIT',
      data: users
    })
  }
}

export default userReducer
