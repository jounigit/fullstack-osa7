import blogService from '../services/blogs'

const blogReducer = (store = [], action) => {

  if (action.type === 'INIT') {
    return action.data
  }

  return store
}

export const blogsInit = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT',
      data: blogs
    })
  }
}

export default blogReducer
