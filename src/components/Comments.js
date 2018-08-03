import React from 'react'

class Comments extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      comments: []
    }
  }

  componentDidMount = async () => {
    const { blog } = this.props
    this.setState({ comments: blog.comments })
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
        {comments}
        <form onSubmit={this.handleSubmit}>
          <div><input name='comment'/></div>
          <button>add comment</button>
        </form>
      </div>
    )
  }
}

export default Comments
