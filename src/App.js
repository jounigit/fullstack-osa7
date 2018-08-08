import React from 'react'
import { connect } from 'react-redux'

import { notify } from './reducers/notificationReducer'
import Blog from './components/Blog'
import BlogList from './components/BlogList'
import Notification from './components/Notification'

import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import UserList from './components/UserList'
import User from './components/User'
import blogService from './services/blogs'
import loginService from './services/login'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
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

  handleLoginFieldChange = (event) => {
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

    return (
      <Container>

        <h2>Blog app</h2>

        <Notification />

        <Router>
          <div>
            <MenuCustom user={this.state.user} logout={this.logout} />

            <BlogForm />
            <Route exact path="/" render={() => <BlogList /> } />
            <Route exact path="/blogs/:id" render={({ match }) =>
              <Blog
                match={match}
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
