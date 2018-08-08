import React from 'react'
import { connect } from 'react-redux'
import { logout } from './reducers/loginReducer'
import Blog from './components/Blog'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import UserList from './components/UserList'
import User from './components/User'
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

  componentDidMount = async () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
    }
  }

  render() {
    const { user, logout } = this.props
    if (this.props.user === null) {
      return (
        <LoginForm />
      )
    }
    return (
      <Container>

        <h2>Blog app</h2>

        <Notification />

        <Router>
          <div>
            <MenuCustom user={user} logout={logout} />

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

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  logout
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
