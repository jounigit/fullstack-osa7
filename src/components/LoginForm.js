import React from 'react'
import { connect } from 'react-redux'
import { login } from '../reducers/loginReducer'
import { Form, Button, Header, Card } from 'semantic-ui-react'
//import PropTypes from 'prop-types'

export class LoginForm extends React.Component {
  handleSubmit = async (e) => {
    e.preventDefault()

    this.props.login(e.target.username.value, e.target.password.value)
    e.target.username.value = ''
    e.target.password.value = ''
  }
  render () {
    return (
      <Card centered style={{ marginTop: 20 }}>
        <Card.Content>
          <Header as='h2' color='green'>Kirjaudu sovellukseen</Header>
        </Card.Content>
        <Card.Content>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <label>käyttäjätunnus</label>
              <input type="text" name="username" />
            </Form.Field>
            <Form.Field>
              <label>salasana</label>
              <input type="password" name="password" />
            </Form.Field>
            <Button basic color='green'>kirjaudu</Button>
          </Form>
        </Card.Content>
      </Card>
    )
  }
}
/*
LoginForm.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string
} */

export default connect(
  null,
  { login }
)(LoginForm)
