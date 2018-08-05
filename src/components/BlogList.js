import React from 'react'
import { connect } from 'react-redux'
import {  Link } from 'react-router-dom'
import { blogsInit } from '../reducers/blogReducer'

class BlogList extends React.Component {
  componentDidMount = async () => {
    this.props.blogsInit()
  }
  render() {
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 5,
      paddingBottom: 5,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }
    console.log('BLOGLIST: ', this.props.blogs)
    if (this.props.blogs.length !== 0) {
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

  return (
    <div>
      <h2>waiting</h2>

      </div>
  )

}

}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  //notify,
  blogsInit
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogList)
