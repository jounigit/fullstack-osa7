import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import users from './reducers/userReducer'
import blogs from './reducers/blogReducer'
import login from './reducers/loginReducer'
import notification from './reducers/notificationReducer'
import errors from './reducers/errorReducer'


const reducer = combineReducers({
  blogs,
  users,
  notification,
  user: login,
  errors
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

console.log(store.getState())

export default store
