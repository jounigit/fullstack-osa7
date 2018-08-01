import React from 'react'
import { connect } from 'react-redux'

class User extends React.Component {
  render() {
    const user = this.props.users.find(user => user.id === this.props.match.params.id)
    return user === undefined ? '' :
      (
        <div>
          <h2>{user.name}</h2>
          <h4>added blogs</h4>
          <ul>
            {user.blogs.map(b =>
              <li key={b._id}>
                {b.title}
              </li>
            )}
          </ul>
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
)(User)
