import React from 'react'
import { initUsers } from '../reducers/userReducer'
import { connect } from 'react-redux'
import {  Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'

class UserList extends React.Component {
  render() {
    //console.log(this.props.usersInit())
    console.log('USERLIST: ', this.props.users)

    if (this.props.users.length !== 0) {
      return (
        <div   className='centered'>
          {console.log('IN USERLIST: ', this.props.users)}
          <h2>Users</h2>
          <Table basic>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>User</Table.HeaderCell>
                <Table.HeaderCell>blogs added</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.props.users.map(user =>
                <Table.Row key={user.id}>
                  <Table.Cell>
                    <Link to={`/users/${user.id}`}><div>{user.name}</div></Link>
                  </Table.Cell>
                  <Table.Cell>
                    {user.blogs ? user.blogs.length : 0 }
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
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
