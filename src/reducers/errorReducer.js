import { ADD_ERROR, CLEAR_ERROR } from './actionTypes'

const initState = {
  message: null
}

const errorReducer = (state = initState, action) => {
  switch (action.type) {
  case ADD_ERROR:
    return state = { message: action.message }
  case CLEAR_ERROR:
    return state = initState
  default:
    return state
  }
}

export const errorMessage = (message, time) => (dispatch) => {
  dispatch({
    type: ADD_ERROR,
    message
  })
  setTimeout(() => {
    dispatch({
      type: CLEAR_ERROR
    })
  }, (time * 1000))
}

export default errorReducer
