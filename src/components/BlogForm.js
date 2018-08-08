import React from 'react'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'
import Togglable from './Togglable'

class BlogForm extends React.Component {
  handleSubmit = async (e) => {
    e.preventDefault()
    const title = e.target.blogTitle.value
    const blogObj = {
      title: title,
      author: e.target.blogAuthor.value,
      url: e.target.blogUrl.value
    }
    e.target.blogTitle.value = ''
    e.target.blogAuthor.value = ''
    e.target.blogUrl.value = ''
    this.props.createBlog(blogObj)
    this.props.notify(`you created '${title}'`, 10, 'success')
    this.blogForm.toggleVisibility()
  }
  render() {
    return (
      <Togglable buttonLabel="new blog" ref={component => this.blogForm = component}>

        <div>
          <h2>create new</h2>

          <form onSubmit={this.handleSubmit}>
            <div>
              Title
              <input type="text" name="blogTitle" />
            </div>
            <div>
              Author
              <input type="text" name="blogAuthor" />
            </div>
            <div>
              Url
              <input type="text" name="blogUrl" />
            </div>
            <button type="submit">tallenna</button>
          </form>
        </div>

      </Togglable>
    )
  }

}

export default connect(
  null,
  { notify, createBlog }
)(BlogForm)
