import { NEW_MSG, HIDE_MSG } from './actionTypes'
const msgAtStart = 'Message form chef'

const initialState = {
  content: msgAtStart,
  style: '',
  visibility: false
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case NEW_MSG:
    return state = { content: action.content, style: action.style, visibility: true }
  case HIDE_MSG:
    return state = initialState
  default:
    return state
  }
}

export const notify = (content, time, style) => (dispatch) => {
  dispatch({
    type: NEW_MSG,
    content,
    style
  })
  setTimeout(() => {
    dispatch({
      type: HIDE_MSG
    })
  }, (time * 1000))
}

export default notificationReducer
