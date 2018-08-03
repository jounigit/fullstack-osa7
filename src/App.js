import React from 'react'
import { connect } from 'react-redux'
import { userInit } from './reducers/userReducer'
import { notify } from './reducers/notificationReducer'
import Blog from './components/Blog'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import UserList from './components/UserList'
import User from './components/User'
import blogService from './services/blogs'
import loginService from './services/login'
//import usersService from './services/users'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Container, Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import './App.css'

const MenuCustom = ({ user, logout }) => (
  <div className="menu">
    <NavLink
      exact activeStyle={{
        fontWeight: 'bold',
        color: 'DarkRed'
      }} to="/">blogs</NavLink> &nbsp;
    <NavLink
      exact activeStyle={{
        fontWeight: 'bold',
        color: 'DarkRed'
      }} to="/users">users</NavLink> &nbsp;
    <em>{user.name} logged in</em> &nbsp;
    {user && <button onClick={logout}>logout</button>}
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
      removed: false,
      user: null
    }
  }

  componentDidMount = async () => {
    const blogs = await blogService.getAll()
    this.setState({ blogs })

    this.props.userInit()

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

  remove = (id) => async () => {
    console.log('Remove ID:: ', id)
    const deleted = this.state.blogs.find(b => b.id === id)
    const ok = window.confirm(`remove blog '${deleted.title}' by ${deleted.author}?`)
    if ( ok===false) {
      return
    }

    await blogService.remove(id)
    this.props.notify(`blog '${deleted.title}' by ${deleted.author} removed`)
    this.setState({
      blogs: this.state.blogs.filter(b => b.id!==id)
    })

  }

  toggleLikeOf = (id) => {
    return async () => {
      try {
        const blog = this.state.blogs.find(b => b.id === id)
        const blogToServer = { ...blog, likes: blog.likes+1 }
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
    if (this.state.user === null) {
      return (
        <LoginForm
          visible={this.state.visible}
          username={this.state.username}
          password={this.state.password}
          handleChange={this.handleLoginFieldChange}
          handleSubmit={this.login}
        />
      )
    }

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

    return (
      <Container>
        <Notification />

        <h2>Blog app</h2>

        <Router>
          <div>
            <MenuCustom user={this.state.user} logout={this.logout} />

            {blogForm()}
            <Route exact path="/" render={() => <BlogList blogs={this.state.blogs} /> } />
            <Route exact path="/blogs/:id" render={({ match }) =>
              <Blog
                match={match}
                blogs={this.state.blogs}
                like={this.toggleLikeOf(match.params.id)}
                remove={this.remove(match.params.id)}
                username={this.state.user.username}
              />} />
            <Route exact path="/users" render={() => <UserList />} />

            <Route exact path="/users/:id" render={({ match }) =>
              <User match={match} />} />
          </div>
        </Router>
      </Container>
    )
  }
}

const mapDispatchToProps = {
  userInit,
  notify
}

export default connect(
  null,
  mapDispatchToProps
)(App)
/*
<Route exact path="/users/:id" component={User} />

<Route exact path="/users/:id" render={({ match }) =>
  <User match={match} />} />
*/
/*
<Menu stackable inverted size='large'>
  <Menu.Item as={Link} to='/'>
    blogs
  </Menu.Item>
  <Menu.Item as={Link} to='/users'>
    users
  </Menu.Item>
  <em>{this.state.user && this.state.user.name} </em>
  {this.state.user && <button onClick={this.logout}>logout</button>}
</Menu>
*/
