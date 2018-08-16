import React from 'react'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'
import { Container, Form, Button, Header, Grid } from 'semantic-ui-react'

class BlogForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  visibility = () => {
    this.setState({ visible: !this.state.visible })
  }

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
    this.visibility()
  }

  render() {
    const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }
    return (
      <Grid>
        <Grid.Row columns={1}>
          <Grid.Column>

            <div style={hideWhenVisible}  className='toRight'>
              <Button primary size='tiny' onClick={this.visibility}  content='new blog' />
            </div>

            <div style={showWhenVisible}>
              <Container style={{ width: 400 }}>
                <Header as='h2' color='green'>Create new</Header>

                <Form size='small' onSubmit={this.handleSubmit}>
                  <Form.Field>
                    <label>Title</label>
                    <input type="text" name="blogTitle" />
                  </Form.Field>
                  <Form.Field>
                    <label>Author</label>
                    <input type="text" name="blogAuthor" />
                  </Form.Field>
                  <Form.Field>
                    <label>Url</label>
                    <input type="text" name="blogUrl" />
                  </Form.Field>
                  <Button basic color='green'>tallenna</Button>
                  <Button type='button'  onClick={this.visibility} content='cancel' />
                </Form>

              </Container>
            </div>

          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }

}

export default connect(
  null,
  { notify, createBlog }
)(BlogForm)
