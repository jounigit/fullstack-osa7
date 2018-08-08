import React from 'react'
import { connect } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import { addComment } from '../reducers/blogReducer'

class Comments extends React.Component {

  handleSubmit = async (e) => {
    e.preventDefault()
    const id = e.target.id.value
    const commentObj = {
      comment: e.target.comment.value
    }
    this.props.addComment(id, commentObj)
    this.props.notify(`your comment '${e.target.comment.value}'`, 5, 'success')
    e.target.comment.value = ''
  }

  render() {
    const { blog } = this.props
    const comments = blog.comments.map((c, index) =>
      <li key={index}>
        {c}
      </li>
    )
    return (
      <div>
        <h3>comments</h3>

        <form onSubmit={this.handleSubmit}  style={{ display: 'inline !important' }}>
          <div>
            <input type="hidden" name='id' value={blog.id} />
            <input type="text" name='comment' />
            <button>add comment</button>
          </div>
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
  { notify, addComment }
)(Comments)
