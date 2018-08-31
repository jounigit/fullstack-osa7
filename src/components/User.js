import React from 'react'
import {  Link } from 'react-router-dom'
import { Card, Header } from 'semantic-ui-react'

class User extends React.Component {
  render() {
    const { user } = this.props
    return user === undefined ? '' :
      (
        <Card centered>

          <Card.Content>
            <Header as='h2'>
              {user.name}
            </Header>
          </Card.Content>
          <Card.Content extra>
            <Header as='h4'>added blogs</Header>
            <ul>
              {user.blogs.map(b =>
                <li key={b._id}>
                  <Link to={`/blogs/${b._id}`}>
                    {b.title}
                  </Link>
                </li>
              )}
            </ul>
          </Card.Content>
        </Card>
      )
  }
}

export default User
