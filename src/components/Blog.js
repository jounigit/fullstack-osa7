import React from 'react'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  render() {
    const { blog, like, deletable, remove } = this.props

    const showWhenVisible = {
      display: this.state.visible ? '' : 'none',
      paddingLeft: 12
    }

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    const adder = blog.user ? blog.user.name : 'anonymous'

    return (
      <div style={blogStyle}>
        <div onClick={this.toggleVisibility} className="titleAndAuthor">
          {blog.title} {blog.author}
        </div>
        <div style={showWhenVisible} className="content">
          <div>
            <a href={blog.url}>{blog.url}</a>
          </div>
          <div>
            {blog.likes} likes <button onClick={like}>like</button>
          </div>
          <div>
            added by {adder}
          </div>
          {deletable && <div><button onClick={remove}>delete</button></div>}
        </div>
      </div>
    )
  }
}

export default Blog
