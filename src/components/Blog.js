import React from 'react'
import { connect } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import Comments from './Comments'
import { Redirect } from 'react-router'
import { like, deleteBlog } from '../reducers/blogReducer'
import { Button, Header, Card } from 'semantic-ui-react'

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
      <Card centered>

        <Card.Content>
          <Header as='h1'>
            {blog.title}
          </Header>
          <Header as='h3'>
            {blog.author}
          </Header>
          <a href={blog.url}>{blog.url}</a>
        </Card.Content>
        <Card.Content extra>
          <Header as='h5'>
            added by {adder}

            {deletable &&
              <Button negative  size='mini' floated='right'
                onClick={this.remove(this.props.match.params.id, blog.title, blog.author)}>
                delete
              </Button>
            }
          </Header>
          <Button
            size='mini' floated='right'
            color='green'
            content='Likes'
            icon='thumbs up'
            label={{ as: 'a', basic: true, pointing: 'right', content: `${blog.likes}` }}
            labelPosition='left'
            onClick={this.toggleLike(this.props.match.params.id, blog.title)}
          />
        </Card.Content>
        <Card.Content>
          <Comments blog={blog} />
        </Card.Content>
      </Card>
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
