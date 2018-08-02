import React from 'react'
import { Redirect } from 'react-router'

class Blog extends React.Component {

  render() {
    const { blogs, like, remove, username } = this.props
    const blog = blogs.find(b => b.id === this.props.match.params.id)

    if ( blog === undefined ) {
      return <Redirect to='/' />
    }
    const adder = blog.user ? blog.user.name : 'anonymous'
    const deletable = blog.user === undefined || blog.user.username === username

    return (
      <div>
        <h2>
          {blog.title} {blog.author}
        </h2>
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <h5>
          {blog.likes} likes <button onClick={like}>like</button>
        </h5>
        <h5>
          added by {adder}
        </h5>
        {deletable && <div><button onClick={remove}>delete</button></div>}

      </div>
    )
  }
}

export default Blog
