import React from 'react'
import { connect } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import blogService from '../services/blogs'

class Comments extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      comments: [],
      blog: null
    }
  }

  componentDidMount = async () => {
    const { blog } = this.props
    this.setState({
      comments: blog.comments,
      blog: blog
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const content = e.target.comment.value
      e.target.comment.value = ''

      const commentObj = {
        comment: content
      }

      await blogService.addComment(this.state.blog.id, commentObj)

      this.setState({
        comments: this.state.comments.concat(content)
      })
      this.props.notify(`your comment '${content}'`, 10)
    } catch (exception) {
      this.props.notify('updating error', 10, 'error')
    }
  }

  render() {
    const comments = this.state.comments.map((c, index) =>
      <li key={index}>
        {c}
      </li>
    )
    return (
      <div>
        <h3>comments</h3>

        <form onSubmit={this.handleSubmit}  style={{ display: 'inline !important' }}>
          <div><input name='comment'/></div>
          <button>add comment</button>
        </form>

        <ul>
          {comments}
        </ul>
      </div>
    )
  }
}

export default connect(
  null,
  { notify }
)(Comments)
