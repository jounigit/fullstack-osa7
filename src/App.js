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
import MenuCustom from './components/MenuCustom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import './App.css'

export class App extends React.Component {

  render() {
    const { user, logout } = this.props

    if (this.props.user === null) {
      return (
        <LoginForm />
      )
    }

    const blogById = (id) =>
      this.props.blogs.find(blog => blog.id === id)

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
                blog = {blogById(match.params.id)}
                username={user.username}
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
    user: state.user,
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  logout
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
