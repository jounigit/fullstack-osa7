import React from 'react'
import { Link } from 'react-router'

const UserList = ({ users }) => {
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
          {users.map(user =>
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
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

export default UserList
