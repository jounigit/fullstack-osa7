import blogService from '../services/blogs'
import { INIT_BLOGS, LIKE_BLOG, CREATE_BLOG, DELETE_BLOG, NEW_MSG, ADD_COMMENT } from './actionTypes'


const blogReducer = (state = [], action) => {
  switch (action.type) {
  case INIT_BLOGS:
    return action.data
  case CREATE_BLOG:
    return [...state, action.data]
  case LIKE_BLOG:
    return state.map(b => b.id !== action.data.id ? b : action.data)
  case DELETE_BLOG:
    return state.filter(b => b.id !==action.id)
  case ADD_COMMENT:
    return state.map(b => b.id !== action.data.id ? b : action.data)
  default:
    return state
  }

}

export const initBlogs = () => async (dispatch) => {
  const blogs = await blogService.getAll()
  dispatch({
    type: INIT_BLOGS,
    data: blogs
  })
}

export const createBlog = (content) => async (dispatch) => {
  try {
    const data = await blogService.create(content)
    dispatch({
      type: CREATE_BLOG,
      data
    })
  } catch(error) {
    console.log('ERROR:: ', error.message)
    dispatch({
      type: NEW_MSG,
      content: error.message,
      style: 'error'
    })
  }
}

export const addComment = (id, commentObj) => async (dispatch) => {
  try {
    const data = await blogService.addComment(id, commentObj)
    console.log('Add comment:: ', data)
    dispatch({
      type: ADD_COMMENT,
      data
    })
  } catch(error) {
    console.log('ERROR:: ', error.message)
    dispatch({
      type: NEW_MSG,
      content: error.message,
      style: 'error'
    })
  }
}


export const deleteBlog = (id) => async (dispatch) => {
  try {
    await blogService.remove(id)
    dispatch({
      type: DELETE_BLOG,
      id
    })
  } catch(error) {
    dispatch({
      type: NEW_MSG,
      content: error.message,
      style: 'error'
    })
  }
}

export const like = (id) => async (dispatch) => {
  try {
    const blogs = await blogService.getAll()
    const blog = blogs.find(b => b.id === id)
    const toUpdate = { ...blog, likes: blog.likes+1 }
    await blogService.update(id, toUpdate)
    dispatch({
      type: LIKE_BLOG,
      data: toUpdate
    })
  } catch(error) {
    dispatch({
      type: NEW_MSG,
      content: error.message,
      style: 'error'
    })
  }
}

export default blogReducer

/*
export const createBlog = (content) => {
  return async (dispatch) => {
    try {
      const data = await blogService.create(content)
      dispatch(createBlogSuccess(data))
    } catch(e) {
      dispatch(createBlogError(e))
    }
  }
}

const createBlogSuccess = (data) => {
  return {
    type: 'CREATE_BLOG',
    data
  }
}

const createBlogError = (e) => {
  return {
    type: 'ERROR',
    e
  }
}
*/
