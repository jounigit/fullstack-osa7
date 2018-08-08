import React from 'react'
import { initUsers } from '../reducers/userReducer'
import { connect } from 'react-redux'
import {  Link } from 'react-router-dom'

class UserList extends React.Component {
  render() {
    //console.log(this.props.usersInit())
    console.log('USERLIST: ', this.props.users)

    if (this.props.users.length !== 0) {
      return (
        <div>
          {console.log('IN USERLIST: ', this.props.users)}
          <h2>users</h2>
          perse
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
                    {user.blogs ? user.blogs.length : 0 }
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )
    }
    return (
      <div>
        <h2>users</h2>
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
  { initUsers }
)(UserList)

/*  {this.props.users.map(user =>
    <tr key={user.id}>
      <td>
        <Link to={`/users/${user.id}`}><div>{user.name}</div></Link>
      </td>
      <td>
        {user.blogs.length}
      </td>
    </tr>
  )} */
/*
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
  */
