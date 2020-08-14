import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = (props) => {
  return (
    <div>
      <form onSubmit = {props.handleLogin}>
        <label htmlFor ="Username"> Username </label>
        <input id="username-field" type = "text" name = "Username" value = {props.username} onChange = {props.handleUsername}/>
        <br></br>
        <label htmlFor ="Password"> Password </label>
        <input id = "password-field" type = "password" name = "Password" value = {props.password} onChange = {props.handlePassword}/>
        <br></br>
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsername: PropTypes.func.isRequired,
  handlePassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}
export default LoginForm