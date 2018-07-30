const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')



blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 } )
  response.json(blogs.map(Blog.format))
})

blogsRouter.get('/:id', async (request, response) => {
  try {
    const blog = await Blog
      .findById(request.params.id)
      .populate('user', { username: 1, name: 1 } )

    if (blog) {
      return response.json(Blog.format(blog))
    } else {
      response.status(404).end()
    }

  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'malformatted id' })
  }
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    if (body.title === undefined && body.url === undefined) {
      return response.status(400).json({ error: 'title and url missing' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes,
      user: user._id
    })

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    const newSavedBlog = await Blog
      .findById(savedBlog._id)
      .populate('user', { username: 1, name: 1 } )

    return response.json(Blog.format(newSavedBlog))
  } catch (exception) {
    if (exception.name === 'JsonWebTokenError' ) {
      response.status(401).json({ error: exception.message })
    } else {
      console.log(exception)
      response.status(500).json({ error: 'something went wrong...' })
    }
  }
})

blogsRouter.put('/:id', async (request, response) => {
  try {
    const body = request.body

    const blog = await Blog
      .findByIdAndUpdate(request.params.id, { likes: body.likes })

    if (blog) {
      response.json(Blog.format(blog))
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'malformatted id' })
  }
})

const deleteBlog = async (id, response) => {
  try {
    await Blog.findByIdAndRemove(id)
    return response.status(204).end()
  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'malformatted id' })
  }
}/**/

blogsRouter.delete('/:id', async (request, response) => {
  try {
    const blog = await Blog.findById(request.params.id).populate('user', { username: 1 } )
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    console.log(blog.user)

    if ( decodedToken.id && blog.user === undefined ) {
      deleteBlog(request.params.id, response)
    }

    if (blog.user.username !== decodedToken.username) {
      return response.status(403).json({ error: 'permission denied or token missing or invalid' })
    }

    deleteBlog(request.params.id, response)
  } catch (exception) {
    if (exception.name === 'JsonWebTokenError' ) {
      response.status(401).json({ error: exception.message })
    }
  }
})

module.exports = blogsRouter
