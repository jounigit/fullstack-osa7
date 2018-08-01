import React from 'react'

const User = ({ user }) => (
  <div>
    <h2>{ user.name }</h2>
    <ul>
      {user.blogs.map(b =>
        <li key={b._id}>
          {b.title}
        </li>
      )}
    </ul>
  </div>
)

export default User
