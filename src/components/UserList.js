import React from 'react'
import { connect } from 'react-redux'
import {  Link } from 'react-router-dom'

class UserList extends React.Component {
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
            {this.props.users.map(user =>
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}><div>{user.name}</div></Link>
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

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

export default connect(
  mapStateToProps,
  null
)(UserList)

//<Link to={`/users/${user.id}`}>{user.name}</Link>
