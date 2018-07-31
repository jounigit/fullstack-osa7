import React from 'react'
import { connect } from 'react-redux'
import { notify } from './reducers/notificationReducer'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Users from './components/Users'
import blogService from './services/blogs'
import loginService from './services/login'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const Menu = ({ user, logout }) => (
  <div className="success">
    <Link to="/">blogs</Link> &nbsp;
    <Link to="/users">users</Link> &nbsp;
    {user
      ? <em>{user.name} logged in</em>
      : <Link to="/login">login</Link>
    }
    {user && <button onClick={logout}>logout</button>}
  </div>
)

const BlogList = ({ blogs, toggleLike }) => (
  <div>
    {blogs.sort( (a,b) => b.likes - a.likes ).map(blog =>
      <Blog key={blog.id}
        title={blog.title}
        author={blog.author}
        url={blog.url}
        likes={blog.likes}
        name={blog.user === undefined ? 'anonymous' : blog.user['name']}
        toggleLike={toggleLike(blog.id)}
      /> ) }
  </div>
)

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      blogTitle: '',
      blogAuthor: '',
      blogUrl: '',
      username: '',
      password: '',
      user: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
    }
  }

  login = async (event) => {
    event.preventDefault()
    console.log('login in with', this.state.username, this.state.password)
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)

      this.setState({ username: '', password: '', user })
      this.props.notify(`'${this.state.user.name}' logged in`, 10, 'success')
    } catch(exception) {
      this.props.notify('wrong username or password', 10, 'error')
      this.setState({ username: '', password: '' })
    }
  }

  logout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    this.props.notify(`'${this.state.user.name}' logged out`, 10, 'success')
    this.setState({ user: null })
  }

  addBlog = async (event) => {
    event.preventDefault()
    this.blogForm.toggleVisibility()

    try {
      const blogObj = {
        title: this.state.blogTitle,
        author: this.state.blogAuthor,
        url: this.state.blogUrl
      }

      const newBlog = await blogService.create(blogObj)

      this.setState({
        blogs: this.state.blogs.concat(newBlog),
        blogTitle: '',
        blogAuthor: '',
        blogUrl: ''
      })
      this.props.notify(`a new blog '${newBlog.title}' by ${newBlog.author} added`, 10, 'success')
    } catch(exception) {
      this.setState({
        blogTitle: '',
        blogAuthor: '',
        blogUrl: ''
      })
      this.props.notify('something went wrong', 10, 'error')
    }
  }

  toggleLikeOf = (id) => {
    return async () => {
      try {
        const blog = this.state.blogs.find(b => b.id === id)
        const blogToServer = { ...blog, likes: blog.likes+1, user: blog.user._id }
        const blogToState = { ...blog, likes: blog.likes+1 }

        await blogService.update(id, blogToServer)

        this.setState({
          blogs: this.state.blogs.map(blog => blog.id !== id ? blog : blogToState)
        })
        this.props.notify(`you liked '${blog.title}'`, 10, 'success')
      } catch (exception) {
        this.props.notify('updating error', 10, 'error')
      }
    }
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleBlogFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    const blogForm = () => (
      <Togglable buttonLabel="new blog" ref={component => this.blogForm = component}>
        <BlogForm
          visible={this.state.visible}
          handleSubmit={this.addBlog}
          handleChange={this.handleBlogFieldChange}
          blogTitle={this.state.blogTitle}
          blogAuthor={this.state.blogAuthor}
          blogUrl={this.state.blogUrl}
        />
      </Togglable>
    )

    const loginForm = () => (
      <Togglable buttonLabel="login">
        <LoginForm
          visible={this.state.visible}
          username={this.state.username}
          password={this.state.password}
          handleChange={this.handleLoginFieldChange}
          handleSubmit={this.login}
        />
      </Togglable>
    )
    /*
    const sortedBlogs = () => (
      this.state.blogs.sort( (a,b) => b.likes - a.likes ).map(blog =>
        <Blog key={blog.id}
          title={blog.title}
          author={blog.author}
          url={blog.url}
          likes={blog.likes}
          name={blog.user === undefined ? 'anonymous' : blog.user['name']}
          toggleLike={this.toggleLikeOf(blog.id)}
        />
      )
    ) */

    return (
      <div>
        <Notification />

        <h2>Blog app</h2>

        {this.state.user === null ?
          loginForm() :
          <div>
            <Router>
              <div>
                <Menu user={this.state.user} logout={this.logout} />
                {blogForm()}
                <Route exact path="/" render={() =>
                  <BlogList blogs={this.state.blogs} toggleLike={this.toggleLikeOf} />} />
                <Route path="/users" render={() => <Users />} />

              </div>
            </Router>
          </div>
        }
      </div>
    )
  }
}

const mapDispatchToProps = {
  //vote,
  notify
}

export default connect(
  null,
  mapDispatchToProps
)(App)
