import React from 'react'
import usersService from '../services/users'

class UserList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    usersService.getAll().then(users =>
      this.setState({ users })
    )
  }

  render() {
    return (
      <div>
        <h2>users</h2>
        <table>
          <tbody>
            <tr>
              <td>
              </td>
              <td>
                <strong>blogs added</strong>
              </td>
            </tr>
            {this.state.users.map(user =>
              <tr key={user.id}>
                <td>
                  {user.name}
                </td>
                <td>
                  {user.blogs.length}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }
}

export default UserList
