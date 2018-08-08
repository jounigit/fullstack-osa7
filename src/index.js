import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { initUsers } from './reducers/userReducer'
import { initBlogs } from './reducers/blogReducer'
import App from './App'
import store from './store'
import './index.css'


store.dispatch(initUsers())
store.dispatch(initBlogs())

console.log(store.getState())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'))

/*
<Provider store={store}>
//    <div> </div>
  <App />
</Provider>
*/
