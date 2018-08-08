import React from 'react'
import { connect } from 'react-redux'
import { login } from '../reducers/loginReducer'
//import PropTypes from 'prop-types'

class LoginForm extends React.Component {
  handleSubmit = async (e) => {
    e.preventDefault()

    this.props.login(e.target.username.value, e.target.password.value)
    e.target.username.value = ''
    e.target.password.value = ''
  }
  render () {
    return (
      <div>
        <h2>Kirjaudu sovellukseen</h2>

        <form onSubmit={this.handleSubmit}>
          <div>
            käyttäjätunnus
            <input type="text" name="username" />
          </div>
          <div>
            salasana
            <input type="password" name="password" />
          </div>
          <button type="submit">kirjaudu</button>
        </form>
      </div>
    )
  }
}

LoginForm.propTypes = {
//  username: PropTypes.string.isRequired,
  //password: PropTypes.string.isRequired
}

export default connect(
  null,
  { login }
)(LoginForm)
