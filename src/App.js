import React from 'react'
import { connect } from 'react-redux'
import { logout, loggedUser } from './reducers/loginReducer'
import Blog from './components/Blog'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import UserList from './components/UserList'
import User from './components/User'
import MenuCustom from './components/MenuCustom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import './App.css'

export class App extends React.Component {
  componentDidMount() {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const loggedInUser = JSON.parse(loggedUserJSON)
      this.props.loggedUser(loggedInUser)
    }
  }

  render() {
    const { user, users, blogs, logout } = this.props
    if (user === null) {
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
                blog = {blogs.find(b => b.id === match.params.id)}
                username={user.username}
              />} />
            <Route exact path="/users" render={() => <UserList />} />

            <Route exact path="/users/:id" render={({ match }) =>
              <User user = {users.find(u => u.id === match.params.id)} />} />
          </div>
        </Router>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    users: state.users,
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  logout, loggedUser
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

/*
<div>
  <MenuCustom user={user} logout={logout} />

  <BlogForm />
  <Route exact path="/" render={() => <BlogList /> } />
  <Route exact path="/blogs/:id" render={({ match }) =>
    <Blog
      blog = {blogById(match.params.id)}
      username={user.username}
    />} />
  <Route exact path="/users" render={() => <UserList />} />

  <Route exact path="/users/:id" render={({ match }) =>
    <User match={match} />} />
</div>
*/
