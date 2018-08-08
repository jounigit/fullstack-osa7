import React from 'react'
import { connect } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import Comments from './Comments'
import { Redirect } from 'react-router'
import { like, deleteBlog } from '../reducers/blogReducer'

class Blog extends React.Component {
  toggleLike = (id, content) => () => {
    this.props.like(id)
    this.props.notify(`you liked '${content}'`, 10, 'success')
  }

  remove = (id, title, author) => () => {
    console.log('Remove ', id, title)
    const ok = window.confirm(`remove blog '${title}' by ${author}?`)
    if ( ok===false) {
      return
    }
    this.props.deleteBlog(id)
    this.props.notify(`blog '${title}' by ${author} removed`, 5, 'success')
    return <Redirect to='/' />
  }

  render() {
    const { blogs, username } = this.props
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
          {blog.likes} likes
          <button onClick={this.toggleLike(this.props.match.params.id, blog.title)}>
          like
          </button>
        </h5>
        <h5>
          added by {adder}
        </h5>
        {deletable &&
          <div>
            <button
              onClick={this.remove(this.props.match.params.id, blog.title, blog.author)}>
              delete
            </button>
          </div>}

        <Comments blog={blog} />

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

export default connect(
  mapStateToProps,
  { notify, like, deleteBlog }
)(Blog)
