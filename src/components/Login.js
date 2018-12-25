import React from 'react'
import PropTypes from 'prop-types'

const Login = props => (
  <nav className="login">
    <h2>Invertory Login</h2>
    <p>sign in to manage your store's inventory.</p>
    <button className="github" onClick={() => props.authenticate('Github')}>Log In with github</button>
    <button className="facebook" onClick={() => props.authenticate('Facebook')}>Log In with facebook</button>
  </nav>
)

Login.prototype = {
  authenticate: PropTypes.func.isRequired
}

export default Login
