import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

const MenuCustom = ({ user, logout }) => (
  <div className="menu">
    <NavLink
      exact activeStyle={{
        fontWeight: 'bold',
        color: 'DarkRed'
      }} to="/">BLOGS</NavLink> &nbsp;
    <NavLink
      exact activeStyle={{
        fontWeight: 'bold',
        color: 'DarkRed'
      }} to="/users">USERS</NavLink> &nbsp;
    <em>{user.name} logged in</em> &nbsp;
    {user && <Button size='tiny' color='teal' onClick={logout}>logout</Button>}
  </div>
)

export default MenuCustom
