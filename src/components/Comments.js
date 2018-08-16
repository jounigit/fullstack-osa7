import React from 'react'
import { connect } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import { addComment } from '../reducers/blogReducer'
import { Form, Header, Icon, Divider } from 'semantic-ui-react'

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

        <div>
          <Header as='h3' color='grey'>
            <Icon name='comments' />
            comments
          </Header>
        </div>
        <Divider />
        <div>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <input type="hidden" name='id' value={blog.id} />
              <Form.Input placeholder='comment...' name='comment' />
              <Form.Button size='tiny' content='add' />
            </Form.Group>
          </Form>
        </div>
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
