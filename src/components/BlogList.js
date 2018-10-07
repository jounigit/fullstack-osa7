import React from 'react'
import { connect } from 'react-redux'
import {  Link } from 'react-router-dom'
import { Header, Segment } from 'semantic-ui-react'


const BlogList = (props) => (
  <div>
    <Header as='h2' color='grey'>Blogs</Header>
    <Segment.Group>
      {props.blogs.map(blog =>
        <Segment key={blog.id} >
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
        </Segment>
      )}
    </Segment.Group>
  </div>
)

const sortedBlogs = (blogs) => {
  return blogs.sort( (a,b) => b.likes - a.likes )
}

const mapStateToProps = (state) => {
  return {
    blogs: sortedBlogs(state.blogs)
  }
}

export default connect(
  mapStateToProps,
  null
)(BlogList)
