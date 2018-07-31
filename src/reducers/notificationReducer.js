const msgAtStart = 'Message form chef'

const initialState = {
  content: msgAtStart,
  style: '',
  visibility: false
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'NEW_MSG':
    console.log('NOTIF REDUCER:: ', action.content)
    return state = { content: action.content, style: action.style, visibility: true }
  case 'HIDE_MSG':
    return state = initialState
  default:
    return state
  }
}

export const notify = (content, time, style) => (dispatch) => {
  console.log('SHOWMSG:: ', content, ' STYLE:: ', style)
  dispatch({
    type: 'NEW_MSG',
    content,
    style
  })
  setTimeout(() => {
    console.log(time, ' SEC ')
    dispatch({
      type: 'HIDE_MSG'
    })
  }, (time * 1000))
}

export default notificationReducer
