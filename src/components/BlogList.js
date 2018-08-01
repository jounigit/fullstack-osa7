import React from 'react'
import Blog from './components/Blog'

const BlogList = ({ blogs, toggleLike }) => (
  <div>
    {blogs.sort( (a,b) => b.likes - a.likes ).map(blog =>
      <Blog key={blog.id}
        title={blog.title}
        author={blog.author}
        url={blog.url}
        likes={blog.likes}
        name={blog.user === undefined ? 'anonymous' : blog.user['name']}
        toggleLike={toggleLike(blog.id)}
      /> ) }
  </div>
)

export default BlogList
