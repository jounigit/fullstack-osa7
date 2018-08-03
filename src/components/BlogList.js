import React from 'react'

import {  Link } from 'react-router-dom'

class BlogList extends React.Component {
  render() {
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 5,
      paddingBottom: 5,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }
    return (
      <div>
        <h2>blogs</h2>
        {this.props.blogs.map(blog =>
          <div key={blog.id}  style={blogStyle}>

            <Link to={`/blogs/${blog.id}`}>
              <div className="titleAndAuthor">
                {blog.title} {blog.author}
              </div>
            </Link>

          </div>
        )}
      </div>
    )
  }
}

export default BlogList
