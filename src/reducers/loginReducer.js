import loginService from '../services/login'
import blogService from '../services/blogs'
import { LOGIN, LOGOUT, LOGGEDIN, NEW_MSG } from './actionTypes'

export const login = (username, password) => async (dispatch) => {
  try {
    const user = await loginService.login({
      username,
      password
    })

    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    blogService.setToken(user.token)

    dispatch({
      type: LOGIN,
      user
    })
  } catch(error) {
    console.log('ERROR:: ', error.message)
    dispatch({
      type: NEW_MSG,
      content: 'wrong username or password',
      style: 'error'
    })
  }
}

export const logout = () => (dispatch) => {
  window.localStorage.removeItem('loggedBlogAppUser')
  dispatch({
    type: LOGOUT
  })
}

export const loggedUser = (user) => async (dispatch) => {
  //console.log('LOGGEDUSER:: ', user)
  dispatch({
    type: LOGGEDIN,
    user
  })
}

const loginReducer = (state = null, action) => {
  switch (action.type) {
  case LOGIN:
    return action.user
  case LOGGEDIN:
    return action.user
  case LOGOUT:
    return null
  default:
    return state
  }
}

export default loginReducer
