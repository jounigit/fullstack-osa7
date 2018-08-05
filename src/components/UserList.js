import React from 'react'
import { usersInit } from '../reducers/userReducer'
import { connect } from 'react-redux'
import {  Link } from 'react-router-dom'

class UserList extends React.Component {
/*  componentDidMount = async () => {
    try {
      const users = await this.props.usersInit()
      console.log(users)
    }  catch (exception) {
      console.log('INIT USER::', exception)
    }
  }*/
  componentDidMount = async () => {
    this.props.usersInit()
  }
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
      <button onClick={ () => this.props.usersInit() }>Init users</button>
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
  { usersInit }
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
